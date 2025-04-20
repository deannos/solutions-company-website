// db.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { log } from "./vite";
import * as dotenv from "dotenv";

// 1. Load environment FIRST
dotenv.config();
console.log("Current directory:", process.cwd());
console.log("Raw DATABASE_URL:", process.env.DATABASE_URL);

// 2. Validate connection string
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL missing in .env");

// 3. Configure client with SSL (essential for Supabase)
const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  idle_timeout: 20,
});

// 4. Safe log
const safeLog = connectionString.includes("@")
  ? connectionString.split("@")[1]
  : "[redacted]";
log(`Database connected to: ${safeLog}`, "db");

export const db = drizzle(client);
