import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Cola en memoria
const inscriptionQueue: { name: string; email: string }[] = [];
const BATCH_SIZE = 10; // Lote de 10 registros por inserción
const INTERVAL = 5000; // Procesar cada 5 segundos

// Función para procesar la cola en lotes
async function processQueue() {
    if (inscriptionQueue.length === 0) return;

    const batch = inscriptionQueue.splice(0, BATCH_SIZE); // Extraer hasta 10 elementos

    if (!batch || batch.length === 0) return;

    try {
        await prisma.inscription.createMany({ data: batch });
        console.log(`Procesados ${batch.length} registros`);
    } catch (error) {
        console.error("Error al procesar la cola:", error);
    }
}

// Ejecutar `processQueue` en intervalos definidos
setInterval(processQueue, INTERVAL);

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
        }

        // Agregar inscripción a la cola
        inscriptionQueue.push({ name, email });

        return NextResponse.json({ success: true, message: "Inscripción en cola" }, { status: 202 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json(
                { error: "An unexpected error occurred" },
                { status: 500 }
            );
        }
    }
}

export async function GET() {
    return NextResponse.json({ success: true, message: "Hello" }, { status: 200 });
}
