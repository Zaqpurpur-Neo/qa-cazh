TEST-ID: AGT-3.1
scenario: Load halaman Staff
expected: Sistem menampilkan section Rangkuman Data Staff (Jenis + Jumlah) di atas, dan List Data Staff dengan 7 kolom: Nama, Nomor Kartu, Jabatan, Staff, Instansi, Status, Aksi (Detail)

TEST-ID: AGT-3.2
scenario: Cek section Rangkuman Data Staff
expected: Menampilkan breakdown per Jenis Staff dengan Jumlah masing-masing (summary statistics)

TEST-ID: AGT-3.3
scenario: Buka halaman Staff saat belum ada data
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: AGT-3.4
scenario: Cek default sort list Staff
expected: Default sort berdasarkan waktu pembuatan: terLAMA di atas hingga terBARU di bawah (oldest first, beda dari Guru yang Aktif A-Z)

TEST-ID: AGT-3.5
scenario: Ketik Nama / Nomor Kartu / Staff / Instansi di search box
expected: List menampilkan staff sesuai keyword (4 kriteria search)

TEST-ID: AGT-3.6
scenario: Search dengan keyword yang tidak match
expected: Sistem menampilkan halaman kosong (empty state)

TEST-ID: AGT-3.7
scenario: Aktifkan Filter Instansi
expected: List filter, hanya menampilkan staff dari instansi terpilih

TEST-ID: AGT-3.8
scenario: Aktifkan Filter Jenis
expected: List filter, hanya menampilkan staff dengan jenis terpilih

TEST-ID: AGT-3.9
scenario: Aktifkan Filter Status (Semua / Aktif / Tidak Aktif)
expected: List filter sesuai status yang dipilih

TEST-ID: AGT-3.10
scenario: Filter aktif tidak ada hasil match
expected: Sistem menampilkan halaman kosong

TEST-ID: AGT-3.11
scenario: Klik Aksi di list saat checklist beberapa staff
expected: Sistem menampilkan submenu: Ubah Jenis Staff, Ubah Status, Pindah Instansi, Download Kartu, Download Surat (5 bulk actions)

TEST-ID: AGT-3.12
scenario: Klik Excel untuk Export tanpa filter/checklist
expected: Sistem download excel 16 kolom: ID, No Kartu, No Induk, Kode QR, Nama Lengkap, Tempat Lahir, Tanggal Lahir, Jenis Kelamin, Alamat, No Telepon, Instansi, Keterangan, Tanggal Mulai Tugas, Pangkat/Golongan, Jabatan, Status

TEST-ID: AGT-3.13
scenario: Aktifkan filter → klik Excel
expected: Sistem hanya export data yang sesuai filter yang aktif

TEST-ID: AGT-3.14
scenario: Search data → klik Excel
expected: Sistem hanya export data hasil pencarian

TEST-ID: AGT-3.15
scenario: Checklist beberapa staff → klik Excel
expected: Sistem hanya export data yang di-checklist

TEST-ID: AGT-3.16
scenario: Klik Aksi → Lihat di row staff
expected: Halaman Detail Staff terbuka, default page = Data Diri, dengan 4 tabs: Data Diri, Kartu, Tagihan, Dokumen (Staff TIDAK punya tab Perizinan)

TEST-ID: AGT-3.17
scenario: Cek section Profil Staff di halaman detail
expected: Menampilkan: Foto (optional editable), Nama (disable), Jenis Staff (disable), Instansi (disable), Tagihan (disable), Transaksi (disable)

TEST-ID: AGT-3.18
scenario: Cek field required di Data Diri Staff
expected: 6 required: Instansi, Nama Lengkap, Jenis Kelamin, No HP, No Induk, Jenis Staff. Email OPSIONAL (beda dari Guru yang Email required)

TEST-ID: AGT-3.19
scenario: Isi semua 6 required → klik Simpan (Email dikosongin)
expected: Toast success, data ter-update (Email opsional, boleh kosong)

