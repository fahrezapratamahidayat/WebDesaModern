import { getArtikelBySlug } from "@/services/artikel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const data = await getArtikelBySlug(slug);

  return NextResponse.json(data);
}