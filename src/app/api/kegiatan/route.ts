import { createKegiatan, getKegiatan, updateKegiatan, deleteKegiatan } from "@/services/kegiatanDesa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await createKegiatan(body);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, message } = await getKegiatan();
        return NextResponse.json({ data, message });
    } catch (error) {
        console.error("Error handling GET request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}