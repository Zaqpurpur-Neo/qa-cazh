TEST-ID: AGT-5.1
scenario: Load halaman Alumni Siswa
expected: Sistem menampilkan info Total Alumni + List dengan 11 kolom: Nama, Nomor Kartu, Kelas Terakhir, Tahun Ajaran Terakhir, Semester Terakhir, Instansi, Tag, Status, Tanggal Pindah, Terakhir Diubah, Aksi (Detail)

TEST-ID: AGT-5.2
scenario: Buka halaman Alumni Siswa saat belum ada data
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: AGT-5.3
scenario: Cek default sort list Alumni Siswa
expected: Alumni Siswa Aktif ditampilkan dulu (Nama A-Z), diikuti Tidak Aktif (juga A-Z)

TEST-ID: AGT-5.4
scenario: Ketik Nama / Nomor Kartu / Kelas / Tahun Ajaran / Semester / Instansi / Tag di search box
expected: List menampilkan alumni siswa sesuai keyword (7 kriteria search)

TEST-ID: AGT-5.5
scenario: Search dengan keyword yang tidak match
expected: Sistem menampilkan halaman kosong (empty state)

TEST-ID: AGT-5.6
scenario: Aktifkan Filter Instansi / Tahun Ajaran / Semester / Jurusan / Tingkat / Kelas / Status Pengkinian Data
expected: List filter sesuai kriteria yang dipilih (7 filter kriteria)

TEST-ID: AGT-5.7
scenario: Filter aktif tidak ada hasil match
expected: Sistem menampilkan halaman kosong

TEST-ID: AGT-5.8
scenario: Cek kolom Tanggal Pindah + Status di setiap row
expected: Tanggal Pindah menampilkan tanggal saat alumni dipindahkan dari Menu Siswa. Status menampilkan Aktif/Tidak Aktif (kedua kolom coexist, beda dari Alumni Guru yang cuma Tanggal Pindah)

TEST-ID: AGT-5.9
scenario: Cek default pagination page size
expected: Default 10, opsi tersedia: 10, 50, 100, 500, 1000, 2000 (sama dengan Siswa)

TEST-ID: AGT-5.10
scenario: Klik Excel untuk Export tanpa filter/checklist
expected: Sistem download excel berisi data alumni siswa lengkap

TEST-ID: AGT-5.11
scenario: Aktifkan filter → klik Excel
expected: Sistem hanya export data yang sesuai filter yang aktif

TEST-ID: AGT-5.12
scenario: Search data → klik Excel
expected: Sistem hanya export data hasil pencarian

TEST-ID: AGT-5.13
scenario: Checklist beberapa alumni siswa → klik Excel
expected: Sistem hanya export data yang di-checklist

TEST-ID: AGT-5.14
scenario: Klik btn 'Reset Filter'
expected: Sistem menampilkan data alumni siswa secara keseluruhan (filter dibersihkan)

TEST-ID: AGT-5.15
scenario: Klik Aksi → Detail di row alumni siswa
expected: Halaman Detail terbuka, default page = Data Diri, dengan 5 tabs: Data Diri, Data Orang Tua, Kartu, Tagihan, Dokumen (Alumni Siswa TIDAK punya tab Perizinan)

TEST-ID: AGT-5.16
scenario: Cek section Profil Alumni Siswa
expected: Menampilkan: Foto (editable), Nama (readonly), Kelas Terakhir/Tahun Ajaran/Semester/Instansi (readonly), Total Tagihan, Total Transaksi

TEST-ID: AGT-5.17
scenario: Cek section-section di tab Data Diri
expected: Tampil 4 section: Data Diri (28 field), Informasi Tambahan (13 field), Diterima Pada (4 field), Alumni Siswa (5 field: Perguruan Tinggi, Jurusan, Tahun Awal, Tahun Akhir, Prestasi)

