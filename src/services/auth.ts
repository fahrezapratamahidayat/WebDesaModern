import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

interface RegisterData {
    nama: string;
    email: string;
    password: string;
}

export async function AuthLogin(email: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { email }
        });
        if (!user) {
            console.error("Email tidak terdaftar");
            return null;
        }
        if (!user.password) {
            console.error("Password tidak ditemukan");
            return null;
        }
        return user;
    } catch (error) {
        console.error("Error during AuthLogin:", error);
        throw new Error("Internal server error");
    }
}

export async function AuthRegister(data: RegisterData) {
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email: data.email }
        });
        if (existingUser) {
            console.error("Email sudah terdaftar");
            return null;
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            }
        });
        return user;
    } catch (error) {
        console.error("Error during AuthRegister:", error);
        throw new Error("Internal server error");
    }
}