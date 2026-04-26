import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

// 1. Wrap the initialization in a factory function to capture strict types
const createAuth = (db: any) => {
    return betterAuth({
        database: mongodbAdapter(db),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        socialProviders: {
            github: {
                clientId: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            },
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            },
        },
        plugins: [nextCookies()],
    });
};

// 2. Let TypeScript infer the EXACT type from your factory
type AuthInstance = ReturnType<typeof createAuth>;

// 3. Apply the exact inferred type to your singleton variable
let authInstance: AuthInstance | null = null;

export const getAuth = async () => {
    if (authInstance) return authInstance;

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error('MongoDB connection not found');

    // 4. Initialize using the factory
    try {
        console.log(`Initializing Better Auth with baseURL: ${process.env.BETTER_AUTH_URL}`);
        authInstance = createAuth(db);
        console.log("Better Auth initialized successfully");
    } catch (error) {
        console.error("Failed to initialize Better Auth:", error);
        throw error;
    }

    return authInstance;
};