TEST-ID: AGT-5.18
scenario: Isi 5 field pendidikan lanjutan (Perguruan Tinggi, Jurusan, Tahun Awal, Tahun Akhir, Prestasi) → klik Simpan
expected: Toast success, data pendidikan selanjutnya alumni tersimpan (section Alumni Siswa)

TEST-ID: AGT-5.19
scenario: Kosongkan salah satu required Data Diri (Instansi/Nama/Jenis Kelamin/Email/No HP/No Induk/Tahun Ajaran/Semester/Tingkat/Kelas) → klik Simpan
expected: Error muncul di field yang kosong, tombol Simpan tidak bekerja

TEST-ID: AGT-5.20
scenario: Isi Email dengan format tidak valid
expected: Error 'Format email tidak valid' muncul, perubahan tidak disimpan

TEST-ID: AGT-5.21
scenario: Upload Foto > 512KB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak dengan error format tidak sesuai

TEST-ID: AGT-5.22
scenario: Isi No HP tidak dimulai 08 atau 62
expected: Error 'Format No HP tidak valid' muncul

TEST-ID: AGT-5.23
scenario: Isi No Induk yang sudah ada PADA INSTANSI YANG SAMA
expected: Error 'No Induk sudah digunakan' muncul (unik per-instansi)

TEST-ID: AGT-5.24
scenario: Isi NISN yang sudah ada di alumni/siswa lain
expected: Error 'NISN sudah digunakan' muncul (unik global)

TEST-ID: AGT-5.25
scenario: Isi NIK bukan 16 digit atau duplikat
expected: Sistem tolak dengan error (16 digit + unik)

TEST-ID: AGT-5.26
scenario: Buka dropdown Tahun Ajaran di Edit
expected: Dropdown hanya menampilkan tahun ajaran yang berstatus Aktif

TEST-ID: AGT-5.27
scenario: Ubah Status Aktif ↔ Tidak Aktif → Simpan
expected: Toast success, status alumni siswa ter-update

TEST-ID: AGT-5.28
scenario: Ubah Instansi/Nama/No HP/Email/Alamat/Tanggal Lahir → Simpan → cek data pelanggan di CPA dan CazhPOS
expected: Data pelanggan di CPA dan CazhPOS ikut ter-update (sync cross-product, sama pattern Siswa)

TEST-ID: AGT-5.29
scenario: Klik tombol 'Print Data Alumni Siswa'
expected: Sistem generate PDF berisi Data Diri lengkap (28+13+4+5 fields) + Data Orang Tua (20 fields) + Penghasilan

TEST-ID: AGT-5.30
scenario: Klik tab Data Orang Tua di halaman detail alumni siswa
expected: Sistem menampilkan 20 field Data Orang Tua (Ayah 10 + Ibu 10) + section Informasi (Penghasilan Orang Tua)

TEST-ID: AGT-5.31
scenario: Klik Simpan tanpa isi field apapun di tab Data Orang Tua
expected: Data berhasil disimpan (semua field opsional, tidak ada required)

TEST-ID: AGT-5.32
scenario: Isi beberapa field Ayah + Ibu → Simpan
expected: Toast success, data orang tua ter-update

TEST-ID: AGT-5.33
scenario: Isi Penghasilan Orang Tua → Simpan
expected: Toast success, penghasilan ter-update

TEST-ID: AGT-5.34
scenario: Klik tab Kartu di halaman detail alumni siswa
expected: Sistem menampilkan section Profil + Informasi Kartu (UID/RFID editable, sisanya readonly) + User + Wallet + Riwayat Transaksi + Cetak Kartu + Detail Kartu Actions

TEST-ID: AGT-5.35
scenario: Edit UID Kartu → klik Simpan
expected: Toast success, UID ter-update

TEST-ID: AGT-5.36
scenario: Edit RFID → klik Simpan
expected: Toast success, RFID ter-update

TEST-ID: AGT-5.37
scenario: Cek Riwayat Transaksi
expected: List menampilkan: tanggal, RFID, tipe, wallet, jumlah, status

TEST-ID: AGT-5.38
scenario: Filter Riwayat Transaksi berdasarkan tanggal + Export
expected: Export excel sesuai filter yang aktif

