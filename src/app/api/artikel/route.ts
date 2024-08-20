import { createArtikel, getArtikels } from "@/services/artikel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const result = await createArtikel(body);
        if ('error' in result) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const data = await getArtikels();
  return NextResponse.json(data);
}
