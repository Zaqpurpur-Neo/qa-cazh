TEST-ID: PGT-6.1
scenario: Isi form Tambah Tag dengan semua field valid (Instansi + Nama Tag + Kode Tag + Tipe Member) → klik Simpan
expected: Toast 'berhasil ditambahkan' muncul, modal tertutup, tag baru muncul di list dengan status default Aktif

TEST-ID: PGT-6.2
scenario: Klik btn 'Tambah Tag' di halaman list
expected: Modal 'Tambah Tag' terbuka dengan field: Instansi, Nama Tag, Kode Tag, Tipe Member — semua kosong

TEST-ID: PGT-6.3
scenario: Isi form → klik btn Batal
expected: Modal tertutup, data tidak tersimpan, sistem kembali ke halaman list tag

TEST-ID: PGT-6.4
scenario: Tambah beberapa tag berbeda (nama & kode) di 1 Instansi yang sama
expected: Semua tag berhasil ditambahkan, tampil sebagai row terpisah di list

TEST-ID: PGT-6.5
scenario: Tambah 2 tag dengan Kode Tag SAMA tapi Instansi BERBEDA
expected: Kedua tag berhasil ditambahkan (uniqueness Kode Tag per-instansi, bukan global)

TEST-ID: PGT-6.6
scenario: Isi field lain tapi tidak pilih Instansi → klik Simpan
expected: Error 'Instansi wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.7
scenario: Kosongkan field Nama Tag → klik Simpan
expected: Error 'Nama Tag wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.8
scenario: Kosongkan field Kode Tag → klik Simpan
expected: Error 'Kode Tag wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.9
scenario: Kosongkan field Tipe Member → klik Simpan
expected: Error 'Tipe Member wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.10
scenario: Klik Simpan tanpa isi field apapun
expected: Error muncul di semua 4 field required, modal tetap terbuka

TEST-ID: PGT-6.11
scenario: Tambah tag dengan Kode Tag yang sudah ada di Instansi yang sama (duplikat)
expected: Sistem tolak duplikat dengan pesan error, data tidak tersimpan, modal tetap terbuka

TEST-ID: PGT-6.12
scenario: Buka dropdown Tipe Member di form Tambah
expected: Dropdown menampilkan 3 opsi: 'Semua', 'Siswa', 'Guru & Staff'

TEST-ID: PGT-6.13
scenario: Buat tag dengan Tipe Member = 'Semua' → buka fitur Data Siswa / Data Guru / Data Staff / Tagihan / Presensi Kegiatan
expected: Tag tersebut muncul di dropdown tag untuk SEMUA tipe member di fitur-fitur tersebut

TEST-ID: PGT-6.14
scenario: Buat tag dengan Tipe Member = 'Siswa' → buka fitur Data Siswa vs fitur Data Guru/Staff
expected: Tag muncul di dropdown tag Data Siswa, TAPI TIDAK muncul di dropdown Data Guru & Staff

TEST-ID: PGT-6.15
scenario: Buat tag dengan Tipe Member = 'Guru & Staff' → buka fitur Data Guru & Staff vs Data Siswa
expected: Tag muncul di dropdown Data Guru & Staff, TAPI TIDAK muncul di dropdown Data Siswa

TEST-ID: PGT-6.16
scenario: Load halaman list Tag
expected: List tampil dengan kolom: Instansi, Nama Tag, Kode Tag, Tipe Member, Status, Dibuat Pada, Aksi

TEST-ID: PGT-6.17
scenario: Cek setiap row di list Tag
expected: Setiap row punya tombol Aksi Edit (pencil icon) & Hapus (trash icon)

TEST-ID: PGT-6.18
scenario: Buka halaman list Tag saat belum ada data tag
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-6.19
scenario: Tambah 2 tag berturut-turut → reload halaman
expected: Default sort: tag terbaru (Dibuat Pada paling baru) tampil di paling atas

TEST-ID: PGT-6.20
scenario: Aktifkan Filter Instansi (pilih 1 instansi)
expected: List filter, menampilkan hanya tag dari instansi yang dipilih

TEST-ID: PGT-6.21
scenario: Aktifkan Filter Status = 'Aktif'
expected: List filter, hanya menampilkan tag dengan status Aktif

TEST-ID: PGT-6.22
scenario: Aktifkan Filter Status = 'Tidak Aktif'
expected: List filter, hanya menampilkan tag dengan status Tidak Aktif

TEST-ID: PGT-6.23
scenario: Aktifkan Filter Status = 'Semua'
expected: List menampilkan semua tag tanpa filter status (Aktif + Tidak Aktif digabung)

TEST-ID: PGT-6.24
scenario: Aktifkan Filter Tipe Member = 'Semua'
expected: List menampilkan tag dengan Tipe Member 'Semua' saja

TEST-ID: PGT-6.25
scenario: Aktifkan Filter Tipe Member = 'Siswa'
expected: List menampilkan tag dengan Tipe Member 'Siswa' saja

TEST-ID: PGT-6.26
scenario: Aktifkan Filter Tipe Member = 'Guru & Staff'
expected: List menampilkan tag dengan Tipe Member 'Guru & Staff' saja

