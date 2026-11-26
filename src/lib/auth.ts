import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api"

import { db } from "@/db";
import {sendEmail} from "@/lib/email";
import {renderVerificationEmail} from "@/lib/email-templates/verification-email";
import { signUpSchema } from "@/lib/sign-up-schema";


 
export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true,
        requireEmailVerification: true,
        minPasswordLength: 8,
        maxPasswordLength: 20, 
      }, 
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            const html = await renderVerificationEmail({ name: user.name, url });
            void sendEmail({
                to: user.email,
                subject: "Confirme seu e-mail - Bewear",
                html,
            });
        },
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
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== '/sign-up/email') {
                return;
            }
            const result = signUpSchema.safeParse(ctx.body);
            if (!result.success) {
                throw new APIError("BAD_REQUEST", {
                    message: result.error.issues[0].message,
                });
            }
        }),
    }
    
    
});