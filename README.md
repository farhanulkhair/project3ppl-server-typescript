# 📚 Comic Books API

## 🌟 Overview

Comic Books API adalah sistem manajemen komik sederhana namun powerful yang dibangun dengan Express.js. API ini menyediakan berbagai endpoint untuk mengelola koleksi komik digital, dengan dukungan untuk operasi CRUD lengkap (Create, Read, Update, Delete) serta fitur tambahan seperti pencarian, statistik, dan operasi massal.

## ✨ Fitur Utama

- **Manajemen Komik Komprehensif**: Tambah, lihat, perbarui, dan hapus data komik
- **Paginasi**: Tampilkan data komik dengan jumlah yang diinginkan per halaman
- **Pencarian**: Cari komik berdasarkan kata kunci
- **Filtering**: Filter komik berdasarkan penulis, genre, penerbit, atau tahun
- **Statistik**: Dapatkan insight tentang koleksi komik Anda
- **Operasi Massal**: Tambah atau hapus beberapa komik sekaligus
- **Validasi Data**: Validasi input untuk memastikan integritas data
- **Penanganan Error**: Pesan error yang jelas dan informatif

## 🛠️ Teknologi

- Node.js
- Express.js
- JavaScript
- TypeScript
- JSON (untuk penyimpanan data)

## 📋 Prasyarat

- Node.js (versi 14.0.0 atau lebih baru)
- npm (versi 6.0.0 atau lebih baru)
- TypeScript (versi 4.5.0 atau lebih baru)

## 🚀 Instalasi dan Pengaturan

### 1. Clone repository

```bash
git clone https://github.com/notsuperganang/tugas3ppl-server.git
cd comic-books-api
```

### 2. Instalasi dependensi

```bash
npm install
```

### 3. Jalankan server

```bash
node index.js
```

Server akan berjalan pada `http://localhost:3000`.

## 🔄 Versi TypeScript

Proyek ini telah dikonversi dari JavaScript ke TypeScript untuk memberikan benefit type safety, kemudahan maintenance, dan fitur TypeScript lainnya.

### 🚀 Instalasi dan Pengaturan untuk Versi TypeScript

#### 1. Clone repository

```bash
git clone https://github.com/notsuperganang/tugas3ppl-server.git
cd comic-books-api
```

#### 2. Instalasi dependensi

```bash
npm install
```

#### 3. Kompilasi TypeScript ke JavaScript

```bash
npx tsc
```

Perintah ini akan mengkompilasi semua file TypeScript (.ts) menjadi JavaScript (.js) sesuai dengan konfigurasi dalam `tsconfig.json`.

#### 4. Jalankan server

```bash
node dist/index.js
```

Server akan berjalan pada `http://localhost:3000`.

### 🛠️ Pengembangan dengan TypeScript

#### Cara Menjalankan dalam Mode Development

Untuk pengembangan, Anda dapat menggunakan ts-node untuk menjalankan kode TypeScript secara langsung tanpa kompilasi terpisah:

```bash
npm install -g ts-node
ts-node src/index.ts
```

Atau tambahkan script di package.json:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts",
  "build": "tsc"
}
```

Kemudian cukup jalankan:

```bash
npm run dev
```

#### Struktur Project TypeScript

```
comic-books-api/
│
├── src/                    # Direktori source code TypeScript
│   ├── index.ts            # File utama aplikasi
│   ├── routes/             # Direktori untuk route handlers
│   ├── models/             # Direktori untuk model data
│   └── utils/              # Utilitas dan helper functions
│
├── dist/                   # Output kompilasi TypeScript (auto-generated)
├── tsconfig.json           # Konfigurasi TypeScript
├── package.json            # Dependensi dan konfigurasi project
├── package-lock.json       # Lock file untuk dependensi
└── README.md               # Dokumentasi project (file ini)
```

### ⚙️ Konfigurasi TypeScript

Proyek ini menggunakan konfigurasi TypeScript standar. Jika Anda ingin menyesuaikan konfigurasi, dapat mengedit file `tsconfig.json`.

Berikut adalah contoh konfigurasi dasar yang digunakan:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 📝 Catatan Penting untuk Kontributor

Saat bekerja dengan versi TypeScript dari project ini:

- Selalu definisikan interface atau type untuk struktur data
- Gunakan type annotation untuk parameter fungsi dan return type
- Jalankan `npm run build` atau `npx tsc` sebelum commit untuk memastikan tidak ada error kompilasi
- Tambahkan dokumentasi JSDoc untuk fungsi-fungsi penting

## 📝 Penggunaan API

API ini menyediakan berbagai endpoint untuk mengelola data komik. Berikut adalah daftar endpoint yang tersedia:

### Endpoint Utama

| Metode | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/comics` | Mendapatkan semua komik dengan opsi paginasi dan filtering |
| GET | `/comics/:id` | Mendapatkan detail komik berdasarkan ID |
| POST | `/comics` | Menambahkan komik baru |
| PUT | `/comics/:id` | Memperbarui data komik yang sudah ada |
| DELETE | `/comics/:id` | Menghapus komik berdasarkan ID |