TEST-ID: AGT-5.39
scenario: Klik Cetak Kartu
expected: Sistem generate kartu fisik untuk cetak

TEST-ID: AGT-5.40
scenario: Klik Blokir Kartu / Reset PIN / Laporkan Kartu Hilang
expected: Masing-masing menampilkan popup/form konfirmasi sesuai action

TEST-ID: AGT-5.41
scenario: Klik Reset di kolom User → popup Reset confirmation → klik 'Reset Pengguna'
expected: Sistem melepaskan kartu dari pengguna aplikasi Cards Parents, Cards Edu, Operational, dan Partner

TEST-ID: AGT-5.42
scenario: Klik Reset di kolom User → popup Reset confirmation → klik 'Batal'
expected: Sistem tidak melakukan reset

TEST-ID: AGT-5.43
scenario: Klik tab Tagihan di halaman detail alumni siswa
expected: Sistem menampilkan list tagihan dengan info: Status, Catatan, Nama Tagihan, Jumlah, Terbayar, Sisa, Tanggal Dibuat

TEST-ID: AGT-5.44
scenario: Buka tab Tagihan saat belum ada tagihan
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-5.45
scenario: Search tagihan by nama
expected: List filter sesuai keyword

TEST-ID: AGT-5.46
scenario: Klik tab Dokumen di halaman detail alumni siswa
expected: Sistem menampilkan list dokumen 6 kolom + Search + btn Tambah Dokumen

TEST-ID: AGT-5.47
scenario: Buka tab Dokumen saat belum ada dokumen
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-5.48
scenario: Search dokumen by Nama atau Nomor
expected: List menampilkan dokumen yang match dengan keyword

TEST-ID: AGT-5.49
scenario: Cross-feature: Alumni siswa yang statusnya 'Daftar Ulang' setelah SPMB → cek tab Dokumen
expected: Dokumen yang diupload saat SPMB masuk otomatis ke tab Dokumen

TEST-ID: AGT-5.50
scenario: Klik Tambah Dokumen → isi form (Nama req, Nomor opsional, Dokumen req) valid → Simpan
expected: Toast success, dokumen ter-add ke list

TEST-ID: AGT-5.51
scenario: Isi Nama Dokumen > 40 karakter → Simpan
expected: Sistem tolak (max 40 karakter untuk nama dokumen, business rule khusus Alumni Siswa)

TEST-ID: AGT-5.52
scenario: Tambah dokumen dengan Nama yang SAMA di Instansi + Tahun Ajaran yang sama (duplikat) → Simpan
expected: Sistem menampilkan pesan error, dokumen tidak tersimpan (uniqueness per Instansi + Tahun Ajaran, business rule Alumni Siswa)

TEST-ID: AGT-5.53
scenario: Kosongkan Nama Dokumen → klik Simpan
expected: Error muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-5.54
scenario: Upload dokumen tipe tidak diizinkan (bukan PDF/png/jpg/jpeg)
expected: Sistem tolak dengan error format file

TEST-ID: AGT-5.55
scenario: Klik Batal di form Tambah Dokumen
expected: Form tertutup, data tidak tersimpan

TEST-ID: AGT-5.56
scenario: Klik Aksi → Edit di row dokumen
expected: Form Edit terbuka dengan checkbox 'Ubah Dokumen?' (default OFF)

TEST-ID: AGT-5.57
scenario: Checklist 'Ubah Dokumen?' → field upload muncul
expected: Field upload Dokumen muncul (required saat checkbox aktif)

TEST-ID: AGT-5.58
scenario: Edit tanpa checklist Ubah Dokumen → ubah Nama → Simpan
expected: Toast success, Nama ter-update, file lama tetap

TEST-ID: AGT-5.59
scenario: Klik Aksi → Hapus → popup confirmation → klik Hapus / Batal
expected: Klik Hapus: toast success + dokumen hilang. Klik Batal: dokumen tetap

