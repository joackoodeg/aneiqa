// src/app/api/associations/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    // Validación básica
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { message: 'El nombre de la asociación es requerido' },
        { status: 400 }
      );
    }

    // Verificar si ya existe una asociación con el mismo nombre
    const existingAssociation = await prisma.association.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (existingAssociation) {
      return NextResponse.json(
        { message: 'Ya existe una asociación con este nombre' },
        { status: 400 }
      );
    }

    // Crear la asociación
    const association = await prisma.association.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(association, { status: 201 });
  } catch (error) {
    console.error('Error al crear asociación:', error);
    return NextResponse.json(
      { message: 'Error al crear la asociación' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const associations = await prisma.association.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            members: true,
            congresses: true,
          },
        },
      },
    });

    return NextResponse.json(associations);
  } catch (error) {
    console.error('Error al obtener asociaciones:', error);
    return NextResponse.json(
      { message: 'Error al obtener las asociaciones' },
      { status: 500 }
    );
  }
}