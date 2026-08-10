TEST-ID: AGT-2.1
scenario: Load halaman Guru
expected: Sistem menampilkan list dengan 6 kolom: Nama, Nomor Kartu, Jenis, Instansi, Status, Aksi (Detail Guru)

TEST-ID: AGT-2.2
scenario: Buka halaman Guru saat belum ada data
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: AGT-2.3
scenario: Cek default sort list guru
expected: Guru Aktif ditampilkan terlebih dahulu (Nama A-Z), diikuti guru Tidak Aktif (juga A-Z)

TEST-ID: AGT-2.4
scenario: Ketik Nama Guru di search box
expected: List menampilkan guru yang Nama-nya match

TEST-ID: AGT-2.5
scenario: Ketik Nomor Kartu / Jenis / Instansi di search box
expected: List menampilkan guru sesuai keyword (4 kriteria search: Nama, Nomor Kartu, Jenis, Instansi)

TEST-ID: AGT-2.6
scenario: Search dengan keyword yang tidak match
expected: Sistem menampilkan halaman kosong (empty state)

TEST-ID: AGT-2.7
scenario: Aktifkan Filter Instansi
expected: List filter, hanya menampilkan guru dari instansi terpilih

TEST-ID: AGT-2.8
scenario: Aktifkan Filter Jenis
expected: List filter, hanya menampilkan guru dengan jenis terpilih

TEST-ID: AGT-2.9
scenario: Aktifkan Filter Status (Aktif / Tidak Aktif)
expected: List filter, hanya menampilkan guru sesuai status

TEST-ID: AGT-2.10
scenario: Filter aktif tidak ada hasil match
expected: Sistem menampilkan halaman kosong

TEST-ID: AGT-2.11
scenario: Klik Excel untuk Export tanpa filter/checklist
expected: Sistem download file excel berisi 16 kolom: ID, No Kartu, No Induk, Kode QR, Nama Lengkap, Tempat Lahir, Tanggal Lahir, Jenis Kelamin, Alamat, No Telepon, Instansi, Keterangan, Tanggal Mulai Tugas, Pangkat/Golongan, Jabatan, Status

TEST-ID: AGT-2.12
scenario: Aktifkan filter → klik Excel
expected: Sistem hanya export data yang sesuai filter (bukan semua data)

TEST-ID: AGT-2.13
scenario: Search data → klik Excel
expected: Sistem hanya export data hasil pencarian (bukan semua)

TEST-ID: AGT-2.14
scenario: Checklist beberapa guru → klik Excel
expected: Sistem hanya export data yang di-checklist

TEST-ID: AGT-2.15
scenario: Klik Aksi → Lihat di row guru
expected: Halaman Detail Guru terbuka, default page = Data Diri, dengan section Profil Guru (Foto, Nama, Jenis Guru, Instansi, Tagihan, Transaksi) + section Data Diri (20 field)

TEST-ID: AGT-2.16
scenario: Cek field editable vs readonly di section Profil Guru
expected: Foto editable (upload + hapus), Nama/Jenis Guru/Instansi/Tagihan/Transaksi = readonly (tampilan informasi saja)

TEST-ID: AGT-2.17
scenario: Isi semua 7 required (Instansi, Nama Lengkap, Jenis Kelamin, Email, No HP, No Induk, Jenis Guru) → klik Simpan
expected: Toast success dengan pesan 'Guru Berhasil Diubah'

TEST-ID: AGT-2.18
scenario: Kosongkan salah satu field required → klik Simpan
expected: Sistem menampilkan pesan error di field yang kosong, tombol Simpan tidak bekerja

TEST-ID: AGT-2.19
scenario: Isi Email dengan format tidak valid (misal 'namadomain.com') → klik Simpan
expected: Error 'Format email tidak valid' muncul, perubahan tidak disimpan

TEST-ID: AGT-2.20
scenario: Upload Foto > 512KB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Error 'Format foto tidak sesuai, maksimal 512KB tipe .jpg, .jpeg, atau .png' muncul, foto tidak tersimpan

TEST-ID: AGT-2.21
scenario: Isi No HP tidak dimulai dengan 08 atau 62 (misal '7123456789')
expected: Error 'Format No HP tidak valid' muncul, perubahan tidak disimpan

TEST-ID: AGT-2.22
scenario: Isi No Induk yang sudah ada di guru lain PADA INSTANSI YANG SAMA
expected: Error 'No Induk sudah digunakan' muncul, perubahan tidak disimpan (unik per-instansi, boleh sama antar instansi)

TEST-ID: AGT-2.23
scenario: Isi NIK bukan 16 digit angka
expected: Error 'NIK harus 16 digit angka' muncul, perubahan tidak disimpan

TEST-ID: AGT-2.24
scenario: Isi NIK yang sudah ada di guru lain (duplikat)
expected: Error 'NIK sudah digunakan' muncul, perubahan tidak disimpan (bersifat unik)

TEST-ID: AGT-2.25
scenario: Isi NUPTK bukan 16 digit angka
expected: Error 'NUPTK harus 16 digit angka' muncul, perubahan tidak disimpan

TEST-ID: AGT-2.26
scenario: Ubah field Status Aktif ↔ Tidak Aktif → Simpan
expected: Toast success 'Guru Berhasil Diubah', status guru ter-update

TEST-ID: AGT-2.27
scenario: Klik tombol 'Print Data Guru'
expected: Sistem generate PDF berisi Data Diri lengkap guru (Instansi, Nama, Tempat/Tanggal Lahir, Jenis Kelamin, Alamat, Email, No HP, No Induk, NIK, Tanggal Mulai Tugas, Pangkat/Golongan, Jabatan Struktural, Jenis Guru, Tag, Pendidikan Terakhir, Jabatan Fungsional, NUPTK)

TEST-ID: AGT-2.28
scenario: Klik tab Kartu di halaman detail guru
expected: Sistem menampilkan section Profil Guru + Informasi Kartu (6 items) + User (Nama, Email, No Hp) + Wallet (Nama+Nominal) + Riwayat Transaksi + tombol Cetak Kartu + Detail Kartu Actions

TEST-ID: AGT-2.29
scenario: Cek field editable di Informasi Kartu
expected: UID Kartu editable (icon Simpan), RFID editable (icon Simpan). Sisanya readonly: Nomor Kartu, QR Kartu, Status, Info Terakhir Ganti PIN

