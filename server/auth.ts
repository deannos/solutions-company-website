import { Request, Response, NextFunction } from "express";
import express from "express";
import session from "express-session";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { compareSync, hashSync } from "bcrypt";
import { fromZodError } from "zod-validation-error";
import postgres from "postgres";
import { log } from "./vite";
import connectPgSimple from "connect-pg-simple";

const PgSession = connectPgSimple(session);

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export async function setupAuth(app: express.Express) {
  // Setup session store with PostgreSQL
  const connectionString = process.env.DATABASE_URL || "";
  const sql = postgres(connectionString);

  // Create the sessions table if it doesn't exist
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
      )
    `;
    log("Sessions table initialized", "auth");
  } catch (error) {
    log(`Error creating sessions table: ${error}`, "auth-error");
  }

  // Configure sessions middleware
  app.use(
    session({
      store: new PgSession({
        conObject: {
          connectionString: process.env.DATABASE_URL || "",
        },
        tableName: "session",
      }),
      secret: process.env.SESSION_SECRET || "tcs-admin-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      },
    })
  );

  // Create a default admin user if none exists
  const adminUser = await storage.getUserByUsername("admin");
  if (!adminUser) {
    try {
      await storage.createUser({
        username: "admin",
        password: hashSync("admin123", 10),
      });
      log("Default admin user created", "auth");
    } catch (error) {
      log(`Error creating default admin user: ${error}`, "auth-error");
    }
  }

  // Middleware to check authentication
  const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Unauthorized" 
      });
    }
  };

  // Auth Routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
      
      // Hash password and create user
      const hashedPassword = hashSync(validatedData.password, 10);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      // Set session
      req.session.userId = user.id;
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request",
        });
      }
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      // Validate input
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
      
      // Verify password
      const passwordMatch = compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
      
      // Set session
      req.session.userId = user.id;
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
      });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to logout",
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });

  app.get("/api/auth/user", async (req: Request, res: Response) => {
    try {
      // Check if user is logged in
      if (!req.session.userId) {
        return res.status(200).json(null);
      }
      
      // Get user from database
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        // Clear invalid session
        req.session.destroy(() => {});
        return res.status(200).json(null);
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request",
      });
    }
  });

  // Protected routes
  app.get("/api/admin/*", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    next();
  });

  return { isAuthenticated };
}