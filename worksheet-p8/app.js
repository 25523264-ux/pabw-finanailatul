// js/app.js — Worksheet P8 · Fina Nailatul 'Izzah · 25523264
// Isi halaman tidak lagi ditulis di HTML: semuanya berasal dari data di berkas ini.

/* =====================================================
   LEMBAR B — Data halaman sebagai variabel
   ===================================================== */

// Identitas: satu object. Cukup diubah di sini bila ada yang berganti.
const profil = {
  nama: "Fina Nailatul 'Izzah",
  panggilan: "Fina",
  nim: "25523264",
  peran: "Mahasiswa Informatika yang belajar Project Manager, Front-end, Back-end",
  keahlian: ["HTML", "CSS", "JavaScript"],
  tahun: 2026,
};

// Kode status → teks yang tampil, dan kelas CSS untuk label berwarna
const labelStatus = {
  "sudah-dibaca": "Sudah Dibaca",
  "sedang-dibaca": "Sedang Dibaca",
  "belum-dibaca": "Belum Dibaca",
};
const kelasStatus = {
  "sudah-dibaca": "status--sudah",
  "sedang-dibaca": "status--sedang",
  "belum-dibaca": "status--belum",
};

// Array of object: satu isi = satu buku
const daftarBuku = [
  { judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005, status: "sudah-dibaca" },
  { judul: "Bumi", penulis: "Tere Liye", tahun: 2014, status: "sudah-dibaca" },
  { judul: "Filosofi Teras", penulis: "Henry Manampiring", tahun: 2018, status: "belum-dibaca" },
];

// Satu nilai angka (tipe number, bukan teks) yang dipakai di beberapa tempat
const jumlahBuku = daftarBuku.length;

// Judul halaman ditulis sekali, dipakai di dua tempat (tab dan <h1>)
const judulHalaman = `Koleksi Rak Buku ${profil.panggilan}`;

/* =====================================================
   LEMBAR C — Fungsi murni (hasil hanya bergantung pada argumen)
   ===================================================== */

// 1. Menyusun kalimat perkenalan dari satu object
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

// 2. Merapikan daftar keahlian menjadi satu baris teks
const formatKeahlian = (daftar) => daftar.join(" · ");

// 3. Menyusun satu baris tabel HTML dari satu buku
//    Tabel label dan kelas dikirim sebagai parameter, bukan dibaca dari luar fungsi
function buatBarisBuku(buku, nomor, daftarLabel, daftarKelas) {
  const label = daftarLabel[buku.status] ?? "Status belum diketahui";
  const kelas = daftarKelas[buku.status] ?? "";

  return `
    <tr>
      <th scope="row">${nomor}</th>
      <td>${buku.judul}</td>
      <td>${buku.penulis ?? "-"}</td>
      <td>${buku.tahun ?? "-"}</td>
      <td><span class="status ${kelas}">${label}</span></td>
    </tr>`;
}

// 4. Menyatukan judul-judul buku menjadi satu teks
const formatJudul = (daftar) => daftar.map((buku) => buku.judul).join(", ");

// 5. Nilai dari kolom isian selalu teks; ubah dulu menjadi angka
const ubahKeAngka = (teks) => Number(teks);

/* =====================================================
   LEMBAR D — map, filter, find (data asli tidak berubah)
   ===================================================== */

const sudahDibaca = daftarBuku.filter((buku) => buku.status === "sudah-dibaca");
const sedangDibaca = daftarBuku.filter((buku) => buku.status === "sedang-dibaca");
const belumDibaca = daftarBuku.filter((buku) => buku.status === "belum-dibaca");

// find: satu isi pertama yang cocok, atau undefined bila tidak ada
const bukuBerikutnya = daftarBuku.find((buku) => buku.status === "belum-dibaca");

// map: array baru dengan panjang sama
const semuaJudul = daftarBuku.map((buku) => buku.judul);

// sort mengubah array aslinya, jadi urutkan SALINANNYA saja (terbaru dulu)
const urutTerbaru = [...daftarBuku].sort((a, b) => b.tahun - a.tahun);

