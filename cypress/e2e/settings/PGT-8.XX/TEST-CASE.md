TEST-ID: PGT-8.1
scenario: Load halaman list Jenis Pengguna
expected: List tampil dengan kolom: Nama Jenis Pengguna, Total Pengguna Pada Jenis Ini, List Hak Akses, Btn Lihat Pengguna, Btn Edit

TEST-ID: PGT-8.2
scenario: Cek default jenis pengguna yang tersedia saat pertama kali
expected: Sistem otomatis menyediakan 3 jenis pengguna default: 'Super Admin' (Admin), 'Operator', 'Guru'

TEST-ID: PGT-8.3
scenario: Cek kolom 'Total Pengguna Pada Jenis Ini' di setiap row
expected: Menampilkan angka jumlah akun pengguna yang assigned ke jenis pengguna tersebut (accurate count)

TEST-ID: PGT-8.4
scenario: Cek kolom 'List Hak Akses' di setiap row
expected: Menampilkan seluruh hak akses yang diberikan pada jenis pengguna tersebut (readable summary)

TEST-ID: PGT-8.5
scenario: Klik btn 'Lihat Pengguna' di row (misal row 'Guru')
expected: Sistem redirect ke halaman List Akun Pengguna dengan filter role aktif = 'Guru' (auto-filter sesuai jenis yang diklik)

TEST-ID: PGT-8.6
scenario: Klik btn 'Edit' di row
expected: Sistem redirect ke halaman Edit Jenis Pengguna dengan data ter-prefill

TEST-ID: PGT-8.7
scenario: Klik btn 'Tambah Jenis Pengguna' di halaman list
expected: Sistem redirect ke halaman Tambah Jenis Pengguna dengan form kosong

TEST-ID: PGT-8.8
scenario: Cek Jenis Pengguna 'Super Admin' — verifikasi semua hak akses ter-ceklist
expected: Semua checkbox Hak Akses di semua 7 kategori (Anggota/Administrasi/Keuangan/Kartu/Akademik/Kesiswaan/Pengaturan) ter-check by default

TEST-ID: PGT-8.9
scenario: Isi form Tambah dengan Nama valid + centang beberapa Hak Akses → klik Simpan
expected: Toast success muncul, jenis pengguna baru tersimpan, muncul di list dengan Total Pengguna = 0

TEST-ID: PGT-8.10
scenario: Klik btn 'Tambah Jenis Pengguna' di list
expected: Halaman Tambah Jenis Pengguna terbuka dengan field: Nama Jenis Pengguna (kosong) + Hak Akses (tree 7 kategori, semua checkbox uncheck)

TEST-ID: PGT-8.11
scenario: Isi form → klik btn Batal
expected: Sistem kembali ke halaman list Jenis Pengguna, data tidak tersimpan

TEST-ID: PGT-8.12
scenario: Kosongkan Nama Jenis Pengguna (Hak Akses tetap ada yang di-check) → klik Simpan
expected: Error 'Nama Jenis Pengguna wajib diisi' muncul, tombol Simpan tidak bekerja

TEST-ID: PGT-8.13
scenario: Isi Nama tapi tidak centang Hak Akses apapun → klik Simpan
expected: Error 'Hak Akses wajib diisi' muncul, tombol Simpan tidak bekerja

TEST-ID: PGT-8.14
scenario: Klik Simpan tanpa isi field apapun
expected: Error muncul di kedua field required (Nama + Hak Akses), tombol Simpan tidak bekerja

TEST-ID: PGT-8.15
scenario: Verifikasi struktur Hak Akses di form
expected: Ada 7 kategori parent: Anggota, Administrasi, Keuangan, Kartu, Akademik, Kesiswaan, Pengaturan — masing-masing punya sub-modul dengan checkbox Semua/Lihat/Tambah/Ubah/Hapus

TEST-ID: PGT-8.16
scenario: Klik checkbox 'Semua' di sub-modul (misal Siswa)
expected: Semua sub-checkbox (Lihat, Tambah, Ubah) di sub-modul tersebut auto-terceklist

TEST-ID: PGT-8.17
scenario: Uncheck 'Semua' di sub-modul yang tadinya full-checked
expected: Semua sub-checkbox (Lihat, Tambah, Ubah) auto-terhapus (uncheck cascade)

TEST-ID: PGT-8.18
scenario: Centang hanya 'Lihat' di sub-modul (tanpa 'Semua')
expected: Hanya checkbox Lihat yang ter-check, 'Semua' otomatis unchecked (karena belum semua sub ter-check)