TEST-ID: PGT-6.27
scenario: Aktifkan Filter Instansi + Status + Tipe Member secara bersamaan (kombinasi)
expected: List filter sesuai kombinasi ke-3 filter (AND logic)

TEST-ID: PGT-6.28
scenario: Aktifkan filter → tidak ada hasil yang match
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-6.29
scenario: Ketik Nama Tag di search box
expected: List filter menampilkan row yang match dengan keyword Nama Tag

TEST-ID: PGT-6.30
scenario: Ketik Kode Tag di search box
expected: List menampilkan tag yang Kode Tag-nya match dengan keyword

TEST-ID: PGT-6.31
scenario: Ketik nama Instansi di search box
expected: List menampilkan semua tag dari instansi tersebut (search juga match by Instansi)

TEST-ID: PGT-6.32
scenario: Ketik keyword yang tidak match ('xyz123abc')
expected: Sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-6.33
scenario: Setelah search, clear search box (kosongkan)
expected: List kembali menampilkan semua data (tidak stuck di empty state)

TEST-ID: PGT-6.34
scenario: Klik icon pencil (Edit) di row tag
expected: Modal Edit terbuka dengan data ter-prefill: Instansi, Nama Tag, Kode Tag, Status, Tipe Member

TEST-ID: PGT-6.35
scenario: Ubah Nama Tag ke nilai baru → klik Simpan
expected: Toast 'berhasil diperbarui' muncul, modal tertutup, Nama Tag ter-update di list

TEST-ID: PGT-6.36
scenario: Ubah Kode Tag ke nilai baru (unique) → klik Simpan
expected: Toast success, Kode Tag ter-update di list

TEST-ID: PGT-6.37
scenario: Ubah Tipe Member (misal Semua → Siswa) → klik Simpan
expected: Toast success, Tipe Member ter-update di list

TEST-ID: PGT-6.38
scenario: Ubah Instansi tag ke instansi lain → klik Simpan
expected: Toast success, tag pindah ke instansi baru (visible saat filter by instansi baru)

TEST-ID: PGT-6.39
scenario: Ubah Status dari 'Aktif' ke 'Tidak Aktif' → klik Simpan
expected: Toast success, badge Status berubah jadi 'Tidak Aktif' (abu), row tetap tampil di list

TEST-ID: PGT-6.40
scenario: Ubah Status dari 'Tidak Aktif' ke 'Aktif' → klik Simpan
expected: Toast success, badge Status berubah jadi 'Aktif' (hijau)

TEST-ID: PGT-6.41
scenario: Ubah field di modal Edit → klik Batal
expected: Modal tertutup, perubahan tidak tersimpan, sistem kembali ke list tag

TEST-ID: PGT-6.42
scenario: Kosongkan Nama Tag → klik Simpan
expected: Error 'Nama Tag wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.43
scenario: Kosongkan Kode Tag → klik Simpan
expected: Error 'Kode Tag wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.44
scenario: Kosongkan field Status → klik Simpan
expected: Error 'Status wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.45
scenario: Kosongkan Tipe Member → klik Simpan
expected: Error 'Tipe Member wajib diisi' muncul, tombol Simpan tidak bekerja, modal tetap terbuka

TEST-ID: PGT-6.46
scenario: Ubah Kode Tag jadi kode yang sudah ada di Instansi yang sama (duplikat)
expected: Sistem tolak duplikat dengan pesan error, data tidak tersimpan, modal tetap terbuka

TEST-ID: PGT-6.47
scenario: Set status tag ke 'Aktif' → buka fitur Data Siswa/Guru/Staff/Tagihan/Presensi Kegiatan
expected: Tag tersedia sebagai opsi dropdown di fitur-fitur tersebut sesuai Tipe Member yang di-set

TEST-ID: PGT-6.48
scenario: Set status tag ke 'Tidak Aktif' → buka fitur terkait
expected: Tag tersembunyi dari dropdown pilihan di fitur-fitur tersebut (tidak bisa digunakan)

TEST-ID: PGT-6.49
scenario: Klik Aksi → 'Hapus' di row tag
expected: Popup delete confirmation muncul dengan tombol Hapus (primary) + Batal (secondary)

TEST-ID: PGT-6.50
scenario: Klik btn 'Hapus' di popup konfirmasi
expected: Toast 'berhasil dihapus' muncul, popup tertutup, row hilang dari list tag

TEST-ID: PGT-6.51
scenario: Buka popup Hapus → klik btn 'Batal'
expected: Popup tertutup, tag TIDAK terhapus, sistem kembali ke list tag

TEST-ID: PGT-6.52
scenario: Buka popup Hapus → tekan Esc di keyboard
expected: Popup tertutup, tag TIDAK terhapus

TEST-ID: PGT-6.53
scenario: Search sampai hasil tinggal 1 row → hapus row tersebut
expected: Setelah hapus, sistem menampilkan halaman kosong (empty state UI)

TEST-ID: PGT-6.54
scenario: Hapus tag → buka fitur Data Siswa / Presensi Kegiatan / Membuat Tagihan
expected: Tag yang dihapus tidak tersedia lagi sebagai opsi di fitur-fitur tersebut
