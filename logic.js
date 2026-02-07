// =========================================
// 1. INISIALISASI (Jalankan saat web dimuat)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Jalankan Animasi (AOS)
    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800, 
                once: true,    
                offset: 50     
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
    if (typeof translations === 'undefined' || !translations[lang]) {
        console.error("Kamus bahasa tidak ditemukan!");
        return;
    }

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

    // B. Ganti PLACEHOLDER Input (Untuk Chat)
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key]; 
        }
    });

    // C. Update Warna Tombol Bahasa (ENG | BM)
    const btnEn = document.getElementById('btn-en');
    const btnBm = document.getElementById('btn-bm');
    
    // Style: Aktif (Emas) vs Mati (Abu)
    const activeClass = "text-accent border-b-2 border-accent scale-110"; 
    const inactiveClass = "text-slate-400 hover:text-primary border-b-2 border-transparent hover:scale-105";

    if (btnEn && btnBm) {
        // Reset kelas dulu biar bersih
        btnEn.className = `transition-all duration-300 font-bold ${lang === 'en' ? activeClass : inactiveClass}`;
        btnBm.className = `transition-all duration-300 font-bold ${lang === 'bm' ? activeClass : inactiveClass}`;
    }
}


// =========================================
// 3. FUNGSI CHAT WHATSAPP
// =========================================
function sendToWhatsApp() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    const phoneNumber = "60137131187"; // Nomor Anda

    if (message === "") {
        input.parentElement.classList.add('animate-pulse', 'border-red-400');
        setTimeout(() => {
            input.parentElement.classList.remove('animate-pulse', 'border-red-400');
        }, 500);
        return;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    input.value = "";
}

// Enter untuk kirim
const chatInput = document.getElementById('chatInput');
if (chatInput) {
    chatInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendToWhatsApp();
        }
    });
}


// =========================================
// 4. FUNGSI MENU MOBILE
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