TEST-ID: AGT-2.30
scenario: Cek section User & Wallet
expected: User section (Nama, Email, No Hp) dan Wallet section (Nama Wallet + Nominal) semua readonly (tidak dapat edit)

TEST-ID: AGT-2.31
scenario: Cek data kartu tidak lengkap (misal UID belum diisi)
expected: Informasi kartu yang kosong ditampilkan dengan indikator kosong (bukan hidden)

TEST-ID: AGT-2.32
scenario: Edit UID Kartu → klik icon Simpan
expected: Toast success 'Guru Berhasil Diubah', UID ter-update

TEST-ID: AGT-2.33
scenario: Edit RFID → klik icon Simpan
expected: Toast success, RFID ter-update

TEST-ID: AGT-2.34
scenario: Klik icon Simpan tanpa input data (edit UID/RFID)
expected: Sistem menampilkan pesan error

TEST-ID: AGT-2.35
scenario: Cek Riwayat Transaksi
expected: List transaksi menampilkan: tanggal, RFID, tipe transaksi, wallet, jumlah, status

TEST-ID: AGT-2.36
scenario: Filter Riwayat Transaksi berdasarkan tanggal
expected: List filter sesuai range tanggal yang dipilih

TEST-ID: AGT-2.37
scenario: Klik Export excel di Riwayat Transaksi
expected: Sistem download file excel berisi riwayat transaksi

TEST-ID: AGT-2.38
scenario: Aktifkan filter tanggal → klik Export
expected: Export hanya berisi data yang sesuai filter yang aktif

TEST-ID: AGT-2.39
scenario: Klik btn 'Cetak Kartu'
expected: Sistem generate kartu fisik untuk cetak

TEST-ID: AGT-2.40
scenario: Klik btn 'Blokir Kartu' di Detail Kartu Actions
expected: Popup blokir confirmation muncul

TEST-ID: AGT-2.41
scenario: Klik btn 'Reset PIN' di Detail Kartu Actions
expected: Popup reset PIN confirmation muncul

TEST-ID: AGT-2.42
scenario: Klik btn 'Laporkan Kartu Hilang' → isi alasan → klik Proses
expected: Sistem process laporan kartu hilang

TEST-ID: AGT-2.43
scenario: Klik btn 'Reset' di kolom User → popup Reset confirmation → klik 'Reset Pengguna'
expected: Sistem melepaskan kartu dari pengguna aplikasi Cards Parents, Cards Edu, Operational, dan Partner (menu Kartu di aplikasi tersebut tidak lagi tertaut dengan akun user)

TEST-ID: AGT-2.44
scenario: Klik btn 'Reset' di kolom User → popup Reset confirmation → klik 'Batal'
expected: Sistem tidak melakukan reset, kembali ke halaman kartu

TEST-ID: AGT-2.45
scenario: Klik tab Tagihan di halaman detail guru
expected: Sistem menampilkan list tagihan guru dengan info: Status, Catatan, Nama Tagihan, Jumlah Tagihan, Terbayar, Sisa tagihan, Tanggal Dibuat

TEST-ID: AGT-2.46
scenario: Buka tab Tagihan saat guru belum ada tagihan
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-2.47
scenario: Search tagihan by nama tagihan
expected: List filter menampilkan tagihan yang match dengan keyword nama

TEST-ID: AGT-2.48
scenario: Klik tab Dokumen di halaman detail guru
expected: Sistem menampilkan list dokumen dengan 6 kolom: Nama Surat, Nomor Surat, Dibuat Pada, Terakhir Diubah, Dokumen, Aksi (Edit & Hapus)

TEST-ID: AGT-2.49
scenario: Buka tab Dokumen saat belum ada dokumen
expected: Sistem menampilkan list kosong (empty state)

TEST-ID: AGT-2.50
scenario: Search dokumen by Nama atau Nomor
expected: List menampilkan dokumen yang match dengan keyword

TEST-ID: AGT-2.51
scenario: Klik btn 'Tambah Dokumen'
expected: Form Tambah terbuka: Nama Surat (required), Nomor Surat (opsional), Dokumen upload (required)

TEST-ID: AGT-2.52
scenario: Isi form Tambah valid + upload dokumen valid → klik Simpan
expected: Toast success, dokumen ter-add ke list

TEST-ID: AGT-2.53
scenario: Kosongkan Nama Surat → klik Simpan
expected: Error 'Nama Surat wajib diisi' muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-2.54
scenario: Upload dokumen tipe tidak diizinkan (bukan PDF/png/jpg/jpeg)
expected: Sistem tolak dengan error format file

TEST-ID: AGT-2.55
scenario: Klik Batal di form Tambah Dokumen
expected: Form tertutup, sistem kembali ke halaman dokumen

TEST-ID: AGT-2.56
scenario: Klik Aksi → Edit di row dokumen
expected: Form Edit terbuka: Nama Surat (prefilled), Nomor Surat (prefilled), Checkbox 'Ubah Dokumen?' (default OFF)

TEST-ID: AGT-2.57
scenario: Checklist 'Ubah Dokumen?' di form Edit
expected: Field upload Dokumen muncul (required saat checkbox aktif)

TEST-ID: AGT-2.58
scenario: Edit tanpa checklist Ubah Dokumen → ubah Nama saja → Simpan
expected: Toast success, Nama Surat ter-update, file lama tetap

TEST-ID: AGT-2.59
scenario: Klik Aksi → Hapus di row dokumen → popup delete confirmation
expected: Popup Hapus muncul dengan tombol Hapus + Batal

TEST-ID: AGT-2.60
scenario: Klik Hapus di popup → dokumen terhapus. Klik Batal → tidak terhapus
expected: Sesuai aksi user: Hapus → toast success dan hilang dari list. Batal → dokumen tetap ada

TEST-ID: AGT-2.61
scenario: Klik tab Perizinan di halaman detail guru
expected: Sistem menampilkan list riwayat perizinan dengan 13 kolom (termasuk checkbox untuk bulk action): Checkbox, Tanggal Izin, Nama, No Kartu, Role, Kelas, Tipe Izin, Nama Izin, Periode Izin, Catatan, Diajukan Oleh, Status, Aksi

TEST-ID: AGT-2.62
scenario: Buka tab Perizinan saat belum ada data
expected: Sistem menampilkan ilustrasi + tulisan 'Tidak Ada Data perizinan' (ID) atau 'No Permission Data' (EN)

