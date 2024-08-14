import { NextRequest, NextResponse } from "next/server";
import { createUMKM, deleteUMKM, getUMKM, getUMKMById, updateUMKM } from "@/services/umkm";
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const umkmData = JSON.parse(formData.get('umkmData') as string);
        const files = formData.getAll('gambar') as File[];


        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files were uploaded." }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'umkm');
        await mkdir(uploadDir, { recursive: true });

        const gambarUMKM = await Promise.all(files.map(async (file, index) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            return {
                url: `/uploads/umkm/${fileName}`,
                keterangan: `Image ${index + 1}`,
            };
        }));

        const data = await createUMKM(umkmData, gambarUMKM);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (id) {
            const data = await getUMKMById(id);
            if (!data) {
                return NextResponse.json({ error: "UMKM tidak ditemukan." }, { status: 404 });
            }
            return NextResponse.json(data);
        } else {
            const { data, message } = await getUMKM();
            return NextResponse.json({ data, message });
        }
    } catch (error) {
        console.error("Error handling GET request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: "ID UMKM diperlukan." }, { status: 400 });
        }
        const formData = await req.formData();
        const umkmData = JSON.parse(formData.get('umkmData') as string);
        const files = formData.getAll('gambar') as File[];
        const deletedImageIds = JSON.parse(formData.get('deletedImageIds') as string || '[]');

        const data = await updateUMKM(id, umkmData, files, deletedImageIds);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling PUT request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: "ID UMKM diperlukan." }, { status: 400 });
        }
        const data = await deleteUMKM(id);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling DELETE request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}