TEST-ID: AGT-4.1
scenario: Load halaman Alumni Guru
expected: Sistem menampilkan info Total Alumni + List Alumni Guru dengan 6 kolom: Nama, Nomor Kartu, Jenis, Instansi, Tanggal Pindah, Aksi (Detail Alumni Guru)

TEST-ID: AGT-4.2
scenario: Buka halaman Alumni Guru saat belum ada data
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: AGT-4.3
scenario: Cek default sort list Alumni Guru
expected: Alumni Guru Aktif ditampilkan terlebih dahulu (Nama A-Z), diikuti Alumni Guru Tidak Aktif (juga A-Z)

TEST-ID: AGT-4.4
scenario: Ketik Nama / Nomor Kartu / Jenis / Instansi di search box
expected: List menampilkan alumni guru sesuai keyword (4 kriteria search)

TEST-ID: AGT-4.5
scenario: Search dengan keyword yang tidak match
expected: Sistem menampilkan halaman kosong (empty state)

TEST-ID: AGT-4.6
scenario: Aktifkan Filter Instansi / Jenis / Status
expected: List filter sesuai kriteria yang dipilih (Filter Instansi, Jenis, Status)

TEST-ID: AGT-4.7
scenario: Filter aktif tidak ada hasil match
expected: Sistem menampilkan halaman kosong

TEST-ID: AGT-4.8
scenario: Cek kolom Tanggal Pindah di setiap row
expected: Menampilkan tanggal saat alumni guru dipindahkan dari Menu Guru ke Menu Alumni Guru

TEST-ID: AGT-4.9
scenario: Klik Excel untuk Export tanpa filter/checklist
expected: Sistem download excel 16 kolom: ID, No Kartu, No Induk, Kode QR, Nama Lengkap, Tempat/Tanggal Lahir, Jenis Kelamin, Alamat, No Telepon, Instansi, Keterangan, Tanggal Mulai Tugas, Pangkat/Golongan, Jabatan, Status

TEST-ID: AGT-4.10
scenario: Aktifkan filter → klik Excel
expected: Sistem hanya export data yang sesuai filter yang aktif

TEST-ID: AGT-4.11
scenario: Search data → klik Excel
expected: Sistem hanya export data hasil pencarian

TEST-ID: AGT-4.12
scenario: Checklist beberapa alumni guru → klik Excel
expected: Sistem hanya export data yang di-checklist

TEST-ID: AGT-4.13
scenario: Klik Aksi → Lihat di row alumni guru
expected: Halaman Detail terbuka, default page = Data Diri, dengan 4 tabs: Data Diri, Kartu, Tagihan, Dokumen (Alumni Guru TIDAK punya tab Perizinan)

TEST-ID: AGT-4.14
scenario: Cek section Profil Alumni Guru
expected: Menampilkan: Foto (editable), Nama (readonly), Jenis Guru (readonly), Instansi (readonly), Tagihan (readonly), Transaksi (readonly)

TEST-ID: AGT-4.15
scenario: Isi semua 7 required (Instansi, Nama Lengkap, Jenis Kelamin, Email, No HP, No Induk, Jenis Guru) → klik Simpan
expected: Toast success 'Alumni Guru Berhasil Diubah', data ter-update

TEST-ID: AGT-4.16
scenario: Kosongkan salah satu required → klik Simpan
expected: Error muncul di field yang kosong, tombol Simpan tidak bekerja

TEST-ID: AGT-4.17
scenario: Isi Email dengan format tidak valid
expected: Error 'Format email tidak valid' muncul, perubahan tidak disimpan

TEST-ID: AGT-4.18
scenario: Upload Foto > 512KB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak dengan error format tidak sesuai

TEST-ID: AGT-4.19
scenario: Isi No HP tidak dimulai 08 atau 62
expected: Error 'Format No HP tidak valid' muncul

TEST-ID: AGT-4.20
scenario: Isi No Induk yang sudah ada PADA INSTANSI YANG SAMA
expected: Error 'No Induk sudah digunakan' muncul (unik per-instansi)

TEST-ID: AGT-4.21
scenario: Isi NIK bukan 16 digit atau duplikat
expected: Sistem tolak dengan error (16 digit + unik)

TEST-ID: AGT-4.22
scenario: Isi NUPTK bukan 16 digit angka
expected: Error 'NUPTK harus 16 digit angka' muncul

TEST-ID: AGT-4.23
scenario: Ubah Status Aktif ↔ Tidak Aktif → Simpan
expected: Toast success, status alumni guru ter-update

TEST-ID: AGT-4.24
scenario: Klik tombol 'Print Data Alumni Guru'
expected: Sistem generate PDF berisi Data Diri lengkap alumni guru

