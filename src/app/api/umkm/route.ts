import { NextRequest, NextResponse } from "next/server";
import { createUMKM, getUMKM, updateUMKM, deleteUMKM, getUMKMById } from "@/services/umkm";
import upload from "@/lib/uploadMiddleware";
import { promises as fs } from 'fs';
import path from 'path';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function POST(req: NextRequest) {
    return new Promise<NextResponse>((resolve) => {
        upload.array('gambar')(req as any, {} as any, async (err) => {
            if (err) {
                console.error("Error handling file upload:", err);
                return resolve(NextResponse.json({ error: "Terjadi kesalahan saat mengunggah file." }, { status: 500 }));
            }

            try {
                const formData = await req.formData();
                const umkmData = JSON.parse(formData.get('umkmData') as string);
                const files = (req as any).files as Express.Multer.File[];

                const gambarUMKM = files.map((file, index) => ({
                    url: `/uploads/umkm/${file.filename}`,
                    keterangan: formData.get(`keterangan_${index}`) as string,
                }));

                const data = await createUMKM(umkmData, gambarUMKM);
                resolve(NextResponse.json(data));
            } catch (error) {
                console.error("Error handling POST request:", error);
                resolve(NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 }));
            }
        });
    });
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
        const body = await req.json();
        const data = await updateUMKM(id, body);
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