TEST-ID: PGT-8.19
scenario: Centang special action 'Batasi Data' di sub-modul 'Presensi Mata Pelajaran'
expected: Checkbox Batasi Data bisa di-toggle, default state = tidak aktif (unchecked)

TEST-ID: PGT-8.20
scenario: Centang special action 'Batasi Data' di sub-modul 'Tugas'
expected: Checkbox Batasi Data bisa di-toggle, default state = tidak aktif (unchecked)

TEST-ID: PGT-8.21
scenario: Cross-feature: Buat jenis pengguna dengan hak Lihat only untuk 'Siswa' → assign akun ke jenis ini → login sebagai akun tersebut
expected: User hanya bisa Lihat data siswa, tombol Tambah/Ubah/Hapus tidak tampil atau disabled

TEST-ID: PGT-8.22
scenario: Cross-feature: Login pakai akun dengan hak terbatas → coba akses fitur yang TIDAK di-check
expected: Fitur tersebut tidak tampil di menu / halaman menunjukkan 'Anda tidak punya akses'

TEST-ID: PGT-8.23
scenario: Cross-feature: Aktifkan 'Batasi Data' di Presensi Mata Pelajaran → login sebagai guru dengan jenis pengguna tersebut
expected: Guru hanya bisa lihat & input presensi pada jadwal mengajarnya sendiri, tidak bisa akses jadwal guru lain

TEST-ID: PGT-8.24
scenario: Cross-feature: Aktifkan 'Batasi Data' di Tugas → login sebagai guru dengan jenis pengguna tersebut
expected: Guru hanya bisa lihat/buat/ubah/hapus tugas buatan sendiri, field Guru otomatis terisi & terkunci

TEST-ID: PGT-8.25
scenario: Klik btn 'Edit' di row jenis pengguna
expected: Halaman Edit terbuka dengan Nama + Hak Akses ter-prefill sesuai data existing

TEST-ID: PGT-8.26
scenario: Ubah Nama Jenis Pengguna → klik Simpan
expected: Toast success muncul, nama ter-update di list Jenis Pengguna

TEST-ID: PGT-8.27
scenario: Ubah Hak Akses (tambah check ke sub-modul baru) → klik Simpan
expected: Toast success, kolom List Hak Akses di list ter-update dengan tambahan hak akses baru

TEST-ID: PGT-8.28
scenario: Ubah Hak Akses (uncheck sub-modul yang sebelumnya aktif) → klik Simpan
expected: Toast success, hak akses ter-cabut, kolom List Hak Akses ter-update

TEST-ID: PGT-8.29
scenario: Klik btn Batal di halaman Edit
expected: Sistem kembali ke halaman list, perubahan tidak tersimpan

TEST-ID: PGT-8.30
scenario: Kosongkan Nama Jenis Pengguna → klik Simpan
expected: Error 'Nama Jenis Pengguna wajib diisi' muncul, tombol Simpan tidak bekerja

TEST-ID: PGT-8.31
scenario: Uncheck SEMUA Hak Akses → klik Simpan
expected: Error 'Hak Akses wajib diisi' muncul, tombol Simpan tidak bekerja (minimal harus ada 1 hak akses)

TEST-ID: PGT-8.32
scenario: Buka Edit untuk 'Super Admin' → cek state Hak Akses
expected: Semua checkbox di 7 kategori Hak Akses sudah ter-ceklist secara default (Super Admin punya full access)

TEST-ID: PGT-8.33
scenario: Cross-feature: Edit jenis pengguna existing (ubah hak akses) → login pakai akun yang assigned ke jenis tersebut
expected: Perubahan hak akses langsung ter-apply ke akun (mungkin butuh re-login sekali untuk refresh session)

TEST-ID: PGT-8.34
scenario: Cross-feature: Toggle 'Batasi Data' pada Rekap Guru Presensi Mata Pelajaran → login sebagai guru
expected: Rekap hanya menampilkan presensi mata pelajaran milik guru yang sedang login, data guru lain tersembunyi di daftar/pencarian/filter

TEST-ID: PGT-8.35
scenario: Verifikasi Super Admin auto-inherit fitur baru
expected: Setiap ada fitur baru di Cards School, Super Admin otomatis dapat hak akses penuh tanpa perlu edit manual

TEST-ID: PGT-8.36
scenario: Cross-feature: Special action 'Pengajuan Aktivasi' di sub-modul Alumni
expected: Aksi 'Jadikan Siswa/Guru Aktif' di list Alumni hanya tampil kalau checkbox 'Pengajuan Aktivasi' di-check