### Endpoint Tambahan

| Metode | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/search/comics/:keyword` | Mencari komik berdasarkan kata kunci |
| GET | `/stats/comics` | Mendapatkan statistik tentang koleksi komik |
| POST | `/comics/bulk` | Menambahkan beberapa komik sekaligus |
| DELETE | `/comics/bulk` | Menghapus beberapa komik sekaligus |

## 📊 Detail Penggunaan Endpoint

### 1. Mendapatkan Semua Komik

```
GET /comics
```

#### Parameter Query (Opsional)

- `page`: Nomor halaman (default: 1)
- `limit`: Jumlah item per halaman (default: 10)
- `author`: Filter berdasarkan penulis
- `genre`: Filter berdasarkan genre
- `publisher`: Filter berdasarkan penerbit
- `year`: Filter berdasarkan tahun

#### Contoh Response

```json
{
  "data": [
    {
      "id": 1,
      "title": "Batman: The Dark Knight Returns",
      "author": "Frank Miller",
      "year": 1986,
      "publisher": "DC Comics",
      "genre": "Superhero",
      "description": "Set in a dystopian future, an aged Bruce Wayne dons the Batman costume once again."
    },
    {
      "id": 2,
      "title": "Watchmen",
      "author": "Alan Moore",
      "year": 1986,
      "publisher": "DC Comics",
      "genre": "Superhero",
      "description": "Deconstruction of the superhero concept, features complex characters and alternating storylines."
    }
  ],
  "totalItems": 3,
  "totalPages": 1,
  "currentPage": 1
}
```

### 2. Mendapatkan Komik Berdasarkan ID

```
GET /comics/:id
```

#### Contoh Response

```json
{
  "data": {
    "id": 1,
    "title": "Batman: The Dark Knight Returns",
    "author": "Frank Miller",
    "year": 1986,
    "publisher": "DC Comics",
    "genre": "Superhero",
    "description": "Set in a dystopian future, an aged Bruce Wayne dons the Batman costume once again."
  }
}
```

### 3. Menambahkan Komik Baru

```
POST /comics
```

#### Request Body

```json
{
  "title": "Saga",
  "author": "Brian K. Vaughan",
  "year": 2012,
  "publisher": "Image Comics",
  "genre": "Science Fantasy",
  "description": "An epic space opera/fantasy comic book series."
}
```

#### Contoh Response

```json
{
  "message": "Comic added successfully",
  "data": {
    "id": 4,
    "title": "Saga",
    "author": "Brian K. Vaughan",
    "year": 2012,
    "publisher": "Image Comics",
    "genre": "Science Fantasy",
    "description": "An epic space opera/fantasy comic book series."
  }
}
```

### 4. Memperbarui Komik

```
PUT /comics/:id
```

#### Request Body

```json
{
  "description": "A groundbreaking Batman story set in a dystopian future."
}
```

#### Contoh Response

```json
{
  "message": "Comic updated successfully",
  "data": {
    "id": 1,
    "title": "Batman: The Dark Knight Returns",
    "author": "Frank Miller",
    "year": 1986,
    "publisher": "DC Comics",
    "genre": "Superhero",
    "description": "A groundbreaking Batman story set in a dystopian future."
  }
}
```

### 5. Menghapus Komik

```
DELETE /comics/:id
```

#### Contoh Response

```json
{
  "message": "Comic deleted successfully",
  "data": {
    "id": 1,
    "title": "Batman: The Dark Knight Returns",
    "author": "Frank Miller",
    "year": 1986,
    "publisher": "DC Comics",
    "genre": "Superhero",
    "description": "A groundbreaking Batman story set in a dystopian future."
  }
}
```

### 6. Mencari Komik

```
GET /search/comics/:keyword
```

#### Contoh Response

```json
{
  "message": "Found 1 comics matching keyword: batman",
  "data": [
    {
      "id": 1,
      "title": "Batman: The Dark Knight Returns",
      "author": "Frank Miller",
      "year": 1986,
      "publisher": "DC Comics",
      "genre": "Superhero",
      "description": "A groundbreaking Batman story set in a dystopian future."
    }
  ]
}
```

### 7. Statistik Komik

```
GET /stats/comics
```

#### Contoh Response

```json
{
  "totalComics": 3,
  "uniquePublishers": 2,
  "uniqueAuthors": 3,
  "uniqueGenres": 3,
  "publisherCounts": {
    "DC Comics": 2,
    "Pantheon Books": 1
  },
  "authorCounts": {
    "Frank Miller": 1,
    "Alan Moore": 1,
    "Art Spiegelman": 1
  },
  "genreCounts": {
    "Superhero": 2,
    "Biography": 1
  },
  "oldestComic": {
    "id": 1,
    "title": "Batman: The Dark Knight Returns",
    "author": "Frank Miller",
    "year": 1986,
    "publisher": "DC Comics",
    "genre": "Superhero",
    "description": "A groundbreaking Batman story set in a dystopian future."
  },
  "newestComic": {
    "id": 3,
    "title": "Maus",
    "author": "Art Spiegelman",
    "year": 1991,
    "publisher": "Pantheon Books",
    "genre": "Biography",
    "description": "A survivor's tale, portraying Jews as mice and Nazis as cats during the Holocaust."
  }
}
```

### 8. Operasi Massal

#### Menambahkan Beberapa Komik Sekaligus

```
POST /comics/bulk
```

#### Request Body

```json
[
  {
    "title": "Sandman",
    "author": "Neil Gaiman",
    "year": 1989,
    "publisher": "DC Comics",
    "genre": "Fantasy",
    "description": "A collection of stories about the Lord of Dreams."
  },
  {
    "title": "Persepolis",
    "author": "Marjane Satrapi",
    "year": 2000,
    "publisher": "Pantheon Books",
    "genre": "Autobiography",
    "description": "An autobiographical graphic novel depicting the author's childhood in Iran during the Islamic Revolution."
  }
]
```

#### Contoh Response

```json
{
  "message": "Successfully added 2 comics, failed to add 0 comics",
  "addedComics": [
    {
      "id": 4,
      "title": "Sandman",
      "author": "Neil Gaiman",
      "year": 1989,
      "publisher": "DC Comics",
      "genre": "Fantasy",
      "description": "A collection of stories about the Lord of Dreams."
    },
    {
      "id": 5,
      "title": "Persepolis",
      "author": "Marjane Satrapi",
      "year": 2000,
      "publisher": "Pantheon Books",
      "genre": "Autobiography",
      "description": "An autobiographical graphic novel depicting the author's childhood in Iran during the Islamic Revolution."
    }
  ],
  "failedComics": []
}
```

#### Menghapus Beberapa Komik Sekaligus

```
DELETE /comics/bulk
```

#### Request Body

```json
{
  "ids": [4, 5]
}
```

#### Contoh Response

```json
{
  "message": "Successfully deleted 2 comics, could not find 0 comics",
  "deletedComics": [
    {
      "id": 4,
      "title": "Sandman",
      "author": "Neil Gaiman",
      "year": 1989,
      "publisher": "DC Comics",
      "genre": "Fantasy",
      "description": "A collection of stories about the Lord of Dreams."
    },
    {
      "id": 5,
      "title": "Persepolis",
      "author": "Marjane Satrapi",
      "year": 2000,
      "publisher": "Pantheon Books",
      "genre": "Autobiography",
      "description": "An autobiographical graphic novel depicting the author's childhood in Iran during the Islamic Revolution."
    }
  ],
  "notFoundIds": []
}
```

## 🧪 Cara Menguji API dengan Postman

### 1. Persiapan

- Pastikan server Express.js berjalan di `http://localhost:3000`
- Buka aplikasi Postman (atau versi web di [go.postman.co](https://go.postman.co))

### 2. Mengatur Collection

1. Buat Collection baru dengan nama "Comic Books API"
2. Dalam Collection ini, Anda akan menyimpan semua request untuk testing

### 3. Menguji Endpoint GET

1. Buat request baru dalam Collection
2. Pilih metode "GET"
3. Masukkan URL `http://localhost:3000/comics`
4. Klik "Send"
5. Anda akan melihat daftar semua komik dalam format JSON

### 4. Menguji Endpoint POST

1. Buat request baru
2. Pilih metode "POST"
3. Masukkan URL `http://localhost:3000/comics`
4. Pilih tab "Body", lalu pilih "raw" dan "JSON"
5. Masukkan data komik baru dalam format JSON
6. Klik "Send"
7. Anda akan melihat response yang mengkonfirmasi komik telah ditambahkan

### 5. Alur Pengujian yang Disarankan

1. Mulai dengan GET semua komik
2. Tambahkan komik baru dengan POST
3. Verifikasi dengan GET specific comic
4. Update komik dengan PUT
5. Verifikasi perubahan dengan GET
6. Hapus komik dengan DELETE
7. Verifikasi penghapusan dengan GET all

## 📁 Struktur Project

```
comic-books-api/
│
├── index.js                # File utama aplikasi (server Express dan semua logic)
├── package.json            # Dependensi dan konfigurasi project
├── package-lock.json       # Lock file untuk dependensi
└── README.md               # Dokumentasi project (file ini)
```

## 👥 Kontribusi

Kontribusi selalu diterima dengan senang hati! Untuk berkontribusi:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---

<p align="center">Dibuat dengan ❤️ untuk ppl cihuy</p>
