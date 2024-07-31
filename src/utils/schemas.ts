import { z } from "zod"

export const schemaLogin = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter")
})

export const schemaRegister = z
    .object({
        nama: z.string().min(2, "Nama harus memiliki minimal 2 karakter"),
        email: z.string().email("Email tidak valid"),
        password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password tidak cocok",
        path: ["confirmPassword"],
    });