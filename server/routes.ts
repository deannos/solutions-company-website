import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  const { isAuthenticated } = await setupAuth(app);

  // API routes with /api prefix
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const result = await storage.createContactMessage(validatedData);
      res.status(201).json({
        success: true,
        message: "Contact message submitted successfully",
        data: result
      });
    } catch (error) {
      if (error instanceof ZodError) {
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

  // Admin-only route, protected by authentication
  app.get("/api/contact-messages", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve contact messages",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
