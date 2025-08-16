import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db"; // your drizzle instance
;
 
export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true, 
      }, 
    database: drizzleAdapter(db, {
        provider: "pg", 
    }),

    socialProviders: { 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    user: {
        modelName: "userTable",
    },
    session: {
        modelName: "sessionTable",
    },
    account: {
        modelName: "accountTable",
    },
    verification: {
        modelName: "verificationTable",
    },
    
    
});