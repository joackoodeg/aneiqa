// src/app/api/associations/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const { id } = params;

    const association = await prisma.association.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        congresses: true,
      },
    });

    if (!association) {
      return NextResponse.json(
        { message: 'Asociación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(association);
  } catch (error) {
    console.error('Error al obtener asociación:', error);
    return NextResponse.json(
      { message: 'Error al obtener la asociación' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const { id } = params;
    const { name, description } = await request.json();

    // Validación básica
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { message: 'El nombre de la asociación es requerido' },
        { status: 400 }
      );
    }

    // Verificar si ya existe otra asociación con el mismo nombre
    const existingAssociation = await prisma.association.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        id: {
          not: id,
        },
      },
    });

    if (existingAssociation) {
      return NextResponse.json(
        { message: 'Ya existe otra asociación con este nombre' },
        { status: 400 }
      );
    }

    // Actualizar la asociación
    const association = await prisma.association.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(association);
  } catch (error) {
    console.error('Error al actualizar asociación:', error);
    return NextResponse.json(
      { message: 'Error al actualizar la asociación' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verificar si la asociación existe
    const association = await prisma.association.findUnique({
      where: { id },
    });

    if (!association) {
      return NextResponse.json(
        { message: 'Asociación no encontrada' },
        { status: 404 }
      );
    }

    // Eliminar la asociación y todos sus datos relacionados (Prisma se encargará de las cascadas)
    await prisma.association.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Asociación eliminada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar asociación:', error);
    return NextResponse.json(
      { message: 'Error al eliminar la asociación' },
      { status: 500 }
    );
  }
}