TEST-ID: AGT-3.20
scenario: Kosongkan salah satu required (Instansi/Nama/Jenis Kelamin/No HP/No Induk/Jenis Staff) → Simpan
expected: Error muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-3.21
scenario: Upload Foto Staff > 512KB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak foto dengan error format tidak sesuai

TEST-ID: AGT-3.22
scenario: Isi No HP tidak dimulai 08 atau 62
expected: Sistem tolak dengan error format No HP tidak valid

TEST-ID: AGT-3.23
scenario: Isi No Induk yang sudah ada di staff lain PADA INSTANSI YANG SAMA
expected: Sistem tolak dengan error No Induk sudah digunakan (unik per-instansi)

TEST-ID: AGT-3.24
scenario: Isi NIK bukan 16 digit angka
expected: Sistem tolak dengan error NIK harus 16 digit angka

TEST-ID: AGT-3.25
scenario: Isi NIK yang sudah ada di staff lain (duplikat)
expected: Sistem tolak dengan error NIK sudah digunakan (bersifat unik)

TEST-ID: AGT-3.26
scenario: Ubah field Status Aktif ↔ Tidak Aktif → Simpan
expected: Toast success, status staff ter-update

TEST-ID: AGT-3.27
scenario: Klik tombol 'Print Data Staff'
expected: Sistem generate PDF berisi Data Diri lengkap staff

TEST-ID: AGT-3.28
scenario: Klik tab Kartu di halaman detail staff
expected: Sistem menampilkan: Profil Staff + Informasi Kartu (Design Kartu Digital + 7 fields) + User + Wallet + Riwayat Transaksi + icon Cetak Kartu + icon Detail Kartu

TEST-ID: AGT-3.29
scenario: Cek Informasi Kartu — Design Kartu Digital
expected: Section menampilkan preview Design Kartu Digital (unique feature di Staff, tidak ada di Guru)

TEST-ID: AGT-3.30
scenario: Cek field editable vs disable di Informasi Kartu
expected: IUD Kartu editable (icon Simpan), RFID editable (icon Simpan). Disable: Nomor Kartu, QR Kartu, Status, Terakhir Ganti PIN

TEST-ID: AGT-3.31
scenario: Cek edge case: Kartu tidak tertaut dengan akun user
expected: Kolom User kosong dan tombol Reset tidak ditampilkan (guard clause untuk kartu unlinked)

TEST-ID: AGT-3.32
scenario: Edit IUD Kartu → klik icon Simpan
expected: Toast success, IUD ter-update

TEST-ID: AGT-3.33
scenario: Edit RFID → klik icon Simpan
expected: Toast success, RFID ter-update

TEST-ID: AGT-3.34
scenario: Cek Riwayat Transaksi
expected: List menampilkan: Tanggal, RFID, Tipe Transaksi, Wallet, Jumlah, Status

TEST-ID: AGT-3.35
scenario: Filter Riwayat Transaksi berdasarkan tanggal + klik Export
expected: Export excel hanya berisi data sesuai filter yang aktif

TEST-ID: AGT-3.36
scenario: Klik icon Cetak Kartu
expected: Sistem generate kartu fisik untuk cetak

TEST-ID: AGT-3.37
scenario: Klik Blokir Kartu di Detail Kartu → popup blokir confirmation → klik Blokir
expected: Sistem blokir kartu

TEST-ID: AGT-3.38
scenario: Klik Reset PIN di Detail Kartu → popup reset PIN confirmation → klik Reset PIN
expected: Sistem reset PIN kartu

TEST-ID: AGT-3.39
scenario: Klik Laporkan Kartu Hilang → isi alasan → klik Proses
expected: Sistem process laporan kartu hilang

TEST-ID: AGT-3.40
scenario: Klik btn Reset di kolom User → popup Reset confirmation → klik 'Reset Pengguna'
expected: Sistem melepaskan kartu dari pengguna aplikasi Cards Parents, Cards Edu, Operational, dan Partner (menu Kartu di aplikasi tersebut tidak lagi tertaut dengan akun user)