TEST-ID: AGT-2.63
scenario: Cek kolom Kelas untuk perizinan role Siswa vs Guru
expected: Row role Siswa menampilkan data tingkat + kelas siswa. Row role Guru menampilkan minus (-)

TEST-ID: AGT-2.64
scenario: Search perizinan by nama izin / nama siswa / nama guru
expected: List filter sesuai keyword pencarian

TEST-ID: AGT-2.65
scenario: Klik Excel untuk Export Perizinan
expected: Sistem export excel 12 kolom: No, Instansi, Tanggal Izin, Nama Guru, No Kartu Guru, Role Anggota, Tipe Izin, Nama Izin, Periode Izin, Catatan, Diajukan Oleh, Status (Dipertimbangkan/Disetujui/Ditolak)

TEST-ID: AGT-2.66
scenario: Klik Tambah Perizinan → cek form Durasi Izin = 'Hanya 1 Hari'
expected: Form conditional muncul: Tanggal, Waktu Mulai, Waktu Selesai (semua required)

TEST-ID: AGT-2.67
scenario: Pilih Durasi Izin = 'Lebih dari 1 Hari'
expected: Form conditional muncul: Tanggal Mulai, Tanggal Selesai (semua required)

TEST-ID: AGT-2.68
scenario: Ganti Durasi dari 'Hanya 1 Hari' ke 'Lebih dari 1 Hari' (atau sebaliknya)
expected: Form conditional otomatis update sesuai pilihan Durasi baru

TEST-ID: AGT-2.69
scenario: Isi semua required (Tanggal Pengajuan, Tipe Izin, Nama Izin, Durasi Izin + conditional fields) → klik Simpan
expected: Toast success, perizinan ter-add ke list dengan status default 'Dipertimbangkan'. Notifikasi ke Cards Edu + Cards Parents

TEST-ID: AGT-2.70
scenario: Upload Foto perizinan > 5MB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak (foto max 5MB, format .jpg/.jpeg/.png). Catatan: foto perizinan max 5MB, beda dari foto profil yang max 512KB

TEST-ID: AGT-2.71
scenario: Klik Aksi → Edit di row perizinan
expected: Popup Edit terbuka. Field editable: Tanggal Realisasi Kembali (Date Picker opsional), Waktu Realisasi Kembali (Time Picker opsional), Status. Sisanya readonly (label saja)

TEST-ID: AGT-2.72
scenario: Ubah Status perizinan jadi 'Disetujui' → klik Simpan → cek data absensi (harian + mapel) siswa untuk periode izin
expected: Status absensi siswa (harian & mapel) pada periode izin otomatis berubah jadi 'Izin' (semua yang tadinya Alpa)

TEST-ID: AGT-2.73
scenario: Ubah Status jadi 'Dipertimbangkan' atau 'Ditolak' → cek data absensi
expected: Status absensi TIDAK berubah, tetap Alpa (hanya Disetujui yang trigger perubahan)

TEST-ID: AGT-2.74
scenario: Guru ajukan izin siswa via Cards Edu → cek status pengajuan di Cards School
expected: Status pengajuan otomatis menjadi 'Disetujui' tanpa approval admin. Absensi tidak berubah jadi Izin jika siswa sudah absen; hanya berubah jika siswa BELUM absen

TEST-ID: AGT-2.75
scenario: Ubah Status di Edit Perizinan → klik Simpan
expected: Loading animation, popup tertutup, notifikasi push + in-app dikirim ke aplikasi Cards Edu + Cards Parents sesuai member

TEST-ID: AGT-2.76
scenario: Klik Aksi → Hapus di row perizinan → popup confirmation → klik Hapus
expected: Toast success, perizinan terhapus dari Cards School + Cards Edu + Cards Parents

TEST-ID: AGT-2.77
scenario: Centang checkbox header tabel → cek banner Pilih Semua Hasil Filter
expected: Banner muncul: '{n_halaman} data di halaman ini terpilih. Pilih semua {n_total} data sesuai filter saat ini?' dengan btn 'Pilih Semua'

TEST-ID: AGT-2.78
scenario: Klik 'Pilih Semua' saat hasil filter > 50 data
expected: Sistem hanya memilih 50 data pertama dengan notifikasi (max 50 data per bulk delete)

TEST-ID: AGT-2.79
scenario: Manual centang > 50 checkbox individual
expected: Checkbox tambahan disabled dengan tooltip 'Maksimal 50 data per penghapusan / Maximum 50 records per deletion'

TEST-ID: AGT-2.80
scenario: Centang beberapa data → ubah filter atau search
expected: Selection direset dengan notifikasi 'Pilihan direset karena filter berubah'

TEST-ID: AGT-2.81
scenario: Mode 'Pilih Semua Hasil Filter' aktif → pindah halaman
expected: Selection dipertahankan lintas halaman. (Jika dari centang manual per halaman, selection direset saat pindah)

TEST-ID: AGT-2.82
scenario: Klik 'Hapus Terpilih' di action bar → cek popup confirmation
expected: Popup delete confirmation muncul: 'Apakah anda yakin menghapus {n} data Perizinan terpilih?' + preview list format '{tanggal izin} – {nama izin}'

TEST-ID: AGT-2.83
scenario: Klik Hapus di popup bulk delete → semua data terhapus sukses
expected: Toast success dengan jumlah data yang berhasil dihapus, data terhapus dari Cards School + Cards Edu + Cards Parents

TEST-ID: AGT-2.84
scenario: Bulk delete: sebagian data gagal dihapus
expected: Warning muncul: '{x} dari {n} data berhasil dihapus. {y} data gagal, silakan coba lagi'

TEST-ID: AGT-2.85
scenario: Bulk delete: semua data gagal dihapus
expected: Error muncul: 'Gagal menghapus data, silakan coba lagi'. Selection tetap dipertahankan

TEST-ID: AGT-2.86
scenario: Checklist beberapa guru → klik Aksi → cek menu yang muncul
expected: Sistem menampilkan submenu: Ubah Jenis Guru, Ubah Status, Pindah Instansi, Download Kartu, Download Surat

TEST-ID: AGT-2.87
scenario: Checklist beberapa guru → Aksi → Ubah Status → pilih Aktif/Tidak Aktif → Simpan
expected: Toast success 'Berhasil Ubah Status Guru', status semua guru yang di-checklist berubah

TEST-ID: AGT-2.88
scenario: Ubah Status: klik Simpan tanpa isi Status → error
expected: Sistem menampilkan pesan error, tidak menyimpan perubahan

