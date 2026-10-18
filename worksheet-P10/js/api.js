// js/api.js — Worksheet P10 · Lembar A-B · Fina Nailatul 'Izzah · 25523264
// Lapisan data: berkas ini yang bicara dengan jaringan. Tampilan ada di dom.js.

// A.2 — Alamat API 
const ALAMAT_API =
  "https://openlibrary.org/search.json?q=andrea+hirata&fields=key,title,author_name,first_publish_year&limit=10";

// B.1 
export async function load() {
  try {
    const response = await fetch(ALAMAT_API);
    console.log("status", response.status, "ok", response.ok);

  
    if (!response.ok) {
      throw new Error("status " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("gagal memuat", error.message);
    throw error;   
  }
}