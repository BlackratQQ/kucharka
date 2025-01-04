import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase";

export async function GET() {
  try {
    // Načtení dat z tabulky recepty
    const { data, error } = await supabaseAdmin
      .from("recepty")
      .select("id, nazev, cas, recept")
      .order("id", { ascending: true }); // Seřazení podle ID

    if (error) {
      return NextResponse.json(
        { error: "Nepodařilo se načíst recepty.", details: error.message },
        { status: 500 }
      );
    }

    // Vrácení dat
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Došlo k neočekávané chybě.", details: String(error) },
      { status: 500 }
    );
  }
}