TEST-ID: AGT-2.89
scenario: Checklist beberapa guru → Aksi → Ubah Jenis Guru → cek form
expected: Form terbuka dengan field: Instansi (DISABLED - otomatis muncul sesuai data guru) + Jenis Guru (required)

TEST-ID: AGT-2.90
scenario: Ubah Jenis Guru: pilih Jenis Guru valid → Simpan
expected: Toast success 'Berhasil Ubah Jenis Guru', jenis semua guru yang di-checklist berubah

TEST-ID: AGT-2.91
scenario: Checklist 1 guru saja → Aksi → Download Kartu
expected: Sistem download 1 file PDF berisi 1 kartu guru yang di-checklist

TEST-ID: AGT-2.92
scenario: Checklist > 1 guru → Aksi → Download Kartu
expected: Sistem download 1 file PDF berisi SEMUA kartu guru yang di-checklist (bukan multiple file, tapi 1 PDF combined)

TEST-ID: AGT-2.93
scenario: Checklist 1 guru → Aksi → Download Surat
expected: Sistem langsung download file PDF berisi surat 1 guru tersebut

TEST-ID: AGT-2.94
scenario: Checklist > 1 guru → Aksi → Download Surat
expected: Sistem generate file ZIP berisi PDF surat per guru terpisah (bukan combined PDF, tapi ZIP archive)

TEST-ID: AGT-2.95
scenario: Checklist beberapa guru → Aksi → Pindah Alumni → popup confirmation
expected: Popup confirmation muncul dengan tombol Simpan + Batal

TEST-ID: AGT-2.96
scenario: Klik Simpan di popup Pindah Alumni
expected: Data guru yang dipilih pindah ke menu Alumni (cross-feature), hilang dari list guru

TEST-ID: AGT-2.97
scenario: Klik Batal di popup Pindah Alumni
expected: Popup tertutup, guru TIDAK dipindah, sistem kembali ke halaman guru

TEST-ID: AGT-2.98
scenario: Klik btn 'Import Guru' di halaman list
expected: Form Import terbuka dengan field: Instansi (required), Jenis Guru (required), Data Excel (required), Download Template

TEST-ID: AGT-2.99
scenario: Klik btn 'Download Template'
expected: Sistem download file excel template untuk import guru

TEST-ID: AGT-2.100
scenario: Upload file bukan excel (misal .pdf, .doc)
expected: Sistem tolak file, hanya format excel yang diterima

TEST-ID: AGT-2.101
scenario: Isi semua required + upload data excel valid → klik Simpan
expected: Toast success, data guru ter-import

TEST-ID: AGT-2.102
scenario: Kosongkan salah satu required → klik Simpan
expected: Error muncul di field yang kosong, tombol Simpan tidak bekerja

TEST-ID: AGT-2.103
scenario: Import gagal (misal data invalid)
expected: Pesan error muncul dan tidak langsung hilang (persistent supaya user bisa baca)

TEST-ID: AGT-2.104
scenario: Klik Batal di form Import
expected: Form tertutup, sistem kembali ke halaman guru

TEST-ID: AGT-2.105
scenario: Klik btn 'Tambah Guru' di halaman list
expected: Form Tambah Guru terbuka dengan 17 field

TEST-ID: AGT-2.106
scenario: Isi semua 7 field required (Instansi, Nama Lengkap, Jenis Kelamin, No HP, No Induk, Jenis Guru, No Kartu) → klik Simpan
expected: Toast success, guru baru ter-add ke list

TEST-ID: AGT-2.107
scenario: Kosongkan salah satu required → klik Simpan
expected: Error muncul, tombol Simpan tidak bekerja

TEST-ID: AGT-2.108
scenario: Upload Foto Guru > 512KB atau tipe tidak diizinkan (bukan jpg/jpeg/png)
expected: Sistem tolak foto dengan error format tidak sesuai

TEST-ID: AGT-2.109
scenario: Isi No HP tidak dimulai 08 atau 62
expected: Sistem tolak dengan error format No HP

TEST-ID: AGT-2.110
scenario: Isi No Induk yang sudah ada di instansi yang sama
expected: Sistem tolak dengan error No Induk sudah digunakan (unik per-instansi)

TEST-ID: AGT-2.111
scenario: Isi No Kartu → sistem cek nomor kartu terhadap membership partner
expected: Kalau No Kartu valid (sesuai membership partner) → data tersimpan. Kalau tidak sesuai → error

TEST-ID: AGT-2.112
scenario: Klik Batal di form Tambah Guru
expected: Form tertutup, sistem kembali ke halaman guru, data tidak tersimpan

TEST-ID: AGT-2.113
scenario: Checklist beberapa guru di list halaman Guru → Aksi → Pindah Instansi / Institution Transfer
expected: Form muncul: Instansi* (required), Jenis Guru / Teacher Type* (required)

TEST-ID: AGT-2.114
scenario: Pilih Instansi baru di form Pindah Instansi Guru
expected: Dropdown Jenis Guru reload menampilkan hanya Jenis Guru yang ada di Instansi terpilih

TEST-ID: AGT-2.115
scenario: Klik Simpan tanpa isi Instansi
expected: Error required di field Instansi

TEST-ID: AGT-2.116
scenario: Klik Simpan tanpa isi Jenis Guru
expected: Error required di field Jenis Guru

TEST-ID: AGT-2.117
scenario: Isi semua required valid, klik Simpan (happy path)
expected: Pesan sukses 'Berhasil Pindah Instansi', guru pindah ke instansi baru

TEST-ID: AGT-2.118
scenario: Setelah Pindah Instansi Guru, cek status di instansi lama
expected: Klarifikasi ke Safki: apakah guru jadi alumni di instansi lama (seperti pindah instansi siswa) atau langsung dihapus dari instansi lama?

TEST-ID: AGT-2.119
scenario: Klik Batal di form Pindah Instansi Guru
expected: Form tertutup, kembali ke halaman guru tanpa perubahan

TEST-ID: AGT-2.120
scenario: Bulk Pindah Instansi >3 guru sekaligus
expected: Semua guru terpilih pindah ke instansi baru serentak

TEST-ID: AGT-2.121
scenario: Cek 7 kolom di tab Tagihan Guru
expected: Kolom: Status, Catatan, Nama Tagihan, Jumlah Tagihan, Terbayar, Sisa Tagihan, Tanggal Dibuat

