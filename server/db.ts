import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { log } from "./vite";

// Create a PostgreSQL client
const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString);
log(`Database connection initialized: ${connectionString.split("@")[1]}`, "db");

// Initialize drizzle with the client
export const db = drizzle(client);