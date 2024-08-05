import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import authConfig from "@/auth.config";

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, user, profile }: any) {
            if (account?.provider === "credentials") {
                token.id = Number(user.id);
                token.email = user.email;
                token.nama = user.nama;
                token.role = user.role
                token.idp = "credentials";
                token.createdAt = user.created_At;
            }
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if ("id" in token) {
                session.user.id = token.id
            }
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("nama" in token) {
                session.user.nama = token.nama;
            }
            if ("idp" in token) {
                session.user.idp = token.idp;
            }
            if ("role" in token) {
                session.user.role = token.role
            }
            if ("createdAt" in token) {
                session.user.createdAt = token.createdAt
            }
            if ("profileUrl" in token) {
                session.user.profileUrl = token.profileUrl
            }

            const createToken = jwt.sign(
                token,
                process.env.NEXT_AUTH_SECRET as string, {
                "algorithm": "HS256",
            }
            )
            session.accessToken = createToken;

            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    ...authConfig
})