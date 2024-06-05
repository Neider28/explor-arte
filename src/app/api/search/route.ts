import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let involvedMaker = searchParams.get("involvedMaker");
    let query = searchParams.get("q");

    if (!query) {
      query = "";
    }

    if (involvedMaker === "null") {
      involvedMaker = "";
    }

    const res = await fetch(
      `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.API_KEY}&involvedMaker=${involvedMaker}&q=${query}&ps=100`,
    );
    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "¡Error al obtener los datos!" },
      { status: 500 },
    );
  }
}
