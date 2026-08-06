TEST-ID: PGT-7.1
scenario: Isi form Tambah Mata Pelajaran dengan semua field (Instansi + Nama MP + Kode) → klik Simpan
expected: Toast 'berhasil ditambahkan' muncul, modal tertutup, mata pelajaran baru muncul di list dengan status default Aktif

TEST-ID: PGT-7.2
scenario: Isi form tanpa Kode (Instansi + Nama MP saja, Kode dikosongkan) → klik Simpan
expected: Data berhasil disimpan, sistem auto-generate Kode secara otomatis, Kode ter-generate muncul di list

TEST-ID: PGT-7.3
scenario: Klik btn 'Tambah Mata Pelajaran' di halaman list
expected: Modal 'Tambah Mata Pelajaran' terbuka dengan field: Instansi, Nama MP, Kode — semua kosong

TEST-ID: PGT-7.4
scenario: Isi form → klik btn Batal
expected: Modal tertutup, data tidak tersimpan, sistem kembali ke halaman list mata pelajaran

TEST-ID: PGT-7.5
scenario: Tambah beberapa mata pelajaran berbeda di 1 Instansi yang sama (misal Matematika, IPA, IPS)
expected: Semua mata pelajaran berhasil ditambahkan, tampil sebagai row terpisah di list

TEST-ID: PGT-7.6
scenario: Tambah 2 mata pelajaran dengan Nama SAMA tapi Instansi BERBEDA (misal 'Matematika' di SDIT + di Sekolah Alam)
expected: Kedua mata pelajaran berhasil ditambahkan (uniqueness per-instansi, bukan global)

TEST-ID: PGT-7.7
scenario: Isi Nama MP tapi tidak pilih Instansi → klik Simpan
expected: Error 'Instansi wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-7.8
scenario: Pilih Instansi tapi kosongkan Nama Mata Pelajaran → klik Simpan
expected: Error 'Nama Mata Pelajaran wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-7.9
scenario: Klik Simpan tanpa isi field required apapun
expected: Error muncul di kedua field required (Instansi + Nama MP), modal tetap terbuka

TEST-ID: PGT-7.10
scenario: Tambah mata pelajaran dengan nama & instansi yang sudah ada (duplikat)
expected: Sistem tolak duplikat dengan pesan error, data tidak tersimpan, modal tetap terbuka

TEST-ID: PGT-7.11
scenario: Isi Nama MP dengan spasi saja (whitespace only) → klik Simpan
expected: Sistem trim whitespace lalu treat sebagai kosong, error 'Nama Mata Pelajaran wajib diisi' muncul

TEST-ID: PGT-7.12
scenario: Input Nama MP dengan spasi di awal & akhir (misal '  Matematika  ') → klik Simpan
expected: Data disimpan sebagai 'Matematika' (spasi tepi ter-trim otomatis)

TEST-ID: PGT-7.13
scenario: Input Nama MP sangat panjang (>255 karakter) → klik Simpan
expected: Sistem batasi max length atau tolak dengan error, tidak overflow di UI list

TEST-ID: PGT-7.14
scenario: Load halaman list Mata Pelajaran
expected: List tampil dengan kolom: Instansi, Nama Mata Pelajaran, Kode, Status, Dibuat Pada, Aksi

TEST-ID: PGT-7.15
scenario: Cek setiap row di list Mata Pelajaran
expected: Setiap row punya tombol Aksi Edit (pencil icon) & Hapus (trash icon)

TEST-ID: PGT-7.16
scenario: Buka halaman list Mata Pelajaran saat belum ada data
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-7.17
scenario: Tambah 2 mata pelajaran berturut-turut → reload halaman
expected: Default sort: mata pelajaran terbaru (Dibuat Pada paling baru) tampil di paling atas

TEST-ID: PGT-7.18
scenario: Aktifkan Filter Instansi (pilih 1 instansi)
expected: List filter, menampilkan hanya mata pelajaran dari instansi yang dipilih

TEST-ID: PGT-7.19
scenario: Aktifkan Filter Status = 'Aktif'
expected: List filter, hanya menampilkan mata pelajaran dengan status Aktif

TEST-ID: PGT-7.20
scenario: Aktifkan Filter Status = 'Tidak Aktif'
expected: List filter, hanya menampilkan mata pelajaran dengan status Tidak Aktif

TEST-ID: PGT-7.21
scenario: Aktifkan Filter Status = 'Semua'
expected: List menampilkan semua mata pelajaran tanpa filter status (Aktif + Tidak Aktif digabung)

TEST-ID: PGT-7.22
scenario: Aktifkan Filter Instansi + Filter Status secara bersamaan (kombinasi)
expected: List filter sesuai kombinasi kedua filter

