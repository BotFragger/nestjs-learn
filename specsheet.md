# 📑 Specification Sheet — Backend Inventory Management System

## 1. 🎯 Kebutuhan Fitur

### 🔐 Authentication & Authorization
- User login dengan JWT.
- Role: `admin`, `staff`.
- Admin bisa mengelola semua data, staff hanya bisa input & update stok.

### 📦 Item Management
- CRUD Item (nama, kategori, harga, stok).
- Update stok masuk/keluar.
- Kategori barang (misalnya: elektronik, makanan, pakaian).

### 🧾 Transaction Management
- Pencatatan transaksi barang masuk (pembelian).
- Pencatatan transaksi barang keluar (penjualan).
- Laporan transaksi per periode.

### 📊 Dashboard
- Total jumlah item.
- Total stok barang.
- Transaksi masuk & keluar terbaru.
- Barang dengan stok menipis.

---

## 2. 🔗 Relasi Fitur
- **User** login → punya role (`admin`, `staff`).
- **Item** dikelompokkan dalam **Category**.
- **Transaction** mencatat perubahan stok:
  - Barang masuk (menambah stok).
  - Barang keluar (mengurangi stok).
- **Dashboard** mengambil data ringkasan dari Item & Transaction.

---

## 3. 🗄️ Desain Database (Relational)

### 📌 Entity Diagram (ERD)

```json
User (id, name, email, password, role, createdAt)
└──< Transaction (id, userId, itemId, type, quantity, createdAt)
Category (id, name)
└──< Item (id, name, categoryId, price, stock, createdAt)
```


---

### 📌 Tabel Detail

#### **users**
| Field     | Type        | Notes                              |
|-----------|-------------|------------------------------------|
| id        | UUID (PK)   | Primary key                        |
| name      | String      |                                    |
| email     | String (UQ) | Unique login                       |
| password  | String      | Hashed                             |
| role      | Enum (`admin`, `staff`) |                        |
| createdAt | DateTime    |                                    |

#### **categories**
| Field     | Type        | Notes            |
|-----------|-------------|------------------|
| id        | UUID (PK)   |                  |
| name      | String      | kategori barang  |

#### **items**
| Field     | Type        | Notes                  |
|-----------|-------------|------------------------|
| id        | UUID (PK)   |                        |
| name      | String      | nama barang            |
| categoryId| UUID (FK → categories.id) |           |
| price     | Decimal     | harga barang           |
| stock     | Int         | stok saat ini          |
| createdAt | DateTime    |                        |

#### **transactions**
| Field     | Type        | Notes                                       |
|-----------|-------------|---------------------------------------------|
| id        | UUID (PK)   |                                             |
| userId    | UUID (FK → users.id) | siapa yang input transaksi          |
| itemId    | UUID (FK → items.id) | barang yang ditransaksikan          |
| type      | Enum (`in`, `out`) | masuk (pembelian) atau keluar (penjualan) |
| quantity  | Int         | jumlah barang                               |
| createdAt | DateTime    |                                             |

---

## 4. ⚙️ Fitur Intermediate NestJS yang Digunakan
- **AuthModule** → JWT login.
- **Guards** → Role-based access.
- **Pipes** → Validasi input.
- **Filters** → Error handling.
- **Modules** → Modularisasi (Auth, Item, Category, Transaction, Dashboard).
- **Database** → Prisma ORM + PostgreSQL/MySQL.
- **Swagger** → Dokumentasi API.

---

## 5. 🚀 Contoh Use Case
1. **Admin login** → buat kategori "Elektronik".
2. Admin menambahkan **item baru**: "Laptop ASUS" harga 10jt, stok 20.
3. **Staff login** → input transaksi barang keluar (penjualan) 2 unit Laptop.
4. Stok Laptop otomatis berkurang jadi 18.
5. Dashboard menampilkan ringkasan stok & transaksi terbaru.
