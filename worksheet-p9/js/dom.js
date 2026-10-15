// js/dom.js — Worksheet P9 · Lembar A-C · Fina Nailatul 'Izzah · 25523264
// app.js menyimpan data dan fungsi; berkas ini yang menyentuh halaman.

// Data dari app.js (app.js memakai "export" di depan ketiganya)
import { daftarBuku, labelStatus, kelasStatus } from "./app.js";

/* =====================================================
   LEMBAR A — Memilih elemen (tabel A.2)
   Ejaan id harus sama persis dengan profil.html.
   ===================================================== */

// Daftar buku: <tbody> tempat baris-baris buku akan digambar
const isiTabel = document.querySelector("#isi-tabel");

// Baris tombol filter: SATU elemen induk (listener nanti dipasang di sini)
const barisFilter = document.querySelector("#filter");

// Pesan saat hasil filter kosong (awalnya tersembunyi)
const pesanKosong = document.querySelector("#pesan-kosong");

// Formulir Tambah Buku dan keempat fieldnya
const formBuku = document.querySelector("#form-buku");
const inputJudul = document.querySelector("#judul");
const inputPenulis = document.querySelector("#penulis");
const inputTahun = document.querySelector("#tahun");
const pilihStatus = document.querySelector("#status-baca");

// Semua tombol filter: NodeList (bukan array, jadi map/filter belum tersedia)
const tombolFilter = document.querySelectorAll("#filter button");

/* Pemeriksaan otomatis: bila ada selector yang null, Console
   langsung menyebut namanya (bukan "Cannot read properties of null"). */
const elemenYangDiisi = {
  isiTabel, barisFilter, pesanKosong,
  formBuku, inputJudul, inputPenulis, inputTahun, pilihStatus,
};
for (const [nama, elemen] of Object.entries(elemenYangDiisi)) {
  if (elemen === null) {
    console.error(`Selector untuk "${nama}" mengembalikan null. Cek ejaan id di profil.html.`);
  }
}
if (tombolFilter.length === 0) {
  console.error('Tidak ada tombol di dalam "#filter". Cek profil.html.');
}

/* =====================================================
   LEMBAR B — Membangun elemen dari data
   createElement → textContent → append
   (tidak ada innerHTML: teks dari pengguna tidak dibaca sebagai HTML)
   ===================================================== */

// Satu item array → satu baris <tr>
function buatBaris(buku, nomor) {
  const baris = document.createElement("tr");

  const kolomNomor = document.createElement("th");
  kolomNomor.scope = "row";
  kolomNomor.textContent = nomor;

  const kolomJudul = document.createElement("td");
  kolomJudul.textContent = buku.judul;

  const kolomPenulis = document.createElement("td");
  kolomPenulis.textContent = buku.penulis ?? "-";

  const kolomTahun = document.createElement("td");
  kolomTahun.textContent = buku.tahun ?? "-";

  // Label status: <span class="status status--sudah">Sudah Dibaca</span>
  const label = document.createElement("span");
  label.className = `status ${kelasStatus[buku.status] ?? ""}`;
  label.textContent = labelStatus[buku.status] ?? "Status belum diketahui";

  const kolomStatus = document.createElement("td");
  kolomStatus.append(label);

  baris.append(kolomNomor, kolomJudul, kolomPenulis, kolomTahun, kolomStatus);
  return baris;
}

// Menggambar seluruh daftar. Selalu dimulai dengan mengosongkan container.
function render(daftar) {
  isiTabel.textContent = "";                 // 1. kosongkan dulu

  if (daftar.length === 0) {                 // 2. periksa kondisi kosong
    pesanKosong.hidden = false;
    return;
  }
  pesanKosong.hidden = true;

  const fragmen = document.createDocumentFragment();   // wadah sementara
  daftar.forEach((buku, indeks) => fragmen.append(buatBaris(buku, indeks + 1)));

  isiTabel.append(fragmen);                  // 3. halaman digambar sekali
}

render(daftarBuku);

/* =====================================================
   LEMBAR C — Satu listener pada parent untuk semua tombol
   ===================================================== */

// Tombol yang aktif ditandai dengan SATU class; warnanya diatur di CSS
function tandaiTombolAktif(tombolAktif) {
  tombolFilter.forEach((tombol) => {
    tombol.classList.toggle("active", tombol === tombolAktif);
  });
}

// Listener dipasang SEKALI, di luar render, pada elemen induk (#filter)
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;                       // klik di luar tombol, abaikan

  const kategori = tombol.dataset.category;  // dari data-category di HTML
  const terpilih = daftarBuku.filter(
    (buku) => kategori === "all" || buku.status === kategori
  );

  render(terpilih);
  tandaiTombolAktif(tombol);
});

// Keadaan awal: tombol "Semua" aktif
tandaiTombolAktif(barisFilter.querySelector('[data-category="all"]'));

/* =====================================================
   Hanya untuk memeriksa di Console (Lembar A, B, dan C)
   type="module" menyimpan variabel di dalam modul, jadi mengetik
   `isiTabel` di Console akan galat. Baris ini membukanya sementara.
   Hapus setelah pemeriksaan selesai.
   ===================================================== */
Object.assign(window, { ...elemenYangDiisi, tombolFilter, buatBaris, render, tandaiTombolAktif });