import { NextResponse } from "next/server"; // Pomáhá vytvářet odpovědi pro API
import { supabaseAdmin } from "../../../lib/supabase"; // Připojení k databázi Supabase s administrátorskými právy

// Hlavní funkce, která zpracovává GET požadavek
export async function GET() {
  try {
    // Načtení dat z tabulky "recepty" v databázi
    const { data, error } = await supabaseAdmin
      .from("recepty") // Pracujeme s tabulkou "recepty"
      .select("id, nazev, cas, recept") // Vybereme sloupce, které nás zajímají
      .order("id", { ascending: false }); // Seřadíme podle ID sestupně (nejnovější nahoře)

    // Pokud dojde k chybě během načítání dat, vrátíme chybovou odpověď
    if (error) {
      return NextResponse.json(
        { error: "Nepodařilo se načíst recepty.", details: error.message }, // Informace o chybě
        { status: 500 } // HTTP status: Chyba na straně serveru
      );
    }

    // Pokud vše proběhne správně, vrátíme data ve formátu JSON
    return NextResponse.json(data);
  } catch (error) {
    // Pokud dojde k neočekávané chybě, vrátíme chybovou odpověď
    console.error("Unexpected error:", error); // Logování chyby do konzole
    return NextResponse.json(
      { error: "Došlo k neočekávané chybě.", details: String(error) }, // Informace o chybě
      { status: 500 } // HTTP status: Chyba na straně serveru
    );
  }
}