TEST-ID: AGT-2.122
scenario: Cek status tagihan Guru
expected: Status: Lunas, Belum Terbayar, Terbayar Sebagian (sama seperti tagihan siswa). Klarifikasi warna badge ke Safki.

TEST-ID: AGT-2.123
scenario: Search tagihan Guru by Nama Tagihan
expected: List ter-filter menampilkan tagihan dengan nama match

TEST-ID: AGT-2.124
scenario: Search Nama Tagihan Guru no result
expected: Empty state / list kosong

TEST-ID: AGT-2.125
scenario: Cek Profile Guru header di tab Tagihan (dan tab lain)
expected: Header profile menampilkan: Photo (editable upload/hapus), Nama, Jenis Guru, Instansi, Info Tagihan, Info Transaksi. Nama/Jenis/Instansi/Tagihan/Transaksi = read-only.

TEST-ID: AGT-2.126
scenario: Cek konsistensi Info Tagihan di header vs sum sisa tagihan di list
expected: Info Tagihan header = sum Sisa Tagihan semua row di tab Tagihan

TEST-ID: AGT-2.127
scenario: Cek 6 kolom di tab Dokumen Guru
expected: Kolom: Nama Surat / Latter Name, Nomor Surat / Latter No, Dibuat Pada / Created At, Terakhir Diubah / Last Update, Dokumen / Document, Aksi (Edit & Hapus)

TEST-ID: AGT-2.128
scenario: Upload dokumen Guru dengan format PDF valid
expected: Dokumen ter-upload sukses

TEST-ID: AGT-2.129
scenario: Upload dokumen Guru dengan format PNG/JPG/JPEG
expected: Dokumen ter-upload sukses (3 format image diterima)

TEST-ID: AGT-2.130
scenario: Upload dokumen Guru dengan format tidak diizinkan (mis. .docx, .gif)
expected: Error format: 'Hanya PDF dan gambar (.png, .jpg, .jpeg) yang diizinkan'

TEST-ID: AGT-2.131
scenario: Upload dokumen Guru dengan ukuran besar
expected: Klarifikasi ke Safki: apakah ada limit size untuk dokumen guru (PRD tidak sebutkan, mirip Dokumen Siswa 512KB atau beda)?

TEST-ID: AGT-2.132
scenario: Klik Aksi → Edit di row dokumen guru — cek form
expected: Form Edit muncul: Nama Surat*, Nomor Surat (opsional), checkbox Ubah Dokumen / Change Document

TEST-ID: AGT-2.133
scenario: Edit dokumen tanpa checklist Ubah Dokumen — hanya ubah Nama
expected: Nama Surat ter-update, dokumen tetap file lama

TEST-ID: AGT-2.134
scenario: Edit dokumen dengan checklist Ubah Dokumen → upload file baru
expected: Kolom upload dokumen muncul, upload valid → dokumen replace, Terakhir Diubah update

TEST-ID: AGT-2.135
scenario: Ubah Status Guru: pilih Aktif, klik Simpan
expected: Pesan sukses 'Berhasil Ubah Status Guru', guru terpilih status Aktif

TEST-ID: AGT-2.136
scenario: Ubah Status Guru: pilih Tidak Aktif, klik Simpan
expected: Pesan sukses, guru berubah status Tidak Aktif

TEST-ID: AGT-2.137
scenario: Bulk Ubah Status Guru >5 guru
expected: Semua guru terpilih status berubah serentak, toast success

TEST-ID: AGT-2.138
scenario: Klik Simpan tanpa pilih Status Guru
expected: Error required 'Status wajib dipilih'

TEST-ID: AGT-2.139
scenario: Klik Batal di form Ubah Status Guru
expected: Form tertutup, kembali ke halaman guru

TEST-ID: AGT-2.140
scenario: Checklist guru → Aksi → Ubah Jenis Guru / Change Teacher Type
expected: Form muncul: Instansi (DISABLED, auto-filled dari data guru), Jenis Guru* (required)

TEST-ID: AGT-2.141
scenario: Cek field Instansi di Ubah Jenis Guru — coba edit
expected: Instansi TIDAK bisa diubah (disabled), value auto sesuai instansi guru saat ini

TEST-ID: AGT-2.142
scenario: Cek dropdown Jenis Guru — apakah ter-filter per instansi
expected: Dropdown Jenis Guru hanya menampilkan Jenis Guru yang ada di Instansi guru (auto-filled)

TEST-ID: AGT-2.143
scenario: Isi Jenis Guru valid, klik Simpan
expected: Pesan sukses 'Berhasil Ubah Jenis Guru'

TEST-ID: AGT-2.144
scenario: Klik Simpan tanpa pilih Jenis Guru
expected: Error required

TEST-ID: AGT-2.145
scenario: Klik Batal di Ubah Jenis Guru
expected: Form tertutup

TEST-ID: AGT-2.146
scenario: Bulk Ubah Jenis Guru >3 guru dengan instansi SAMA
expected: Semua guru terpilih jenis ter-update serentak

TEST-ID: AGT-2.147
scenario: Bulk Ubah Jenis Guru >3 guru dari instansi BERBEDA
expected: Klarifikasi ke Safki: apakah bulk multi-instansi diizinkan (Instansi disabled = auto per guru) atau error 'guru harus dari instansi sama'?

TEST-ID: AGT-2.148
scenario: Perbedaan Ubah Jenis Guru vs Pindah Instansi Guru
expected: Klarifikasi ke Safki: Pindah Instansi ubah instansi + jenis, Ubah Jenis hanya ubah jenis di instansi tetap. Konfirmasi kapan pakai yang mana

TEST-ID: AGT-2.149
scenario: Checklist 1 guru saja → Aksi → Download Kartu
expected: Sistem download 1 kartu guru terpilih dalam format PDF, langsung simpan di device admin

TEST-ID: AGT-2.150
scenario: Cek format file download kartu Guru
expected: Format PDF (kartu sementara)

TEST-ID: AGT-2.151
scenario: Checklist >1 guru → Aksi → Download Kartu (bulk)
expected: Sistem download SEMUA kartu guru terpilih dalam 1 FILE PDF GABUNGAN (bukan multi-file terpisah)

TEST-ID: AGT-2.152
scenario: Cek isi PDF hasil bulk download kartu guru
expected: 1 file PDF berisi kartu semua guru terpilih. Klarifikasi ke Safki: apakah bulk pakai antrian download seperti kartu siswa atau langsung?

