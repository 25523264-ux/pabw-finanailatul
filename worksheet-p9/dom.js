// js/dom.js — Worksheet P9 · Lembar A · Fina Nailatul 'Izzah · 25523264
// app.js menyimpan data dan fungsi; berkas ini yang menyentuh halaman.


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


const tombolFilter = document.querySelectorAll("#filter button");


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
Object.assign(window, { ...elemenYangDiisi, tombolFilter });