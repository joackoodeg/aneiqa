// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Prevenir múltiples instancias de Prisma Client en desarrollo
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;