TEST-ID: AGT-3.41
scenario: Klik btn Reset di kolom User → popup Reset confirmation → klik 'Batal'
expected: Sistem tidak melakukan reset, kembali ke halaman kartu

TEST-ID: AGT-3.42
scenario: Klik tab Tagihan di halaman detail staff
expected: Sistem menampilkan list tagihan staff dengan info: Status, Catatan, Nama Tagihan, Jumlah Tagihan, Terbayar, Sisa Tagihan, Tanggal Dibuat

TEST-ID: AGT-3.43
scenario: Buka tab Tagihan saat staff belum ada tagihan
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-3.44
scenario: Search tagihan by nama tagihan
expected: List filter menampilkan tagihan yang match dengan keyword nama

TEST-ID: AGT-3.45
scenario: Klik tab Dokumen di halaman detail staff
expected: Sistem menampilkan list dokumen dengan 6 kolom: Nama, Nomor, Dibuat Pada, Terakhir Diubah, Dokumen, Aksi (Edit & Hapus) + btn Tambah Dokumen

TEST-ID: AGT-3.46
scenario: Buka tab Dokumen saat belum ada dokumen
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-3.47
scenario: Search dokumen by Nama atau Nomor
expected: List menampilkan dokumen yang match dengan keyword

TEST-ID: AGT-3.48
scenario: Klik btn 'Tambah Dokumen'
expected: Form Tambah terbuka: Nama (required), Nomor (opsional), Dokumen upload (required)

TEST-ID: AGT-3.49
scenario: Isi form Tambah valid + upload dokumen valid → klik Simpan
expected: Toast success, dokumen ter-add ke list

TEST-ID: AGT-3.50
scenario: Kosongkan Nama Dokumen → klik Simpan
expected: Error muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-3.51
scenario: Upload dokumen tipe tidak diizinkan (bukan PDF/png/jpg/jpeg)
expected: Sistem tolak dengan error format file (hanya PDF & Gambar png/jpg/jpeg)

TEST-ID: AGT-3.52
scenario: Klik Batal di form Tambah Dokumen
expected: Form tertutup, sistem kembali ke halaman dokumen

TEST-ID: AGT-3.53
scenario: Klik Aksi → Edit di row dokumen
expected: Form Edit terbuka: Nama (prefilled), Nomor (prefilled), Checkbox 'Ubah Dokumen' (default OFF)

TEST-ID: AGT-3.54
scenario: Checklist 'Ubah Dokumen' di form Edit
expected: Field upload Dokumen muncul (required saat checkbox aktif)

TEST-ID: AGT-3.55
scenario: Edit tanpa checklist Ubah Dokumen → ubah Nama → Simpan
expected: Toast success, Nama ter-update, file lama tetap

TEST-ID: AGT-3.56
scenario: Klik Aksi → Hapus → popup confirmation → klik Hapus / Batal
expected: Klik Hapus: dokumen terhapus dengan toast success. Klik Batal: dokumen tetap ada, sistem kembali ke halaman dokumen

TEST-ID: AGT-3.57
scenario: Checklist beberapa staff → Aksi → Ubah Status → pilih Aktif/Tidak Aktif → Simpan
expected: Toast success, status semua staff yang di-checklist berubah

TEST-ID: AGT-3.58
scenario: Ubah Status: klik Simpan tanpa isi Status
expected: Sistem menampilkan pesan error

TEST-ID: AGT-3.59
scenario: Checklist beberapa staff → Aksi → Ubah Jenis Staff → cek form
expected: Form terbuka: Instansi (DISABLE, otomatis muncul sesuai data staff) + Jenis Staff (required). Jenis Staff dropdown hanya menampilkan jenis staff yang ada pada instansi

TEST-ID: AGT-3.60
scenario: Ubah Jenis Staff: pilih Jenis valid → Simpan
expected: Toast success, jenis semua staff yang di-checklist berubah

