// js/api.js — Worksheet P10 · Lembar A · Fina Nailatul 'Izzah · 25523264
// Lapisan data: berkas ini yang bicara dengan jaringan. Tampilan ada di dom.js.

// A.2 — Alamat API 
const ALAMAT_API =
  "https://openlibrary.org/search.json?q=andrea+hirata&fields=key,title,author_name,first_publish_year&limit=10";

// A.3 
export async function load() {
  const response = await fetch(ALAMAT_API);
  console.log("status", response.status, "ok", response.ok);

  
  if (!response.ok) {
    throw new Error("status " + response.status);
  }

  return response.json();
}