import { AuthRegister } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { nama, email, password } = await req.json();
        const response = await AuthRegister({ nama, email, password });

        if (!response) {
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
        }

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}