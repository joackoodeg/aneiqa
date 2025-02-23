import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();
        const inscription = await prisma.inscription.create({
            data: { name, email },
        });
        return NextResponse.json({ success: true, inscription }, { status: 200 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json(
                { error: 'An unexpected error occurred' },
                { status: 500 }
            );
        }
    }
}