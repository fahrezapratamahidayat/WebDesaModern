import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthLogin } from "./services/auth";
export default {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials.email || !credentials.password) {
                        throw new Error('email dan password wajib di isi')
                    }
                    const { email, password } = credentials as {
                        email: string;
                        password: string;
                    };

                    const user: any = await AuthLogin(email);
                    if (!user) {
                        console.error("User tidak ditemukan");
                        return null;
                    }

                    if (!user.password) {
                        console.error("Password tidak ditemukan untuk user:", email);
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (isPasswordValid) {
                        return user;
                    } else {
                        console.error("Password tidak valid");
                        return null;
                    }
                } catch (error) {
                    console.error("Error dalam proses otorisasi:", error);
                    throw new Error("Terjadi kesalahan dalam proses otorisasi");
                }

            },
        }),
    ],
    secret: process.env.NEXTAUTH_URL
} satisfies NextAuthConfig