/* =====================================================
   Menampilkan data ke halaman
   ===================================================== */

// Mengambil elemen dengan aman: bila tidak ketemu, beri pesan jelas
// (bukan "Cannot read properties of null")
function ambilElemen(selector) {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen "${selector}" tidak ditemukan di profil.html`);
  }
  return elemen;
}

function isiTeks(selector, teks) {
  const elemen = ambilElemen(selector);
  if (elemen !== null) elemen.textContent = teks;
}

function isiHtml(selector, html) {
  const elemen = ambilElemen(selector);
  if (elemen !== null) elemen.innerHTML = html;
}

document.title = judulHalaman;
isiTeks("#judul-halaman", judulHalaman);

// Tabel buku dibuat dari array, bukan ditulis tangan
isiHtml("#isi-tabel", daftarBuku.map((buku, indeks) => buatBarisBuku(buku, indeks + 1, labelStatus, kelasStatus)).join(""));

// Kartu ringkasan
isiTeks("#jumlah-buku", `${jumlahBuku} buku tercatat`);
// let: nilainya diganti di tengah jalan bila ada buku yang belum dibaca
let kalimatBerikutnya = "Semua buku sudah selesai dibaca.";
if (bukuBerikutnya) {
  kalimatBerikutnya = `Berikutnya yang menunggu giliran: ${bukuBerikutnya.judul}.`;
}
isiTeks(
  "#ringkasan-teks",
  `Dari ${jumlahBuku} buku yang tercatat, ${sudahDibaca.length} sudah selesai dibaca. ${kalimatBerikutnya}`
);
isiTeks("#kaki-sudah", `Sudah dibaca: ${sudahDibaca.length}`);
isiTeks("#kaki-belum", `Belum dibaca: ${belumDibaca.length}`);

// Bagian Status Baca
isiTeks(
  "#status-sudah",
  sudahDibaca.length > 0 ? formatJudul(sudahDibaca) : "Belum ada buku yang selesai dibaca."
);
isiTeks(
  "#status-sedang",
  sedangDibaca.length > 0 ? formatJudul(sedangDibaca) : "Saat ini belum ada buku yang sedang saya baca."
);
isiTeks(
  "#status-belum",
  belumDibaca.length > 0 ? formatJudul(belumDibaca) : "Tidak ada buku yang menunggu giliran."
);

// Bagian Tentang Saya dan footer
isiTeks("#perkenalan", buatPerkenalan(profil));
isiTeks("#keahlian-teks", `Keahlian: ${formatKeahlian(profil.keahlian)}`);
isiTeks("#footer-teks", `${profil.nama} | NIM: ${profil.nim} | ${profil.tahun}`);

/* =====================================================
   Pemeriksaan di Console (untuk tabel D.4 dan tangkapan layar)
   ===================================================== */

console.log(typeof profil.nama);                              // "string"
console.log(typeof jumlahBuku);                               // "number"
console.log(profil.kontak?.email ?? "(email belum diisi)");   // akses aman + nilai bawaan

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

console.table(profil.keahlian);
console.table(daftarBuku);
console.table(sudahDibaca);                                   // subset hasil filter
console.log(bukuBerikutnya);                                  // satu object dari find
console.log(semuaJudul.length === daftarBuku.length);        // map: panjang sama → true

console.table(urutTerbaru);                                   // salinan: 2018, 2014, 2005
console.log(daftarBuku[0].judul);                             // tetap "Laskar Pelangi": data asli tidak berubah

console.log(ubahKeAngka("2018") + 1);                         // 2019, bukan "20181"

/* =====================================================
   Hanya untuk memeriksa di Console (Lembar B, C, dan D)
   type="module" menyimpan variabel di dalam modul, jadi
   ketik `profil` di Console akan galat. Baris ini membukanya
   sementara. Hapus setelah pemeriksaan selesai.
   ===================================================== */
Object.assign(window, {
  profil, daftarBuku, jumlahBuku, buatPerkenalan, formatKeahlian,
  sudahDibaca, belumDibaca, bukuBerikutnya, semuaJudul, urutTerbaru,
});