TEST-ID: AGT-2.153
scenario: Cek design kartu guru di PDF
expected: Design sesuai konfigurasi kartu. Klarifikasi ke Safki: apakah nomor kartu guru juga spacing per 4 digit seperti siswa?

TEST-ID: AGT-2.154
scenario: Buka tab Kartu di Detail Guru — cek info yang tampil
expected: Menampilkan: Profil Guru (Photo, Nama, Jenis Guru, Instansi, Tagihan, Transaksi), Informasi Kartu (Nomor, QR, UID, Status, RFID, Terakhir Ganti PIN), User (Nama, Email, No HP), Wallet (Nama & Nominal), Riwayat Transaksi

TEST-ID: AGT-2.155
scenario: Edit UID Kartu di tab Kartu Guru
expected: Field UID Kartu editable, klik icon Simpan → sistem simpan perubahan, toast 'Guru Berhasil Diubah'

TEST-ID: AGT-2.156
scenario: Edit RFID di tab Kartu Guru
expected: Field RFID editable, klik icon Simpan → perubahan tersimpan, toast success

TEST-ID: AGT-2.157
scenario: Cek konsistensi Edit RFID di tab Kartu Guru vs modul RFID Sync
expected: RFID yang diedit di tab Kartu Guru sync ke modul RFID Sync (dan sebaliknya). Klarifikasi konsistensi behavior.

TEST-ID: AGT-2.158
scenario: Klik icon Simpan pada UID/RFID tanpa input data (field kosong)
expected: Error required, tidak menyimpan perubahan

TEST-ID: AGT-2.159
scenario: Edit Foto Profil Guru di header profil (semua tab)
expected: Klik icon edit foto → dialog upload/hapus muncul. Upload foto baru → foto ter-update. Hapus foto → foto kembali default

TEST-ID: AGT-2.160
scenario: Cek field read-only di Detail Kartu Guru
expected: Read-only: Nomor Kartu, QR Kartu, Status, Terakhir Ganti PIN, Nama/Email/No HP User, Wallet, Nama/Jenis Guru/Instansi/Tagihan/Transaksi di profile

TEST-ID: AGT-2.161
scenario: Cek Riwayat Transaksi Guru
expected: List riwayat transaksi menampilkan: Tanggal, RFID, Tipe Transaksi, Wallet, Jumlah, Status

TEST-ID: AGT-2.162
scenario: Riwayat Transaksi Guru: aktifkan filter tanggal (range date)
expected: List riwayat ter-filter berdasarkan tanggal yang dipilih

TEST-ID: AGT-2.163
scenario: Klik button Excel export Riwayat Transaksi Guru
expected: Excel ter-download berisi list riwayat transaksi

TEST-ID: AGT-2.164
scenario: Export Riwayat Transaksi Guru saat filter tanggal aktif
expected: Excel export HANYA transaksi sesuai filter aktif (bukan semua)

TEST-ID: AGT-2.165
scenario: Klik button Cetak Kartu di tab Kartu Guru
expected: Sistem cetak/download kartu guru dalam PDF sesuai design kartu

TEST-ID: AGT-2.166
scenario: Buka Detail Guru, klik tab Kesehatan / Health
expected: Tab Kesehatan terbuka menampilkan 3 section: Data Kesehatan, Imunisasi/Vaksin, Riwayat Kesehatan

TEST-ID: AGT-2.167
scenario: Cek 5 field di section Data Kesehatan Guru
expected: Riwayat Kesehatan, Disabilitas, Tinggi Badan, Berat Badan, Golongan Darah — semua OPSIONAL (no Hasil Tes Buta Warna seperti siswa)

TEST-ID: AGT-2.168
scenario: Isi field Data Kesehatan Guru (semua opsional), klik Simpan
expected: Data tersimpan, toast success. Kosongkan semua + Simpan → juga sukses (no required)

TEST-ID: AGT-2.169
scenario: Cek section Imunisasi/Vaksin
expected: PRD menyebut 'Imunisasi/vaksin' (bukan hanya Imunisasi seperti Siswa). Klarifikasi ke Safki: apakah 2 tipe berbeda atau nama alternatif untuk field yang sama

TEST-ID: AGT-2.170
scenario: Klik Tambah Imunisasi/Vaksin
expected: Field muncul: Tanggal*, Nama Imunisasi/Vaksin* (2 field required)

TEST-ID: AGT-2.171
scenario: Isi field Imunisasi/Vaksin valid, klik Simpan
expected: Imunisasi tersimpan, muncul di list (2 kolom: Tanggal, Nama Imunisasi/Vaksin)

TEST-ID: AGT-2.172
scenario: Klik icon Hapus di row Imunisasi/Vaksin Guru
expected: Imunisasi langsung terhapus TANPA popup konfirmasi (per PRD)

TEST-ID: AGT-2.173
scenario: Cek 7 kolom List Riwayat Kesehatan Guru
expected: Kolom: Checkbox, Tanggal Kejadian, Indikasi, Tindakan, Keterangan, Dibuat Oleh, Aksi (Edit & Hapus)

TEST-ID: AGT-2.174
scenario: Empty state Riwayat Kesehatan Guru
expected: List kosong

TEST-ID: AGT-2.175
scenario: Search Riwayat Kesehatan Guru by Indikasi / Tindakan / Keterangan
expected: List ter-filter per keyword

TEST-ID: AGT-2.176
scenario: Klik Tambah Riwayat / Add History Kesehatan Guru
expected: Form muncul: Tanggal Kejadian*, Indikasi*, Tindakan*, Keterangan* (semua required)

TEST-ID: AGT-2.177
scenario: Isi semua required valid Riwayat Kesehatan Guru, klik Simpan
expected: Riwayat tersimpan, sync ke Cards Edu + Parents, toast success

TEST-ID: AGT-2.178
scenario: Kosongkan required + klik Simpan
expected: Error required, button Simpan disabled

TEST-ID: AGT-2.179
scenario: Klik Aksi → Edit di row Riwayat Kesehatan Guru
expected: Form Edit muncul dengan 4 field required (same as Tambah)

TEST-ID: AGT-2.180
scenario: Edit Riwayat Kesehatan Guru: ubah field, klik Simpan
expected: Riwayat ter-update, sync ke Cards Edu + Parents

TEST-ID: AGT-2.181
scenario: Klik Aksi → Hapus (single) Riwayat Kesehatan Guru
expected: Popup confirmation muncul

TEST-ID: AGT-2.182
scenario: Popup single delete klik Hapus
expected: Riwayat terhapus dari Cards School + Edu + Parents, toast success

