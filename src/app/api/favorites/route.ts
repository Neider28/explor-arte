import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const favoriteArts = await prisma.art.findMany();

    return NextResponse.json(favoriteArts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los datos" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { idArt, title, longTitle, link, webImage, principalOrFirstMaker } =
      await request.json();

    const existingArt = await prisma.art.findFirst({
      where: {
        idArt,
      },
    });

    if (existingArt) {
      return NextResponse.json(
        { error: "¡La obra de arte ya existe!" },
        { status: 409 },
      );
    }
    const newFavoriteArt = await prisma.art.create({
      data: {
        idArt,
        title,
        longTitle,
        link,
        webImage,
        principalOrFirstMaker,
      },
    });

    return NextResponse.json(newFavoriteArt, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "¡Error al obtener los datos!" },
      { status: 500 },
    );
  }
}
