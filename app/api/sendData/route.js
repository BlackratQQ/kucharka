import { NextResponse } from "next/server"; // Pomáhá vytvářet odpovědi pro API
import { supabaseAdmin } from "../../../lib/supabase"; // Připojení k databázi Supabase s administrátorskými právy

// Funkce pro zpracování POST požadavku (přidání nového receptu)
export async function POST(req) {
  try {
    // Načtení dat z těla požadavku (odeslaná data od uživatele)
    const { nazev, cas, recept } = await req.json();

    // Ověření vstupních dat (všechna pole musí být vyplněna)
    if (!nazev || !cas || !recept) {
      return NextResponse.json(
        { error: "Všechna pole jsou povinná." }, // Chybová zpráva
        { status: 400 } // HTTP status: Bad Request (špatný požadavek)
      );
    }

    // Pokus o vložení dat do tabulky "recepty"
    const { data, error } = await supabaseAdmin.from("recepty").insert([
      {
        nazev, // Název receptu
        cas, // Čas přípravy receptu (v minutách)
        recept, // Text samotného receptu
      },
    ]);

    // Pokud se při ukládání dat do databáze objeví chyba
    if (error) {
      return NextResponse.json(
        { error: "Nepodařilo se uložit recept.", details: error.message }, // Chybová zpráva
        { status: 500 } // HTTP status: Internal Server Error (chyba na straně serveru)
      );
    }

    // Úspěšná odpověď, pokud byl recept uložen
    return NextResponse.json({
      message: "Recept byl úspěšně přidán.", // Zpráva o úspěchu
      data, // Vrácení vložených dat (volitelné)
    });
  } catch (error) {
    // Ošetření neočekávaných chyb
    console.error("Unexpected error:", error); // Zobrazení chyby v konzoli
    return NextResponse.json(
      { error: "Došlo k neočekávané chybě.", details: String(error) }, // Obecná chybová zpráva
      { status: 500 } // HTTP status: Internal Server Error
    );
  }
}
