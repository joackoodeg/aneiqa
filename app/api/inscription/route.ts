import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        const inscription = await prisma.inscription.create({
            data: { name, email },
        });

        return NextResponse.json({ success: true, inscription }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
