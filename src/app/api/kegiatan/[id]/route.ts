import { getKegiatanById, updateKegiatan, deleteKegiatan } from "@/services/kegiatanDesa";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const data = await getKegiatanById(id);
        if (!data) {
            return NextResponse.json({ error: "Kegiatan tidak ditemukan" }, { status: 404 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling GET request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const body = await req.json();
        const data = await updateKegiatan(id, body);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling PUT request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const data = await deleteKegiatan(id);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling DELETE request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}