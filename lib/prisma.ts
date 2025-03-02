// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// Import the Prisma package dynamically
const { PrismaClient } = require('@prisma/client');

// Create a global variable to store the Prisma client instance
const globalForPrisma = global as unknown as { prisma: any };

// Create a new Prisma client instance or reuse the existing one
export const prisma = globalForPrisma.prisma || 
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

// In development, save the Prisma client instance to the global variable
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 