import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Enable WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Optional (for edge environments like Vercel Edge / Cloudflare)
neonConfig.poolQueryViaFetch = true;

// Type definition for global prisma (to prevent multiple instances in dev)

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// Connection string from .env
const connectionString = `${process.env.DATABASE_URL}`;

// Create Neon adapter
const adapter = new PrismaNeon({ connectionString });

// Create Prisma client
const prisma = global.prisma || new PrismaClient({ adapter });

// Prevent multiple instances in development
if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