TEST-ID: AGT-5.60
scenario: Checklist beberapa alumni siswa → klik Aksi → cek menu yang muncul
expected: Sistem menampilkan submenu: Ubah Status, Aktivasi (Siswa / Alumni Guru / Staff), Download Kartu, Download Surat

TEST-ID: AGT-5.61
scenario: Checklist alumni siswa → Aksi → Ubah Status → pilih Aktif/Tidak Aktif → Simpan
expected: Toast success, status alumni siswa yang di-checklist berubah

TEST-ID: AGT-5.62
scenario: Ubah Status: klik Simpan tanpa isi Status
expected: Sistem menampilkan pesan error

TEST-ID: AGT-5.63
scenario: Checklist alumni siswa → Aksi → 'Aktivasi' → 'Siswa' → popup confirmation → klik Simpan
expected: Data alumni siswa pindah kembali ke Menu Siswa (hilang dari Alumni Siswa)

TEST-ID: AGT-5.64
scenario: Checklist alumni siswa → Aksi → 'Aktivasi' → 'Alumni Guru' → popup confirmation → klik Simpan
expected: Data alumni siswa pindah ke Menu Alumni Guru (untuk case alumni yang sebelumnya juga jadi guru)

TEST-ID: AGT-5.65
scenario: Checklist alumni siswa → Aksi → 'Aktivasi' → 'Staff' → popup confirmation → klik Simpan
expected: Data alumni siswa pindah ke Menu Staff

TEST-ID: AGT-5.66
scenario: Aktivasi (semua 3 opsi): klik Batal di popup confirmation
expected: Popup tertutup, alumni siswa TIDAK dipindah, tetap di Alumni Siswa

TEST-ID: AGT-5.67
scenario: Checklist 1 alumni siswa → Aksi → Download Kartu → popup konfirmasi → klik Download
expected: Sistem download 1 file PDF berisi kartu alumni siswa

TEST-ID: AGT-5.68
scenario: Checklist > 1 alumni siswa → Aksi → Download Kartu → popup konfirmasi → klik Download
expected: Sistem download file (perhatikan format: PDF combined atau ZIP — check implementasi vs PRD)

TEST-ID: AGT-5.69
scenario: Download Kartu: popup konfirmasi → klik Batal
expected: Popup tertutup, sistem tidak download

TEST-ID: AGT-5.70
scenario: Checklist 1 alumni siswa → Aksi → Download Surat → popup konfirmasi → klik Download
expected: Sistem download 1 file PDF berisi surat alumni siswa

TEST-ID: AGT-5.71
scenario: Checklist > 1 alumni siswa → Aksi → Download Surat → popup konfirmasi → klik Download
expected: Sistem download file ZIP berisi PDF surat per alumni siswa terpisah

TEST-ID: AGT-5.72
scenario: Download Surat: popup konfirmasi → klik Batal
expected: Popup tertutup, sistem tidak download

TEST-ID: AGT-5.73
scenario: Klik btn 'Tambah Alumni Siswa' di halaman list
expected: Form Tambah terbuka dengan 2 section: Data Diri (17 field) + Data Orang Tua (8 field)

TEST-ID: AGT-5.74
scenario: Isi semua 16 required Data Diri (Instansi/Nama/Tempat Lahir/Tgl Lahir/Jenis Kelamin/Alamat/No HP/No Induk/Asal Sekolah/Tahun Ajaran/Jurusan/Semester/Tingkat/Kelas/No Kartu) → Simpan
expected: Toast success, alumni siswa baru ter-add ke list

TEST-ID: AGT-5.75
scenario: Kosongkan salah satu required → klik Simpan
expected: Error muncul di field yang kosong, tombol Simpan tidak bekerja

TEST-ID: AGT-5.76
scenario: Upload Foto > 512KB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak foto dengan error format tidak sesuai

TEST-ID: AGT-5.77
scenario: Isi No HP tidak dimulai 08 atau 62
expected: Sistem tolak dengan error format No HP