TEST-ID: AGT-2.183
scenario: Bulk delete Riwayat Kesehatan Guru: centang rows + action bar
expected: Action bar dengan jumlah + tombol Hapus Terpilih

TEST-ID: AGT-2.184
scenario: Bulk header + banner Pilih Semua Filter + limit 50
expected: Standard pattern: banner, notifikasi 50 max, checkbox disabled > 50

TEST-ID: AGT-2.185
scenario: Popup bulk delete Riwayat: preview format
expected: Popup: 'Apakah anda yakin menghapus {n} Riwayat Kesehatan terpilih?' + preview {tanggal kejadian} – {indikasi}

TEST-ID: AGT-2.186
scenario: Bulk delete Riwayat sukses / partial fail / full fail
expected: Standard warning/error behavior sama seperti tab lain

TEST-ID: AGT-2.187
scenario: Permission bulk delete Riwayat Kesehatan Guru
expected: Semua role dengan akses tab Kesehatan Guru bisa akses bulk delete

TEST-ID: AGT-2.188
scenario: Klik Excel export Riwayat Kesehatan Guru
expected: Excel ter-download

TEST-ID: AGT-2.189
scenario: Cek kolom Excel Riwayat Kesehatan Guru
expected: 9 kolom: No, Instansi, Nama Guru, No Kartu Guru, Tanggal Kejadian, Indikasi, Tindakan, Keterangan, Dibuat Oleh (BEDA dari Siswa yang punya 10 kolom termasuk Tingkat-Kelas)

TEST-ID: AGT-2.190
scenario: Cek 13 kolom list Perizinan Guru (extend from existing partial)
expected: Kolom: Checkbox, Tanggal Izin, Nama, No Kartu, Role, Kelas (minus '-' jika role guru), Tipe Izin, Nama Izin, Periode Izin, Catatan, Diajukan Oleh, Status, Aksi

TEST-ID: AGT-2.191
scenario: Cek kolom Kelas untuk perizinan role Guru vs Siswa di list
expected: Row role Siswa: menampilkan Tingkat-Kelas. Row role Guru: menampilkan '-' (minus)

TEST-ID: AGT-2.192
scenario: Cek kolom Diajukan Oleh
expected: Menampilkan nama user (akun) yang mengajukan izin

TEST-ID: AGT-2.193
scenario: Empty state Perizinan Guru — cek teks ilustrasi
expected: Bahasa ID: 'Tidak Ada Data perizinan'. Bahasa EN: 'No Permission Data'. Ada ilustrasi.

TEST-ID: AGT-2.194
scenario: Cek Excel export kolom Perizinan Guru
expected: 12 kolom: No, Instansi, Tanggal Izin, Nama Guru, No Kartu Guru, Role Anggota (Guru), Tipe Izin, Nama Izin, Periode Izin, Catatan, Diajukan Oleh, Status (Dipertimbangkan/Disetujui/Ditolak)

TEST-ID: AGT-2.195
scenario: Cek Form Edit Perizinan Guru — total 14 items
expected: Item 1-14: Tanggal Pengajuan (label RO), Nama (RO), No Kartu (RO), Role (RO), Kelas (RO), Tipe Izin (label RO), Nama Izin (label RO), Lama Izin (RO), Tanggal Realisasi Kembali (editable date picker), Waktu Realisasi Kembali (editable time picker), Status (editable dropdown), Foto (RO, zoomable), Catatan (label RO), Diajukan Oleh (label RO nama + no HP)

TEST-ID: AGT-2.196
scenario: Cek Date Picker Tanggal Realisasi Kembali di Edit
expected: Date picker dengan placeholder 'DD/MM/YYYY', opsional (bisa kosong)

TEST-ID: AGT-2.197
scenario: Cek Time Picker Waktu Realisasi Kembali di Edit
expected: Time picker dengan placeholder 'HH/MM'. Klarifikasi ke Safki: seharusnya HH:MM (bukan HH/MM) — kemungkinan typo PRD

TEST-ID: AGT-2.198
scenario: Cek Foto Perizinan di Edit — bisa diperbesar
expected: Foto zoomable (klik untuk perbesar), TIDAK dapat diubah oleh admin (upload user only)

TEST-ID: AGT-2.199
scenario: Ubah Status Perizinan Guru jadi Disetujui, klik Simpan
expected: Animasi loading, data tersimpan, popup tertutup. Notifikasi push + in-app dikirim ke Cards Edu & Cards Parents

TEST-ID: AGT-2.200
scenario: Ubah Status jadi Disetujui → cek data Absensi Harian & Mapel siswa/guru periode izin
expected: Status absensi (harian + mapel) periode izin OTOMATIS berubah dari Alpa/kosong jadi Izin

TEST-ID: AGT-2.201
scenario: Status Perizinan tetap Dipertimbangkan atau Ditolak → cek Absensi
expected: Status absensi harian & mapel TIDAK berubah, tetap Alpa (tidak jadi Izin)

TEST-ID: AGT-2.202
scenario: Guru ajukan izin siswa via Cards Edu → status perizinan
expected: Status pengajuan OTOMATIS jadi Disetujui (tanpa perlu approval admin di Cards School)

TEST-ID: AGT-2.203
scenario: Guru ajukan izin siswa via Cards Edu, tapi siswa SUDAH melakukan absensi
expected: Status absensi TIDAK berubah jadi Izin (tetap absensi yang sudah tercatat)

TEST-ID: AGT-2.204
scenario: Guru ajukan izin siswa via Cards Edu, siswa BELUM melakukan absensi
expected: Status absensi harian/mapel berubah jadi Izin (auto-sync)

TEST-ID: AGT-2.205
scenario: Cek periode absensi yang ter-update
expected: Sistem hanya mengubah status absensi (harian/mapel) menjadi Izin pada periode yang di-ajukan izin (bukan diluar periode)

TEST-ID: AGT-2.206
scenario: Foto Perizinan Guru upload > 5MB (di Tambah)
expected: Error: 'Foto maksimal 5MB' (BEDA dari Siswa yang 10MB)

TEST-ID: AGT-2.207
scenario: Tambah Perizinan Guru — Foto (opsional) vs Perizinan Siswa (required)
expected: Perizinan Guru: Foto OPSIONAL. Perizinan Siswa: Foto REQUIRED. Verify di UI

