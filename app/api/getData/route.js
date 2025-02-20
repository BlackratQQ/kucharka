import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("recepty")
      .select("id, nazev, cas, recept")
      .order("id", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Nepodařilo se načíst recepty.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Došlo k neočekávané chybě.", details: String(error) },
      { status: 500 }
    );
  }
}
