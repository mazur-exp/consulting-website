import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Subdomain routing: counter.booster.delivery serves the counter page
  app.use((req, res, next) => {
    const host = req.hostname;
    if (host === "counter.booster.delivery" || host.startsWith("counter.")) {
      // Production: dist/public/counter.html, Development: client/public/counter.html
      const prodPath = path.resolve(import.meta.dirname, "public", "counter.html");
      const devPath = path.resolve(import.meta.dirname, "..", "client", "public", "counter.html");
      const counterPath = fs.existsSync(prodPath) ? prodPath : devPath;
      return res.sendFile(counterPath);
    }
    next();
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
