import { NextRequest, NextResponse } from "next/server";
import { createNewGaleri, deleteGaleri, getGambarGaleri, updateGaleri } from "@/services/galeri";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const galeriData = JSON.parse(formData.get('galeri') as string);
        const files = formData.getAll('gambar') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files were uploaded." }, { status: 400 });
        }

        const gambarGaleri = await Promise.all(files.map(async (file, index) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return {
                blob: buffer,
                keterangan: galeriData.keterangan || `Image ${index + 1}`, 
            };
        }));

        const data = await createNewGaleri(gambarGaleri);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const data = await getGambarGaleri();
        if (!data.data) {
            return NextResponse.json({ error: "Tidak ada gambar galeri yang ditemukan." }, { status: 404 });
        }
        
        const base64Data = data.data.map((item: any) => ({
            ...item,
            blob: item.blob.toString('base64'),
        }));

        return NextResponse.json({ data: base64Data });
    } catch (error) {
        console.error("Error handling GET request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID galeri diperlukan." }, { status: 400 });
        }
        const formData = await req.formData();
        const galeriData = formData.get('galeri') as string;
        const galeriKeterangan = JSON.parse(galeriData).keterangan;

        if(!galeriKeterangan){
            return NextResponse.json({ error: "Keterangan galeri diperlukan." }, { status: 400 });
        }
        const data = await updateGaleri(id, galeriKeterangan);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling PUT request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID galeri diperlukan." }, { status: 400 });
        }
        const data = await deleteGaleri(id);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error handling DELETE request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}