TEST-ID: AGT-2.208
scenario: Cek total 20 field di section Data Diri Guru
expected: Field: Instansi*, Nama Lengkap*, Tempat Lahir, Tanggal Lahir, Jenis Kelamin*, Alamat Lengkap, Email*, No HP*, No Induk*, NIK, Tanggal Mulai Tugas, Pangkat/Golongan, Jabatan Struktural, Jenis Guru*, Status, Tag, Pendidikan Terakhir, Jabatan Fungsional, NUPTK

TEST-ID: AGT-2.209
scenario: Cek field baru: Tanggal Mulai Tugas / Start Date of Assignment
expected: Field date picker, editable, opsional

TEST-ID: AGT-2.210
scenario: Cek field baru: Pangkat/Golongan / Rank/Grade
expected: Field editable, opsional. Klarifikasi ke Safki: format input (dropdown atau text bebas)

TEST-ID: AGT-2.211
scenario: Cek field baru: Jabatan Struktural / Position
expected: Field editable, opsional. Klarifikasi ke Safki: dropdown atau text bebas

TEST-ID: AGT-2.212
scenario: Cek field baru: Tag
expected: Field editable multi-select tag, opsional

TEST-ID: AGT-2.213
scenario: Cek field baru: Pendidikan Terakhir
expected: Field editable, opsional. Klarifikasi ke Safki: dropdown (S1/S2/S3/dll) atau text bebas

TEST-ID: AGT-2.214
scenario: Cek field baru: Jabatan Fungsional
expected: Field editable, opsional. Klarifikasi ke Safki: dropdown atau text bebas

TEST-ID: AGT-2.215
scenario: Isi NUPTK 16 digit angka valid
expected: Diterima, tersimpan

TEST-ID: AGT-2.216
scenario: Isi NUPTK duplicate dengan guru lain
expected: Klarifikasi ke Safki: apakah NUPTK unique (mirip NIK) atau boleh duplikat

TEST-ID: AGT-2.217
scenario: Klik Print Data Guru — verify isi PDF vs template docs.google.com
expected: PDF berisi 19 field Data Diri (kecuali Status yang tidak di-print). Layout match template Google Docs

TEST-ID: AGT-2.218
scenario: Print Data Guru saat field opsional banyak kosong
expected: PDF tetap ter-generate, field kosong tampil dash '-' atau blank

TEST-ID: AGT-2.219
scenario: Buka Detail Guru, klik tab Jadwal Pelajaran / Schedule
expected: Tab terbuka menampilkan: 'Jadwal guru {nama guru} yang tersedia', jadwal seminggu, tombol Riwayat Presensi, tombol Lihat Jadwal

TEST-ID: AGT-2.220
scenario: Cek jadwal seminggu (7 hari)
expected: Menampilkan Senin/Selasa/Rabu/Kamis/Jumat/Sabtu/Minggu (ID) atau Monday-Sunday (EN)

TEST-ID: AGT-2.221
scenario: Cek info per row jadwal
expected: Kelas, Mata Pelajaran, Jurusan, Waktu Mata Pelajaran (Jam Mulai - Jam Selesai), Button Input

TEST-ID: AGT-2.222
scenario: Klik button Input pada row jadwal
expected: Sistem redirect/tampilkan halaman Catatan Pembelajaran untuk mata pelajaran tersebut

TEST-ID: AGT-2.223
scenario: Klik tombol Riwayat Presensi
expected: Sistem menampilkan halaman Riwayat Presensi guru

TEST-ID: AGT-2.224
scenario: Klik tombol Lihat Jadwal
expected: Sistem menampilkan halaman Tabel Jadwal Pelajaran Guru (full view)

TEST-ID: AGT-2.225
scenario: Cek Halaman Tabel Jadwal — Header Informasi
expected: Header menampilkan: Nama Instansi (mis. SMP Cazh Indonesia), Nama Guru, Periode Akademik (Semester + Tahun Pelajaran, mis. 'Semester Ganjil 2026/2027')

TEST-ID: AGT-2.226
scenario: Cek Halaman Tabel Jadwal — Kolom Hari
expected: 7 kolom hari (Senin s/d Minggu)

TEST-ID: AGT-2.227
scenario: Cek Kartu Jadwal (Cell) di tabel
expected: Setiap cell menampilkan: Waktu (mis. '08:00 - 09:00'), Nama Mata Pelajaran, Nama Kelas

TEST-ID: AGT-2.228
scenario: Klik tombol Print di Halaman Tabel Jadwal
expected: Sistem cetak jadwal ke format PDF (atau print ke kertas). Layout tabel 7 hari + info header ter-render

TEST-ID: AGT-2.229
scenario: Guru yang belum ada jadwal — cek tab Jadwal Pelajaran
expected: Empty state. Klarifikasi ke Safki: teks message empty state

TEST-ID: AGT-2.230
scenario: Filter/switch Semester atau Tahun Ajaran di Halaman Tabel Jadwal
expected: Klarifikasi ke Safki: apakah ada filter/switch Semester/TA di halaman jadwal atau default periode aktif

TEST-ID: AGT-2.231
scenario: Setting 'Batasi Data' tidak aktif (default) di menu Pengaturan → Pengguna → Jenis Pengguna → Hak Akses → Akademik → Presensi Mata Pelajaran
expected: Tombol Input tampil di tab Jadwal Pelajaran SEMUA guru sesuai hak akses menu (existing behavior)

TEST-ID: AGT-2.232
scenario: Setting 'Batasi Data' AKTIF: login sebagai Guru A, buka Detail Guru A (diri sendiri)
expected: Tombol Input TAMPIL di tab Jadwal Pelajaran (guru sendiri)

TEST-ID: AGT-2.233
scenario: Setting 'Batasi Data' AKTIF: login sebagai Guru A, buka Detail Guru B (guru lain)
expected: Tombol Input DISEMBUNYIKAN. Jadwal tetap dapat dilihat (read-only). Tombol Lihat Jadwal tetap tersedia.

TEST-ID: AGT-2.234
scenario: Batasi Data aktif: akses input/edit presensi via tombol Riwayat Presensi
expected: Tombol Riwayat Presensi mengikuti aturan sama — hanya untuk guru sendiri (tidak bisa edit presensi guru lain)

TEST-ID: AGT-2.235
scenario: Batasi Data aktif: user role non-guru (mis. admin) buka Detail Guru
expected: Klarifikasi ke Safki: apakah Batasi Data hanya berlaku untuk role Guru login, atau juga affect admin/operator?