TEST-ID: AGT-4.25
scenario: Klik tab Kartu di halaman detail alumni guru
expected: Sistem menampilkan section Profil + Informasi Kartu + User + Wallet + Riwayat Transaksi + Cetak Kartu + Detail Kartu Actions

TEST-ID: AGT-4.26
scenario: Cek field editable vs readonly di Informasi Kartu
expected: UID editable + RFID editable (icon Simpan). Readonly: Nomor Kartu, QR, Status, Info Terakhir Ganti PIN

TEST-ID: AGT-4.27
scenario: Edit UID → klik Simpan
expected: Toast success, UID ter-update

TEST-ID: AGT-4.28
scenario: Edit RFID → klik Simpan
expected: Toast success, RFID ter-update

TEST-ID: AGT-4.29
scenario: Cek Riwayat Transaksi
expected: List menampilkan: tanggal, RFID, tipe, wallet, jumlah, status

TEST-ID: AGT-4.30
scenario: Filter Riwayat Transaksi berdasarkan tanggal + Export
expected: Export excel sesuai filter yang aktif

TEST-ID: AGT-4.31
scenario: Klik Cetak Kartu
expected: Sistem generate kartu fisik

TEST-ID: AGT-4.32
scenario: Klik Blokir Kartu / Reset PIN / Laporkan Kartu Hilang
expected: Masing-masing menampilkan popup/form konfirmasi sesuai action

TEST-ID: AGT-4.33
scenario: Klik Reset di kolom User → popup Reset confirmation → klik 'Reset Pengguna'
expected: Sistem melepaskan kartu dari pengguna aplikasi Cards Parents, Cards Edu, Operational, dan Partner

TEST-ID: AGT-4.34
scenario: Klik Reset di kolom User → popup Reset confirmation → klik 'Batal'
expected: Sistem tidak melakukan reset

TEST-ID: AGT-4.35
scenario: Klik tab Tagihan di halaman detail alumni guru
expected: Sistem menampilkan list tagihan dengan info: Status, Catatan, Nama Tagihan, Jumlah, Terbayar, Sisa, Tanggal Dibuat

TEST-ID: AGT-4.36
scenario: Buka tab Tagihan saat belum ada tagihan
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-4.37
scenario: Search tagihan by nama
expected: List filter sesuai keyword

TEST-ID: AGT-4.38
scenario: Klik tab Dokumen di halaman detail alumni guru
expected: Sistem menampilkan list dokumen 6 kolom: Nama, Nomor, Dibuat Pada, Terakhir Diubah, Dokumen, Aksi (Edit & Hapus)

TEST-ID: AGT-4.39
scenario: Buka tab Dokumen saat belum ada dokumen
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-4.40
scenario: Search dokumen by Nama atau Nomor
expected: List menampilkan dokumen yang match dengan keyword

TEST-ID: AGT-4.41
scenario: Klik Tambah Dokumen → isi form valid → Simpan
expected: Toast success, dokumen ter-add ke list (Nama required, Nomor opsional, Dokumen required)

TEST-ID: AGT-4.42
scenario: Kosongkan Nama Dokumen di Tambah → klik Simpan
expected: Error muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-4.43
scenario: Upload dokumen tipe tidak diizinkan (bukan PDF/png/jpg/jpeg)
expected: Sistem tolak dengan error format file

TEST-ID: AGT-4.44
scenario: Klik Batal di form Tambah Dokumen
expected: Form tertutup, data tidak tersimpan

TEST-ID: AGT-4.45
scenario: Klik Aksi → Edit di row dokumen
expected: Form Edit terbuka dengan checkbox 'Ubah Dokumen?' (default OFF)

TEST-ID: AGT-4.46
scenario: Checklist 'Ubah Dokumen?' → field upload muncul
expected: Field upload Dokumen muncul (required saat checkbox aktif)

TEST-ID: AGT-4.47
scenario: Edit tanpa checklist Ubah Dokumen → ubah Nama → Simpan
expected: Toast success, Nama ter-update, file lama tetap

TEST-ID: AGT-4.48
scenario: Klik Aksi → Hapus → popup confirmation → klik Hapus / Batal
expected: Klik Hapus: toast success + dokumen hilang. Klik Batal: dokumen tetap

TEST-ID: AGT-4.49
scenario: Checklist beberapa alumni guru → klik Aksi → cek menu yang muncul
expected: Sistem menampilkan submenu: Ubah Jenis Guru, Aktifkan Kembali (Menu Guru / Menu Alumni Siswa / Menu Staff), Download Kartu, Download Surat

TEST-ID: AGT-4.50
scenario: Checklist beberapa alumni guru → Aksi → Ubah Jenis Guru → cek form
expected: Form terbuka: Instansi (DISABLE, sesuai data alumni) + Jenis Guru (required)

