import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase";

export async function POST(req) {
  try {
    const { nazev, cas, recept } = await req.json();

    if (!nazev || !cas || !recept) {
      return NextResponse.json(
        { error: "Všechna pole jsou povinná." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("recepty")
      .insert([{ nazev, cas, recept }]);

    if (error) {
      return NextResponse.json(
        { error: "Nepodařilo se uložit recept.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Recept byl úspěšně přidán.", data });
  } catch (error) {
    return NextResponse.json(
      { error: "Došlo k neočekávané chybě.", details: String(error) },
      { status: 500 }
    );
  }
}
