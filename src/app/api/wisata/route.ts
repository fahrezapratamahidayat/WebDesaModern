import {
  createWisata,
  deleteWisata,
  getWisata,
  getWIsataById,
  updateWisata,
} from "@/services/wisata";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const data = await getWIsataById(id);
      if (!data) {
        return NextResponse.json(
          { error: "UMKM tidak ditemukan." },
          { status: 404 }
        );
      }
      return NextResponse.json(data);
    } else {
      const { data, message } = await getWisata();
      return NextResponse.json({ data, message });
    }
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const wisataData = JSON.parse(formData.get("wisataData") as string);
    const files = formData.getAll("gambar") as File[];
    console.log(files);

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files were uploaded." },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "wisata");
    await mkdir(uploadDir, { recursive: true });

    const gambarWisata = await Promise.all(
      files.map(async (file, index) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return {
          url: `/uploads/wisata/${fileName}`,
          keterangan: `Image ${index + 1}`,
        };
      })
    );

    const data = await createWisata(wisataData, gambarWisata);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "ID wisata diperlukan." },
        { status: 400 }
      );
    }
    const data = await deleteWisata(id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      error: "Terjadi kesalahan pada server.",
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: "ID wisata diperlukan." }, { status: 400 });
    }
    const formData = await req.formData();
    const wisataData = JSON.parse(formData.get('wisataData') as string);
    const files = formData.getAll('gambar') as File[];
    const deletedImageIds = JSON.parse(formData.get('deletedImageIds') as string || '[]');

    const data = await updateWisata(id, wisataData, files, deletedImageIds);
    return NextResponse.json(data);
} catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
}
}
