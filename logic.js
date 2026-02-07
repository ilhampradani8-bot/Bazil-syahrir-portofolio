// =========================================
// 1. INISIALISASI (Jalankan saat web dimuat)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Jalankan Animasi (AOS)
    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800, // Kecepatan animasi
                once: true,    // Animasi cuma sekali
                offset: 50     // Jarak scroll
            });
        }
    } catch (e) { console.error("AOS Error:", e); }

    // B. Jalankan Ikon (Lucide)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // C. Set Bahasa Awal (Inggris)
    setLang('en');
});


// =========================================
// 2. FUNGSI GANTI BAHASA (LENGKAP)
// =========================================
function setLang(lang) {
    // Cek apakah kamus bahasa ada (dari content.js)
    if (typeof translations === 'undefined' || !translations[lang]) return;

    // A. Ganti Teks Biasa (Judul, Paragraf, dll)
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.style.opacity = '0'; // Efek kedip
            setTimeout(() => {
                el.innerHTML = translations[lang][key]; 
                el.style.opacity = '1';
            }, 150);
        }
    });

    // B. Ganti PLACEHOLDER Input (Bagian yang Anda tanyakan)
    // Ini mencari elemen yang punya 'data-i18n-placeholder'
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key]; // Ganti teks samarnya
        }
    });

    // C. Update Warna Tombol Bahasa (ENG | BM)
    const btnEn = document.getElementById('btn-en');
    const btnBm = document.getElementById('btn-bm');
    
    if (btnEn && btnBm) {
        const activeClass = "text-accent border-b-2 border-accent"; 
        const inactiveClass = "text-slate-400 hover:text-primary border-b-2 border-transparent";

        if (lang === 'en') {
            btnEn.className = `transition-all duration-300 ${activeClass}`;
            btnBm.className = `transition-all duration-300 ${inactiveClass}`;
        } else {
            btnBm.className = `transition-all duration-300 ${activeClass}`;
            btnEn.className = `transition-all duration-300 ${inactiveClass}`;
        }
    }
}


// =========================================
// 3. FUNGSI CHAT WHATSAPP INTERAKTIF
// =========================================
function sendToWhatsApp() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim(); // Ambil teks dan hapus spasi berlebih
    
    // GANTI NOMOR INI DENGAN NOMOR ANDA (Tanpa +)
    const phoneNumber = "60137131187"; 

    // Cek: Kalau kosong, jangan kirim & kasih peringatan getar
    if (message === "") {
        input.parentElement.classList.add('animate-pulse', 'border-red-400');
        setTimeout(() => {
            input.parentElement.classList.remove('animate-pulse', 'border-red-400');
        }, 500);
        return; // Berhenti di sini
    }

    // Kalau ada isinya, buka WhatsApp
    // encodeURIComponent berguna mengubah spasi jadi %20 agar link tidak error
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Kosongkan kolom chat setelah kirim
    input.value = "";
}

// Fitur Tambahan: Kirim pakai tombol ENTER
const chatInput = document.getElementById('chatInput');
if (chatInput) {
    chatInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Cegah enter bikin baris baru
            sendToWhatsApp();   // Panggil fungsi kirim
        }
    });
}


// =========================================
// 4. FUNGSI MENU MOBILE (Burger Menu)
// =========================================
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    }
}