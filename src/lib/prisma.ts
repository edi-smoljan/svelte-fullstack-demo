import Prisma, * as PrismaAll from "prisma/prisma-client";
const PrismaClient = Prisma?.PrismaClient ?? PrismaAll.PrismaClient;
export default PrismaClient;