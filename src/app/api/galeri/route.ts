import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { createNewGaleri, getGambarGaleri } from "@/services/galeri";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const umkmData = JSON.parse(formData.get('galeri') as string);
        const files = formData.getAll('gambar') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files were uploaded." }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'galeri');
        await mkdir(uploadDir, { recursive: true });

        const gambarGaleri = await Promise.all(files.map(async (file, index) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            return {
                url: `/uploads/galeri/${fileName}`,
                keterangan: umkmData.keterangan || `Image ${index + 1}`, 
            };
        }));

        const data = await createNewGaleri(gambarGaleri);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function GET(req: NextRequest){
    try {
        const data = await getGambarGaleri()
        if(!data.data){
            return NextResponse.json({ error: "Tidak ada gambar galeri yang ditemukan." }, { status: 404 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling GET request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}