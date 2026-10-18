// js/dom.js — Worksheet P9 · Lembar A-D · Fina Nailatul 'Izzah · 25523264
// app.js menyimpan data dan fungsi; berkas ini yang menyentuh halaman.

// Data dari app.js (app.js memakai "export" di depan ketiganya)
import { daftarBuku, labelStatus, kelasStatus } from "./app.js";

/* =====================================================
   LEMBAR A — Memilih elemen (tabel A.2)
   Ejaan id harus sama persis dengan profil.html.
   ===================================================== */

// Daftar buku: <tbody> tempat baris-baris buku akan digambar
const isiTabel = document.querySelector("#isi-tabel");

// Baris tombol filter: SATU elemen induk (listener dipasang di sini)
const barisFilter = document.querySelector("#filter");

// Pesan saat hasil filter kosong (awalnya tersembunyi)
const pesanKosong = document.querySelector("#pesan-kosong");

// Formulir Tambah Buku, keempat fieldnya, dan tombol simpan
const formBuku = document.querySelector("#form-buku");
const inputJudul = document.querySelector("#judul");
const inputPenulis = document.querySelector("#penulis");
const inputTahun = document.querySelector("#tahun");
const pilihStatus = document.querySelector("#status-baca");
const tombolSimpan = document.querySelector('#form-buku button[type="submit"]');

// Semua tombol filter: NodeList (bukan array, jadi map/filter belum tersedia)
const tombolFilter = document.querySelectorAll("#filter button");

/* Pemeriksaan otomatis: bila ada selector yang null, Console
   langsung menyebut namanya (bukan "Cannot read properties of null"). */
const elemenYangDiisi = {
  isiTabel, barisFilter, pesanKosong,
  formBuku, inputJudul, inputPenulis, inputTahun, pilihStatus, tombolSimpan,
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

// Menggambar seluruh daftar. Tiga tugas tetap, urutannya tidak boleh ditukar.
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

/* =====================================================
   LEMBAR C — Satu listener pada parent untuk semua tombol
   ===================================================== */

// Filter yang sedang dipilih diingat di sini, supaya tetap berlaku
// ketika data berubah (misalnya setelah buku baru ditambahkan)
let kategoriAktif = "all";

// Satu-satunya jalan menggambar daftar: saring menurut filter aktif, lalu render
function perbarui() {
  const terpilih = daftarBuku.filter(
    (buku) => kategoriAktif === "all" || buku.status === kategoriAktif
  );
  render(terpilih);
}

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

  kategoriAktif = tombol.dataset.category;   // dari data-category di HTML
  perbarui();
  tandaiTombolAktif(tombol);
});

// Keadaan awal: semua buku tampil dan tombol "Semua" aktif
perbarui();
tandaiTombolAktif(barisFilter.querySelector('[data-category="all"]'));

/* =====================================================
   LEMBAR D — Validasi form dengan pesan per field
   ===================================================== */

// Satu aturan per field: periksa() mengembalikan pesan galat, atau "" bila valid.
// Pesan menyebut cara memperbaiki, bukan menyalahkan pengguna.
const aturanField = [
  {
    input: inputJudul,
    galat: document.querySelector("#galat-judul"),
    periksa: () =>
      inputJudul.value.trim() === "" ? "Isi judul buku, misalnya: Laskar Pelangi." : "",
  },
  {
    input: inputPenulis,
    galat: document.querySelector("#galat-penulis"),
    periksa: () =>
      inputPenulis.value.trim() === "" ? "Isi nama penulis, misalnya: Andrea Hirata." : "",
  },
  {
    input: inputTahun,
    galat: document.querySelector("#galat-tahun"),
    periksa: () => {
      const teks = inputTahun.value.trim();
      const tahun = Number(teks);
      const min = Number(inputTahun.min);    // batas diambil dari atribut di HTML
      const max = Number(inputTahun.max);
      if (teks === "" || !Number.isInteger(tahun) || tahun < min || tahun > max) {
        return `Isi tahun terbit berupa angka antara ${min} dan ${max}, misalnya: 2005.`;
      }
      return "";
    },
  },
  {
    input: pilihStatus,
    galat: document.querySelector("#galat-status"),
    periksa: () => (pilihStatus.value === "" ? "Pilih salah satu status baca." : ""),
  },
];

// Periksa satu field, lalu tampilkan atau sembunyikan pesannya. Mengembalikan true bila valid.
function periksaField(aturan) {
  const pesan = aturan.periksa();
  const valid = pesan === "";
  aturan.galat.textContent = pesan;
  aturan.galat.hidden = valid;
  aturan.input.setAttribute("aria-invalid", String(!valid));   // untuk screen reader dan CSS
  return valid;
}

// Hanya memeriksa, tanpa mengubah tampilan: dipakai untuk menahan tombol simpan
const semuaValid = () => aturanField.every((aturan) => aturan.periksa() === "");

// Menyembunyikan semua pesan galat (setelah buku berhasil disimpan)
function bersihkanGalat() {
  aturanField.forEach((aturan) => {
    aturan.galat.textContent = "";
    aturan.galat.hidden = true;
    aturan.input.setAttribute("aria-invalid", "false");
  });
}

// Pesan baru muncul setelah pengguna pernah menekan Simpan,
// supaya galat tidak menegur saat baru mulai mengetik.
let sudahMencoba = false;

formBuku.addEventListener("submit", (event) => {
  event.preventDefault();                    // 1. baris pertama: halaman tidak reload
  sudahMencoba = true;

  // filter memeriksa SEMUA field, jadi semua pesan muncul sekaligus
  const gagal = aturanField.filter((aturan) => !periksaField(aturan));

  if (gagal.length > 0) {
    tombolSimpan.disabled = true;            // ditahan sampai semua field valid
    gagal[0].input.focus();                  // pindah ke field pertama yang perlu diperbaiki
    return;
  }

  // Semua valid: data bertambah, lalu SATU kali perbarui tampilan
  daftarBuku.push({
    judul: inputJudul.value.trim(),
    penulis: inputPenulis.value.trim(),
    tahun: Number(inputTahun.value),
    status: pilihStatus.value,
  });
  perbarui();

  formBuku.reset();
  bersihkanGalat();
  sudahMencoba = false;
  tombolSimpan.disabled = false;
});

// Listener di form (parent) menangkap ketikan di semua field
formBuku.addEventListener("input", (event) => {
  if (!sudahMencoba) return;
  const aturan = aturanField.find((item) => item.input === event.target);
  if (!aturan) return;

  periksaField(aturan);                      // pesan hilang begitu isinya valid
  tombolSimpan.disabled = !semuaValid();     // tombol aktif lagi bila semua valid
});

/* =====================================================
   Hanya untuk memeriksa di Console (Lembar A sampai D)
   type="module" menyimpan variabel di dalam modul, jadi mengetik
   `isiTabel` di Console akan galat. Baris ini membukanya sementara.
   Hapus setelah pemeriksaan selesai.
   ===================================================== */
Object.assign(window, {
  ...elemenYangDiisi, tombolFilter, buatBaris, render, perbarui, tandaiTombolAktif,
});