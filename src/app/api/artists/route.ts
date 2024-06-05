import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let query = searchParams.get("q");

    if (!query) {
      query = "";
    }
    const res = await fetch(
      `https://www.rijksmuseum.nl/en/search/advanced/terms?field=involvedMaker&q=${query}`,
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
