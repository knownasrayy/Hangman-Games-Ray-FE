# Dokumentasi Proyek — Hangman‑Games‑Ray‑FE

## 📄 Daftar Isi

- [1. Tujuan & Deskripsi Proyek](#1-tujuan--deskripsi-proyek)  
- [2. Arsitektur & Struktur Folder](#2-arsitektur--struktur-folder)  
- [3. Modul & Fitur](#3-modul--fitur)  
- [4. Alur Logika Permainan (Game Logic)](#4-alur-logika-permainan-game-logic)  
- [5. Tampilan & UI / UX](#5-tampilan--ui--ux)  
- [6. Cara Menjalankan & Build](#6-cara-menjalankan--build)  
- [7. Ide Pengembangan / Peningkatan (Future Improvements)](#7-ide-pengembangan--peningkatan-future-improvements)  
- [8. Cara Berkontribusi](#8-cara-berkontribusi)  

---

## 1. Tujuan & Deskripsi Proyek

**Hangman‑Games‑Ray‑FE** adalah implementasi frontend dari permainan klasik “Hangman” (tebak kata), menggunakan teknologi modern: React + TypeScript + Tailwind CSS + Vite.

Tujuannya:  
- Memberikan pengalaman bermain Hangman secara interaktif di browser — tanpa backend.  
- Sebagai proyek latihan / portofolio untuk menunjukkan kemampuan membangun aplikasi web interaktif.  
- Sebagai basis yang bisa dikembangkan lebih lanjut (misalnya: high‑score, multiplayer, database, dsb).

---

## 2. Arsitektur & Struktur Folder

Berikut struktur folder direkomendasikan untuk proyek ini:

hangman-games-ray-fe/
│
├── node_modules/ # dependencies
├── public/ # aset statis, index.html
│
├── src/ # kode utama
│ ├── components/ # komponen UI yang bisa dipakai ulang (buttons, input, letter‑tile, dsb)
│ ├── pages/ # “halaman / view” (meskipun ini SPA, bisa dipakai untuk main screen, result screen, dsb)
│ ├── utils/ # fungsi utilitas umum (misalnya random word generator, helper string)
│ ├── assets/ # aset seperti gambar, icon, font, jika ada
│ ├── styles/ # konfigurasi Tailwind atau style global khusus (jika ada)
│ └── App.tsx # entry point aplikasi
│
├── package.json # metadata & dependensi
├── tsconfig.json # konfigurasi TypeScript
└── vite.config.ts # konfigurasi build / dev server Vite


**Catatan struktur:** meskipun proyek sederhana, membedakan `components`, `pages`, dan `utils` membantu menjaga kode rapi dan mudah dikembangkan. Pendekatan modular menjamin kode tetap “scalable” meskipun proyek nanti bertambah besar.  

---

## 3. Modul & Fitur

Berikut modul/fitur utama dalam aplikasi ini, beserta tanggung jawabnya:

| Modul / Area | Fungsi / Deskripsi |
|-------------|--------------------|
| **Word Generator / Logic** | Mengambil kata acak dari daftar kata‑kata, menyembunyikan huruf, menyiapkan status awal permainan. |
| **Guess Handler** | Menerima input tebakan huruf dari pemain, mengecek apakah huruf ada di kata, mengupdate status huruf yang sudah ter‑tebak, serta melacak huruf yang sudah ditebak agar tidak bisa ditebak ulang. |
| **Wrong Guess Counter & Game State** | Menghitung jumlah tebakan salah; menentukan kondisi “kalah” (jika melebihi batas salah) atau “menang” (jika semua huruf terungkap). |
| **UI Components** | Komponen visual seperti papan huruf tersembunyi (blanks), huruf‑tile untuk tebakan, tombol atau input, tampilan status (menang/kalah), dan feedback untuk pemain. |
| **Responsive Layout & Styling** | Menggunakan Tailwind CSS untuk membuat UI fleksibel dan responsif — mendukung berbagai ukuran layar / perangkat. |
| **Single‑Page App (SPA)** | Semua logika berjalan di frontend; tidak ada backend. Setelah dibuka, game bisa dimainkan langsung tanpa server‑side. |

---

## 4. Alur Logika Permainan (Game Logic)

Secara garis besar, berikut tahapan logika permainan:

1. Saat aplikasi dimuat → generate secara acak satu kata dari daftar kata.  
2. Kata diubah menjadi tampilan “blank” (underscore atau kotak kosong) per huruf — pemain melihat sejumlah space sesuai panjang kata.  
3. Pemain memilih / memasukkan huruf untuk ditebak (misalnya via klik pada komponen huruf atau input).  
4. Sistem memeriksa:  
   - Jika huruf ada di dalam kata → tampilkan huruf tersebut di posisi yang benar.  
   - Jika huruf tidak ada → increment “wrong guess counter”.  
5. Cegah pemain menebak huruf yang sama lebih dari sekali (disable pilihan / ignore input ulang).  
6. Periksa kondisi:  
   - Jika semua huruf telah terungkap → pemain menang (tampilkan pesan / UI kemenangan).  
   - Jika jumlah kesalahan mencapai batas maksimal → pemain kalah (tampilkan pesan / UI kekalahan, dan kemungkinan reveal kata).  
7. Beri opsi untuk “main lagi” (reset permainan: generate kata baru, reset counters, reset state).  

---

## 5. Tampilan & UI / UX

Walaupun tampilan bisa kamu sesuaikan sendiri, berikut rekomendasi struktur UI untuk kenyamanan pengguna:

- **Halaman utama** — menampilkan papan kata tersembunyi + pilihan huruf / input huruf.  
- **Feedback real‑time** — ketika pemain menebak, huruf muncul langsung jika benar, atau indikator kesalahan jika salah.  
- **Status permainan** — tampilan menang / kalah yang jelas, dengan tombol “Play Again”.  
- **Responsif & Bersih** — UI minimalis dan rapi: gunakan Tailwind untuk margin, padding, warna, responsivitas agar tampilan tetap baik di desktop maupun mobile.  
- **Pencegahan tebakan ulang** — huruf yang sudah ditebak (benar atau salah) harus tampil berbeda / dinonaktifkan agar tidak ditebak lagi — meningkatkan pengalaman pengguna / mencegah error.  

---

## 6. Cara Menjalankan & Build

Instruksi bagi siapa pun yang ingin menjalankan proyek ini secara lokal:

```bash
# 1. Clone repository  
git clone https://github.com/knownasrayy/Hangman-Games-Ray-FE.git  
cd Hangman-Games-Ray-FE

# 2. Install dependencies  
npm install     # atau `yarn` kalau pakai yarn

# 3. Jalankan server development (live‑reload)  
npm run dev     # Vite akan menjalankan di http://localhost:5173 (atau port yang tertera)

# 4. Untuk build production  
npm run build  

# 5. Hasil build berada di folder `dist/` — siap dideploy ke static hosting (misalnya GitHub Pages, Netlify, Vercel, dsb.)  


7. Ide Pengembangan / Peningkatan (Future Improvements)

Beberapa ide untuk menjadikan proyek ini lebih matang dan menarik:

Simpan skor pemain / history (misalnya di localStorage atau backend).

Tambahkan fitur multi‑game session — misalnya daftar kata acak, timer, atau mode tantangan.

Tambahkan animasi atau efek transisi — misalnya saat huruf muncul, saat menang/kalah, efek visual untuk kesalahan.

Tambahkan tema / mode gelap‑terang (dark / light mode).

Tambahkan validasi input — misalnya hanya huruf, cegah input non‑alfabet, dsb.

Tambahkan daftar kata yang lebih besar / data eksternal (API atau file JSON) — agar game lebih beragam.

Tambahkan testing — unit test untuk logika, test UI, agar proyek lebih stabil saat dikembangkan lebih lanjut.

8. Cara Berkontribusi

Jika kamu atau developer lain ingin berkontribusi atau mengembangkan proyek ini, caranya:

Fork repository ini.

Buat branch baru: feature‑nama‑fitur (misalnya feature‑add‑dark‑mode).

Implementasikan perubahan / fitur baru / perbaikan bug.

Commit & push branch kamu.

Buka Pull Request — sertakan deskripsi perubahan, alasannya, dan cara mengetesnya.

Selalu jaga konsistensi struktur folder dan kode supaya dokumentasi tetap relevan serta mudah dipahami oleh kontributor lain.
