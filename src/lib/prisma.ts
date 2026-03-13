import { PrismaClient } from '@prisma/client';

// This function creates the actual Prisma instance
const createPrismaClient = () => {
    const url = process.env.DATABASE_URL;

    // In production/Vercel, if we don't have a URL (likely build time),
    // return a proxy that handles any access gracefully.
    if (!url) {
        return new Proxy({} as any, {
            get: (_, prop) => {
                if (prop === 'then') return undefined; // Handle async probes
                return () => {
                    // This error will only trigger if someone tries to use Prisma without a DB URL at RUNTIME.
                    // During BUILD TIME, this prevents the Constructor error.
                    console.warn(`Prisma accessed without DATABASE_URL. Property: ${String(prop)}`);
                    return Promise.resolve(null);
                };
            }
        });
    }

    if (url.startsWith('prisma+postgres://')) {
        return new PrismaClient({
            accelerateUrl: url
        } as any);
    }

    return new PrismaClient();
};

declare global {
    var __prisma: undefined | ReturnType<typeof createPrismaClient>;
}

// Lazy initialization proxy
const prismaProxy = new Proxy({} as any, {
    get: (target, prop) => {
        // Initialize the client on first access
        if (!globalThis.__prisma) {
            globalThis.__prisma = createPrismaClient();
        }

        const instance = globalThis.__prisma as any;
        const value = instance[prop];

        if (typeof value === 'function') {
            return value.bind(instance);
        }
        return value;
    }
});

const prisma = prismaProxy as PrismaClient;

export default prisma;