TEST-ID: AGT-5.78
scenario: Isi No Induk yang sudah ada PADA INSTANSI YANG SAMA
expected: Sistem tolak dengan error No Induk sudah digunakan (unik per-instansi)

TEST-ID: AGT-5.79
scenario: Isi NIK bukan 16 digit atau duplikat
expected: Sistem tolak dengan error (16 digit + unik)

TEST-ID: AGT-5.80
scenario: Isi No Kartu bukan 16 digit atau tidak sesuai membership partner
expected: Sistem tolak dengan error nomor kartu tidak valid

TEST-ID: AGT-5.81
scenario: Klik Batal di form Tambah Alumni Siswa
expected: Form tertutup, sistem kembali ke halaman alumni siswa, data tidak tersimpan

TEST-ID: AGT-5.82
scenario: Klik btn 'Import Alumni Siswa' di halaman list
expected: Form Import terbuka dengan 9 field: Instansi, Tahun Ajaran, Semester, Tingkat, Kelas, Jurusan, Program, Sistem Pendidikan, Jenis Import (Anggota/Foto Siswa) + Data Excel + Download Template

TEST-ID: AGT-5.83
scenario: Pilih Jenis Import = 'Anggota'
expected: Field standar (Data Excel) tetap tampil

TEST-ID: AGT-5.84
scenario: Pilih Jenis Import = 'Foto Siswa'
expected: Field 'File Foto (Multi)' muncul untuk multi upload foto

TEST-ID: AGT-5.85
scenario: Klik btn 'Download Template'
expected: Template ter-download sesuai Jenis Import yang dipilih

TEST-ID: AGT-5.86
scenario: Kosongkan salah satu required → Simpan
expected: Error muncul di field yang kosong, tombol Simpan tidak bekerja

TEST-ID: AGT-5.87
scenario: Upload Data Excel valid (< 100 baris) + Jenis Import Anggota → Simpan
expected: Toast success dengan format: '{total data} dari {kelas} {instansi} berhasil diimport'

TEST-ID: AGT-5.88
scenario: Upload Data Excel > 100 baris
expected: Sistem tolak dengan error 'Maksimal 100 data per excel'

TEST-ID: AGT-5.89
scenario: Upload Foto Siswa > 2MB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak foto dengan error format/ukuran

TEST-ID: AGT-5.90
scenario: Import template dengan baris yang Email kosong
expected: Baris tsb TIDAK diimport, ditampilkan di log import dengan error 'Email wajib diisi'

TEST-ID: AGT-5.91
scenario: Import template dengan Email format tidak valid
expected: Baris tsb TIDAK diimport, ditampilkan di log import dengan error 'Format email tidak valid'

TEST-ID: AGT-5.92
scenario: Import dengan Nomor Kartu bukan 16 digit atau tidak sesuai membership
expected: Baris tsb TIDAK dapat diimport, ditampilkan di log import

TEST-ID: AGT-5.93
scenario: Setelah import → buka halaman Log Import Alumni Siswa
expected: Data import muncul di halaman Log Import

TEST-ID: AGT-5.94
scenario: Klik btn 'Log Import Alumni Siswa' di halaman list
expected: Sistem menampilkan list Log Import dengan 9 kolom: Tanggal Import, Instansi, Tahun Ajaran, Tingkat, Kelas, Jurusan, Jenis Import, Total Data, Status

TEST-ID: AGT-5.95
scenario: Buka Log Import saat belum ada data
expected: Sistem menampilkan halaman kosong (empty state)

TEST-ID: AGT-5.96
scenario: Aktifkan Filter di Log Import (range tanggal + instansi + tahun ajaran + tingkat + kelas + jurusan)
expected: List filter sesuai kriteria yang dipilih

TEST-ID: AGT-5.97
scenario: Search di Log Import
expected: List menampilkan log import yang match dengan keyword

TEST-ID: AGT-5.98
scenario: Filter/Search Log Import no result
expected: Sistem menampilkan halaman kosong