TEST-ID: PGT-7.23
scenario: Aktifkan filter → tidak ada hasil yang match
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-7.24
scenario: Ketik Nama Mata Pelajaran di search box (misal 'Matematika')
expected: List filter menampilkan row yang match dengan keyword Nama MP

TEST-ID: PGT-7.25
scenario: Ketik Kode Mata Pelajaran di search box
expected: List menampilkan mata pelajaran yang Kode-nya match dengan keyword

TEST-ID: PGT-7.26
scenario: Ketik nama Instansi di search box
expected: List menampilkan semua mata pelajaran dari instansi tersebut (search juga match by Instansi)

TEST-ID: PGT-7.27
scenario: Ketik keyword yang tidak match ('xyz123abc')
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-7.28
scenario: Setelah search, clear search box (kosongkan)
expected: List kembali menampilkan semua data (tidak stuck di empty state)

TEST-ID: PGT-7.29
scenario: Klik icon pencil (Edit) di row mata pelajaran
expected: Modal Edit terbuka dengan data ter-prefill: Instansi, Nama MP, Kode, Status (Aktif/Tidak Aktif)

TEST-ID: PGT-7.30
scenario: Ubah Nama Mata Pelajaran ke nilai baru → klik Simpan
expected: Toast 'berhasil diperbarui' muncul, modal tertutup, nama ter-update di list

TEST-ID: PGT-7.31
scenario: Ubah Kode Mata Pelajaran ke nilai baru → klik Simpan
expected: Toast success, Kode ter-update di list

TEST-ID: PGT-7.32
scenario: Kosongkan field Kode di modal Edit → klik Simpan
expected: Data berhasil disimpan, sistem auto-generate Kode secara otomatis (Kode baru muncul di list)

TEST-ID: PGT-7.33
scenario: Ubah Status dari 'Aktif' ke 'Tidak Aktif' → klik Simpan
expected: Toast success, badge Status berubah jadi 'Tidak Aktif' (abu), row tetap tampil di list

TEST-ID: PGT-7.34
scenario: Ubah Status dari 'Tidak Aktif' ke 'Aktif' → klik Simpan
expected: Toast success, badge Status berubah jadi 'Aktif' (hijau)

TEST-ID: PGT-7.35
scenario: Ubah Instansi mata pelajaran ke instansi lain → klik Simpan
expected: Toast success, mata pelajaran pindah ke instansi baru (visible saat filter by instansi baru)

TEST-ID: PGT-7.36
scenario: Ubah field di modal Edit → klik Batal
expected: Modal tertutup, perubahan tidak tersimpan, sistem kembali ke list mata pelajaran

TEST-ID: PGT-7.37
scenario: Kosongkan Nama Mata Pelajaran di modal Edit → klik Simpan
expected: Error 'Nama Mata Pelajaran wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-7.38
scenario: Kosongkan field Status di modal Edit → klik Simpan
expected: Error 'Status wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-7.39
scenario: Ubah Nama Mata Pelajaran jadi nama yang sudah ada di Instansi yang sama (duplikat)
expected: Sistem tolak duplikat dengan pesan error, data tidak tersimpan, modal tetap terbuka

TEST-ID: PGT-7.40
scenario: Set status mata pelajaran ke 'Aktif' → buka fitur Jadwal Pelajaran / Tugas / Presensi Mata Pelajaran
expected: Mata pelajaran tersedia sebagai opsi dropdown di fitur-fitur tersebut (bisa digunakan)

TEST-ID: PGT-7.41
scenario: Set status mata pelajaran ke 'Tidak Aktif' → buka fitur Jadwal Pelajaran / Tugas / Presensi Mata Pelajaran
expected: Mata pelajaran tersembunyi dari dropdown pilihan di fitur-fitur tersebut (tidak bisa digunakan)

TEST-ID: PGT-7.42
scenario: Klik Aksi → 'Hapus' di row mata pelajaran
expected: Popup delete confirmation muncul dengan tombol Hapus (primary) + Batal (secondary)

TEST-ID: PGT-7.43
scenario: Klik btn 'Hapus' di popup konfirmasi
expected: Toast 'berhasil dihapus' muncul, popup tertutup, row hilang dari list mata pelajaran

TEST-ID: PGT-7.44
scenario: Buka popup Hapus → klik btn 'Batal'
expected: Popup tertutup, mata pelajaran TIDAK terhapus, sistem kembali ke list

TEST-ID: PGT-7.45
scenario: Buka popup Hapus → tekan Esc di keyboard
expected: Popup tertutup, mata pelajaran TIDAK terhapus

TEST-ID: PGT-7.46
scenario: Search sampai hasil tinggal 1 row → hapus row tersebut
expected: Setelah hapus, sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-7.47
scenario: Hapus mata pelajaran → buka fitur Jadwal Pelajaran / Tugas / Presensi Mata Pelajaran
expected: Mata pelajaran yang dihapus tidak tersedia lagi sebagai opsi di fitur-fitur tersebut
