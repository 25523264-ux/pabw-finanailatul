// js/app.js — Worksheet P9 · Fina Nailatul 'Izzah · 25523264
// Isi halaman tidak lagi ditulis di HTML: semuanya berasal dari data di berkas ini.

// P10: lapisan data ada di js/api.js
import { load } from "./api.js";


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
export const labelStatus = {
  "sudah-dibaca": "Sudah Dibaca",
  "sedang-dibaca": "Sedang Dibaca",
  "belum-dibaca": "Belum Dibaca",
};
export const kelasStatus = {
  "sudah-dibaca": "status--sudah",
  "sedang-dibaca": "status--sedang",
  "belum-dibaca": "status--belum",
};

// Array of object: satu isi = satu buku
export const daftarBuku = [
  { judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005, status: "sudah-dibaca" },
  { judul: "Bumi", penulis: "Tere Liye", tahun: 2014, status: "sudah-dibaca" },
  { judul: "Filosofi Teras", penulis: "Henry Manampiring", tahun: 2018, status: "belum-dibaca" },
];

// Satu nilai angka (tipe number, bukan teks) yang dipakai di beberapa tempat
const jumlahBuku = daftarBuku.length;

// Judul halaman ditulis sekali, dipakai di dua tempat (tab dan <h1>)
const judulHalaman = `Koleksi Rak Buku ${profil.panggilan}`;


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



const sudahDibaca = daftarBuku.filter((buku) => buku.status === "sudah-dibaca");
const sedangDibaca = daftarBuku.filter((buku) => buku.status === "sedang-dibaca");
const belumDibaca = daftarBuku.filter((buku) => buku.status === "belum-dibaca");

// find: satu isi pertama yang cocok, atau undefined bila tidak ada
const bukuBerikutnya = daftarBuku.find((buku) => buku.status === "belum-dibaca");

// map: array baru dengan panjang sama
const semuaJudul = daftarBuku.map((buku) => buku.judul);


const urutTerbaru = [...daftarBuku].sort((a, b) => b.tahun - a.tahun);


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



console.log(typeof profil.nama);                             
console.log(typeof jumlahBuku);                               
console.log(profil.kontak?.email ?? "(email belum diisi)");  

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

console.table(profil.keahlian);
console.table(daftarBuku);
console.table(sudahDibaca);                                   
console.log(bukuBerikutnya);                                  
console.log(semuaJudul.length === daftarBuku.length);        

console.table(urutTerbaru);                                   
console.log(daftarBuku[0].judul);                             

console.log(ubahKeAngka("2018") + 1);                         


// P10 B.2 — Tampilkan kesalahan di halaman, bukan hanya di Console
function tampilkanGalat(pesan) {
  const elemen = ambilElemen("#pesan-galat");
  if (elemen === null) return;
  elemen.textContent = pesan;
  elemen.hidden = false;
}

function sembunyikanGalat() {
  const elemen = ambilElemen("#pesan-galat");
  if (elemen !== null) elemen.hidden = true;
}

// P10 C.1 — Dua arah JSON
// Arah 1: teks → nilai (membaca). Hasilnya objek yang kuncinya bisa dijangkau.
const teksBuku = '{"judul":"Laskar Pelangi","tahun":2005}';
const objekBuku = JSON.parse(teksBuku);
console.log(objekBuku.judul, typeof objekBuku);       

// Arah 2: nilai → teks (mengirim atau menyimpan). Hasilnya string.
const teksKembali = JSON.stringify(daftarBuku[0]);
console.log(teksKembali, typeof teksKembali);          


/* =====================================================
   P10 LEMBAR D — Data dari jaringan tampil di halaman
   Pengambilan data ada di api.js. Berkas ini hanya menggambar.
   ===================================================== */

const wadahApi = ambilElemen("#hasil-api");     // kontainer kartu
const statusApi = ambilElemen("#status-api");   // teks untuk keadaan memuat / kosong

function tampilkanStatusApi(teks) {
  statusApi.textContent = teks;
  statusApi.hidden = false;
}

function sembunyikanStatusApi() {
  statusApi.hidden = true;
}

// D.1 — Satu item array → satu kartu. Pakai textContent, bukan innerHTML,
// karena isinya datang dari jaringan.
function buatKartuApi(buku) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const isi = document.createElement("div");
  isi.className = "kartu__isi";

  const judul = document.createElement("h3");
  judul.textContent = buku.title ?? "Tanpa judul";

  const penulis = document.createElement("p");
  penulis.textContent = `Penulis: ${buku.author_name?.join(", ") ?? "-"}`;

  isi.append(judul, penulis);

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";

  const tahun = document.createElement("strong");
  tahun.textContent = `Terbit: ${buku.first_publish_year ?? "-"}`;

  const sumber = document.createElement("span");
  sumber.textContent = "Open Library";

  kaki.append(tahun, sumber);

  kartu.append(isi, kaki);
  return kartu;
}

// D.1 — Menggambar seluruh daftar. Tiga tugas tetap, urutannya tidak boleh ditukar.
function renderApi(daftar) {
  wadahApi.textContent = "";                    // 1. kosongkan dulu (kartu tidak berlipat)

  if (daftar.length === 0) {                    // 2. keadaan KOSONG
    tampilkanStatusApi("Belum ada buku yang ditemukan.");
    return;
  }
  sembunyikanStatusApi();

  const fragmen = document.createDocumentFragment();   // wadah sementara
  daftar.forEach((buku) => fragmen.append(buatKartuApi(buku)));

  wadahApi.append(fragmen);                     // 3. halaman digambar sekali
}

// D.2 — Empat keadaan antarmuka: memuat, berhasil, gagal, kosong
async function muatDariApi() {
  if (wadahApi === null || statusApi === null) return;   // HTML belum lengkap

  sembunyikanGalat();
  wadahApi.textContent = "";
  tampilkanStatusApi("Memuat data dari Open Library…");   // keadaan MEMUAT

  try {
    const data = await load();                  // api.js: json() ada di sana

    console.log(data);                          // C.3: bentuk data
    console.table(data.docs);
    window.dataApi = data;

    renderApi(data.docs ?? []);                 // keadaan BERHASIL atau KOSONG
  } catch (error) {
    sembunyikanStatusApi();
    tampilkanGalat("Gagal memuat data: " + error.message);   // keadaan GAGAL
  }
}

muatDariApi();


Object.assign(window, {
  profil, daftarBuku, jumlahBuku, buatPerkenalan, formatKeahlian,
  sudahDibaca, belumDibaca, bukuBerikutnya, semuaJudul, urutTerbaru,
  load,          // P10: supaya bisa dipanggil dari Console
  muatDariApi,   // P10: untuk menguji skenario jaringan mati
  objekBuku, teksKembali,   // P10 C.1
  renderApi,     // P10 D: renderApi([]) untuk melihat keadaan kosong
});