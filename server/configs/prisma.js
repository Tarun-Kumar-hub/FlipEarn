// Load env
import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Enable WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Optional for edge environments
neonConfig.poolQueryViaFetch = true;

// Connection string
const connectionString = process.env.DATABASE_URL;

// Create Neon adapter
const adapter = new PrismaNeon({ connectionString });

// ✅ FIX: use globalThis instead of global
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

// Prevent multiple instances in development
if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
