# Worksheet P10 — JavaScript Asinkron: fetch, Promise, dan JSON

Fina Nailatul 'Izzah · NIM 25523264 · Pengembangan Aplikasi Berbasis Web (SIF302)

## Isi
Halaman Koleksi Rak Buku mengambil daftar buku dari API publik Open Library
(`https://openlibrary.org/search.json`, tanpa kunci akses) dan menampilkannya
sebagai kartu. Empat keadaan antarmuka ditangani: memuat, berhasil, gagal, kosong.

## Struktur
- `js/api.js`  — lapisan data: `fetch`, pemeriksaan `response.ok`, `try/catch`, fungsi `load()` yang diekspor
- `js/app.js`  — memanggil `load()`, merender kartu, menampilkan pesan galat
- `js/dom.js`  — tabel buku dan formulir (dari Pertemuan 9, tidak diubah)
- `bukti/`     — tangkapan layar keempat keadaan

## Cara menjalankan
Buka lewat server lokal (misalnya Live Server atau `python3 -m http.server 8000`),
bukan klik ganda, karena memakai modul JavaScript.

## Pengungkapan AI
- Dibantu AI (Claude): penyusunan kode `js/api.js`
  serta penjelasan konsep (`response.ok`, `async/await`, `try/catch`, empat keadaan).
- Saya kerjakan sendiri: penyusunan kode menyalin dan menyiapkan folder, menjalankan semua pengujian
  di browser (Console dan Network), mencatat status, `response.ok`, dan Content-Type,
  mengambil tangkapan layar, mengisi worksheet, dan commit ke GitHub.

## Catatan
Alamat API ditulis sekali di `js/api.js` (`ALAMAT_API`).



## Pertemuan 9 — DOM, Event, dan Interaktivitas

**Yang dikerjakan**
- Lembar A: memilih elemen dengan `querySelector` dan `querySelectorAll`, disimpan di `js/dom.js`
- Lembar B: daftar buku dibangun dari data dengan `createElement`, `textContent`, dan `append`
- Lembar C: tombol filter dengan satu listener pada parent (event delegation)
- Lembar D: fungsi `render`, validasi form dengan pesan galat per field
- Lembar E: percobaan membaca gejala (selector null, listener ganda, kondisi kosong)

**Pengungkapan AI**
- Dibantu AI (Claude): penulisan dan penjelasan kode di `js/dom.js`, penambahan id dan elemen di `profil.html`
- Saya kerjakan sendiri: menjalankan dan menguji di Chrome, melakukan percobaan Lembar E dan mengambil tangkapan layarnya, mengisi tabel dan hasil pengamatan di worksheet, serta exit ticket dan penilaian diri di Lembar F.
- Saya memahami fungsi setiap bagian kode dan bisa menjelaskannya.



## Pertemuan 4 - Design token halaman profil

- Berkas gaya yang akan dibuat: `tokens.css`, `base.css`, `layout.css`, `komponen.css`, `tema.css`
- Warna utama dipilih: `#631157` (ungu plum), karena memberikan kesan elegan, feminin, dan tetap memiliki kontras yang baik dengan latar berwarna pastel.

### Token yang saya tetapkan

| Token | Nilai | Untuk apa |
|--------|--------|------------|
| --color-primary | #631157 | tombol, tautan, penanda |
| --color-fg | #30072C | warna teks utama |
| --color-bg | #F7E0EF | latar halaman |
| --color-surface | #FFF8F4 | latar kartu dan panel |
| --color-border | #C77ED5 | garis pemisah dan tepi kotak |
| --color-danger | #D1495B | pesan kesalahan dan peringatan |
| --color-focus | #ECC1ED | indikator fokus papan ketik |

### Alasan pemilihan warna

- `#F7E0EF` digunakan sebagai latar utama karena memberikan kesan lembut, hangat, dan nyaman dilihat.
- `#FFF8F4` digunakan pada kartu dan panel agar konten lebih menonjol serta tetap terlihat bersih.
- `#30072C` dipilih sebagai warna teks utama karena memiliki tingkat keterbacaan yang tinggi pada latar terang.
- `#631157` digunakan sebagai warna primer untuk tombol, tautan, dan penanda karena memberikan kesan elegan serta menjadi pusat perhatian pengguna.
- `#C77ED5` digunakan sebagai warna border untuk memberikan pemisahan antar elemen tanpa terlihat terlalu kontras.
- `#D1495B` digunakan untuk menampilkan pesan kesalahan atau peringatan agar mudah dikenali.
- `#ECC1ED` digunakan sebagai warna fokus untuk meningkatkan aksesibilitas saat navigasi menggunakan keyboard.

### Kriteria selesai

Mengubah nilai `--color-primary` pada satu tempat harus secara otomatis mengubah warna tombol, tautan, penanda, dan elemen interaktif lainnya secara konsisten di seluruh halaman.

## Pertemuan 3 — Halaman Rak Buku Fina

Topik halaman saya: Daftar buku yang saya miliki beserta status bacanya.

* Judul halaman: Rak Buku Fina
* Deskripsi: Daftar buku yang Fina miliki beserta status bacanya.
* Tautan navigasi: Daftar Buku, Tambah Buku, Tentang Saya
* Dua bagian utama: Daftar Buku, Tambah Buku
* Kolom tabel: Judul, Penulis, Tahun Terbit, Status Baca
* Kolom form: Judul, Penulis, Status Baca
* Gambar: koleksi_buku.jpg
mk
## Catatan penggunaan AI

Pembuatan kerangka HTML dan struktur dokumen dibantu oleh AI sesuai kaidah semantik.