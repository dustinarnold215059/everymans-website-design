import { PrismaClient } from "@/lib/generated/prisma";

/**
 * Prisma client singleton.
 *
 * Next dev reloads modules on every change; without caching the instance on
 * globalThis that opens a new connection pool each time until Postgres refuses
 * more. Production gets a single instance per lambda.
 */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
