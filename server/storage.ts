import { users, type User, type InsertUser, contactMessages, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { log } from "./vite";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      log(`Error getting user: ${error}`, "db-error");
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      log(`Error getting user by username: ${error}`, "db-error");
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      log(`Error creating user: ${error}`, "db-error");
      throw new Error("Failed to create user");
    }
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    try {
      const [contactMessage] = await db.insert(contactMessages).values(message).returning();
      return contactMessage;
    } catch (error) {
      log(`Error creating contact message: ${error}`, "db-error");
      throw new Error("Failed to save contact message");
    }
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      // Get all messages and sort them in JavaScript
      const messages = await db.select().from(contactMessages);
      return messages.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      log(`Error getting contact messages: ${error}`, "db-error");
      return [];
    }
  }
}

// For backward compatibility, we could keep the MemStorage class definition,
// but we're switching to using the database implementation
export const storage = new DatabaseStorage();