TEST-ID: AGT-4.51
scenario: Ubah Jenis Guru: pilih Jenis valid → Simpan
expected: Toast success, jenis alumni guru yang di-checklist berubah

TEST-ID: AGT-4.52
scenario: Ubah Jenis Guru: klik Simpan tanpa isi field
expected: Sistem menampilkan pesan error

TEST-ID: AGT-4.53
scenario: Checklist alumni guru → Aksi → 'Aktifkan Kembali' → 'Menu Guru' → popup confirmation → klik Simpan
expected: Data alumni guru pindah kembali ke Menu Guru (hilang dari Alumni Guru, muncul di Guru dengan status yang di-set)

TEST-ID: AGT-4.54
scenario: Checklist alumni guru → Aksi → 'Aktifkan Kembali' → 'Menu Alumni Siswa' → popup confirmation → klik Simpan
expected: Data alumni guru pindah ke Menu Alumni Siswa (untuk case guru yang sebelumnya juga siswa/alumni siswa)

TEST-ID: AGT-4.55
scenario: Checklist alumni guru → Aksi → 'Aktifkan Kembali' → 'Menu Staff' → popup confirmation → klik Simpan
expected: Data alumni guru pindah ke Menu Staff (dijadikan staff)

TEST-ID: AGT-4.56
scenario: Aktifkan Kembali (semua 3 opsi): klik Batal di popup confirmation
expected: Popup tertutup, alumni guru TIDAK dipindah, tetap di Alumni Guru

TEST-ID: AGT-4.57
scenario: Checklist 1 alumni guru → Aksi → Download Kartu
expected: Sistem download 1 file PDF berisi 1 kartu alumni guru

TEST-ID: AGT-4.58
scenario: Checklist > 1 alumni guru → Aksi → Download Kartu
expected: Sistem download 1 file PDF berisi SEMUA kartu (combined PDF, sama pattern kayak Guru)

TEST-ID: AGT-4.59
scenario: Checklist 1 alumni guru → Aksi → Download Surat
expected: Sistem download 1 file PDF berisi surat

TEST-ID: AGT-4.60
scenario: Checklist > 1 alumni guru → Aksi → Download Surat
expected: Sistem download file ZIP berisi PDF surat per alumni guru terpisah

TEST-ID: AGT-4.61
scenario: Klik btn 'Import Alumni Guru' di halaman list
expected: Form Import terbuka dengan field: Instansi, Jenis Guru, Data Excel + Download Template

TEST-ID: AGT-4.62
scenario: Klik Download Template
expected: Sistem download template excel untuk import alumni guru

TEST-ID: AGT-4.63
scenario: Upload file bukan excel
expected: Sistem tolak file, hanya format excel yang diterima

TEST-ID: AGT-4.64
scenario: Isi semua required + upload data excel valid → klik Simpan
expected: Toast success, data alumni guru ter-import

TEST-ID: AGT-4.65
scenario: Kosongkan salah satu required → klik Simpan
expected: Error muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-4.66
scenario: Klik Batal di form Import
expected: Form tertutup, sistem kembali ke halaman alumni guru

TEST-ID: AGT-4.67
scenario: Klik btn 'Tambah Alumni Guru' di halaman list
expected: Form Tambah terbuka dengan 17 field (sama seperti Tambah Guru)

TEST-ID: AGT-4.68
scenario: Isi semua 7 required + upload foto valid → klik Simpan
expected: Setelah simpan sukses, sistem otomatis redirect ke halaman detail alumni guru yang baru dibuat

TEST-ID: AGT-4.69
scenario: Kosongkan salah satu required → klik Simpan
expected: Error muncul di field yang kosong, tombol Simpan tidak bekerja

TEST-ID: AGT-4.70
scenario: Upload Foto > 512KB atau tipe tidak diizinkan
expected: Sistem tolak foto dengan error format tidak sesuai

TEST-ID: AGT-4.71
scenario: Isi No HP tidak dimulai 08 atau 62
expected: Sistem tolak dengan error format No HP

TEST-ID: AGT-4.72
scenario: Isi No Induk yang sudah ada di alumni/guru/staff PADA INSTANSI YANG SAMA
expected: Sistem tolak dengan error No Induk sudah digunakan (unik per-instansi)

TEST-ID: AGT-4.73
scenario: Isi No Kartu bukan 16 digit atau tidak sesuai membership partner
expected: Sistem tolak dengan error nomor kartu tidak valid

TEST-ID: AGT-4.74
scenario: Klik Batal di form Tambah Alumni Guru
expected: Form tertutup, sistem kembali ke halaman alumni guru, data tidak tersimpan
