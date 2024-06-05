import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = params.id;

    await prisma.art.deleteMany({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      {
        message: "¡Obra de arte eliminada de favoritos!",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "¡Error al obtener los datos!" },
      { status: 500 },
    );
  }
}