TEST-ID: AGT-3.61
scenario: Checklist beberapa staff → Aksi → Pindah Instansi → cek form
expected: Form terbuka: Instansi (required) + Jenis Staff (required). Jenis Staff dropdown menampilkan jenis staff yang tersedia pada Instansi yang dipilih (dynamic dropdown)

TEST-ID: AGT-3.62
scenario: Pindah Instansi: ganti Instansi → cek dropdown Jenis Staff
expected: Dropdown Jenis Staff otomatis update dengan jenis dari instansi baru

TEST-ID: AGT-3.63
scenario: Pindah Instansi: isi Instansi + Jenis Staff → Simpan
expected: Toast success, staff berhasil dipindah instansi

TEST-ID: AGT-3.64
scenario: Pindah Instansi: klik Simpan tanpa isi field required
expected: Sistem menampilkan pesan error

TEST-ID: AGT-3.65
scenario: Checklist 1 staff → Aksi → Download Kartu → popup konfirmasi → klik Download
expected: Sistem download 1 file PDF berisi kartu staff tersebut

TEST-ID: AGT-3.66
scenario: Checklist > 1 staff → Aksi → Download Kartu → popup konfirmasi → klik Download
expected: Sistem generate file ZIP berisi PDF kartu per staff terpisah (BEDA dari Guru yang combined 1 PDF)

TEST-ID: AGT-3.67
scenario: Download Kartu: popup konfirmasi → klik Batal
expected: Popup tertutup, sistem tidak download kartu, kembali ke halaman staff

TEST-ID: AGT-3.68
scenario: Checklist 1 staff → Aksi → Download Surat → popup konfirmasi → klik Download
expected: Sistem download 1 file PDF berisi surat staff tersebut

TEST-ID: AGT-3.69
scenario: Checklist > 1 staff → Aksi → Download Surat → popup konfirmasi → klik Download
expected: Sistem generate file ZIP berisi PDF surat per staff terpisah

TEST-ID: AGT-3.70
scenario: Download Surat: popup konfirmasi → klik Batal
expected: Popup tertutup, sistem tidak download surat, kembali ke halaman staff

TEST-ID: AGT-3.71
scenario: Klik btn 'Tambah Staff' di halaman list
expected: Form Tambah Staff terbuka dengan 17 field

TEST-ID: AGT-3.72
scenario: Isi semua 6 required (Instansi, Nama Lengkap, Jenis Kelamin, No HP, No Induk, Jenis Staff) → klik Simpan
expected: Toast success, staff baru ter-add ke list dengan status default Aktif

TEST-ID: AGT-3.73
scenario: Kosongkan salah satu required → klik Simpan
expected: Error muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-3.74
scenario: Upload Foto Staff > 512KB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak foto dengan error format tidak sesuai

TEST-ID: AGT-3.75
scenario: Isi No HP tidak dimulai 08 atau 62
expected: Sistem tolak dengan error format No HP

TEST-ID: AGT-3.76
scenario: Isi No Induk yang sudah ada di staff lain PADA INSTANSI YANG SAMA
expected: Sistem tolak dengan error No Induk sudah digunakan (unik per-instansi)

TEST-ID: AGT-3.77
scenario: Isi NIK bukan 16 digit angka atau duplikat
expected: Sistem tolak dengan error (16 digit + unik)

TEST-ID: AGT-3.78
scenario: Isi No Kartu bukan 16 digit angka
expected: Sistem tolak dengan error Nomor Kartu harus 16 digit

TEST-ID: AGT-3.79
scenario: Isi No Kartu 16 digit TAPI tidak sesuai membership partner
expected: Sistem cek nomor kartu, tolak dengan pesan error (Nomor kartu tidak sesuai membership partner)

TEST-ID: AGT-3.80
scenario: Klik Batal di form Tambah Staff
expected: Form tertutup, sistem kembali ke halaman staff, data tidak tersimpan
