import db from "@/lib/mysql/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const connection = await db;
    const [rows] = await connection.query("SELECT * FROM siswa");
    return NextResponse.json({ users: rows });
}

export async function POST(request: NextRequest) {
    const connection = await db;
    const body = await request.json();

    const sql = `
        INSERT INTO siswa (nama_lengkap, tanggal_lahir, alamat, jenis_kelamin, email, password) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    try {
        const [rows] = await connection.query(sql, [body.nama_lengkap, body.tanggal_lahir, body.alamat, body.enis_kelamin, body.email, body.password]);
        return NextResponse.json({ message: "User inserted successfully", data: body });
    } catch (error) {
        console.error("Error inserting user:", error);
        return NextResponse.json({ message: "Error inserting user" }, { status: 500 });
    }
}