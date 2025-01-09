import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase";

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID je povinné." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("recepty")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "Nepodařilo se odstranit recept.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Recept byl úspěšně odstraněn.",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Došlo k neočekávané chybě.", details: String(error) },
      { status: 500 }
    );
  }
}
