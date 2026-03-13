import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    const url = process.env.DATABASE_URL;

    // Build-time safety: If no URL is present (e.g., during Vercel build phase),
    // return a proxy that prevents initialization errors.
    if (!url) {
        return new Proxy({} as any, {
            get: (_, prop) => {
                if (prop === 'then') return undefined;
                return () => {
                    throw new Error(`Prisma accessed without DATABASE_URL. Property: ${String(prop)}`);
                };
            }
        });
    }

    if (url.startsWith('prisma+postgres://')) {
        return new PrismaClient({
            accelerateUrl: url
        } as any);
    }

    return new PrismaClient({
        datasourceUrl: url
    } as any);
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
