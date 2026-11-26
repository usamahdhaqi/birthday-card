# Interactive Virtual Birthday Card

Website kartu ulang tahun digital dengan HTML, CSS, dan Vanilla JavaScript.

## Struktur
- `index.html` — struktur halaman
- `style.css` — tema, layout responsif, dan animasi
- `script.js` — konfigurasi personal dan interaksi
- `assets/images/` — foto kenangan (photo1.jpg–photo4.jpg)
- `assets/audio/birthday-music.mp3` — musik latar pilihan

## Kustomisasi
Buka `script.js`, lalu edit objek `CONFIG` di bagian paling atas:
- `recipientName`: nama penerima
- `senderName`: nama pengirim
- `birthDate`: tanggal lahir dengan format `YYYY-MM-DD`
- `celebratedAge`: usia yang dirayakan
- `birthdayMessage`: pesan pada halaman utama
- `letter`: array paragraf surat
- `photos`: daftar path foto dan caption
- `songName` / `audioFile`: nama dan path musik
- `theme`: warna tema dalam format HEX

Letakkan foto dengan nama `photo1.jpg`, `photo2.jpg`, dan seterusnya di `assets/images/`, atau ubah path pada `CONFIG.photos`. Letakkan audio MP3 di `assets/audio/birthday-music.mp3`. File audio tidak disertakan karena harus menggunakan musik yang Anda miliki hak penggunaannya.

## Menjalankan lokal
Buka `index.html` langsung di browser. Untuk pengalaman yang lebih konsisten, jalankan local server:
1. Buka folder proyek di VS Code.
2. Jalankan ekstensi Live Server, lalu klik **Go Live**.
3. Buka URL lokal yang muncul.

## GitHub Pages
1. Buat repository baru di GitHub, misalnya `birthday-card`.
2. Unggah seluruh isi folder proyek (pastikan `index.html` berada di root repository).
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main`, folder `/(root)`, lalu **Save**.
6. Tunggu proses deployment. Situs akan tersedia di `https://USERNAME.github.io/birthday-card/`.

Pastikan foto dan musik ikut diunggah. Gunakan nama file yang sama persis (termasuk huruf besar/kecil). Musik baru diputar setelah pengunjung menekan tombol Play music agar mematuhi kebijakan autoplay browser.
