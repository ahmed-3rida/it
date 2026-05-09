// ===== اللغة =====
document.addEventListener("DOMContentLoaded", function() {
    let lang = localStorage.getItem('site_lang') || 'ar';
    applyLanguage(lang);
    updateAuthNav();
    markActiveNav();
    loadUserAvatar();
});

function changeLanguage(lang) {
    localStorage.setItem('site_lang', lang);
    applyLanguage(lang);
    updateAuthNav();
}

function toggleLang(e) {
    if(e) e.preventDefault();
    let currentLang = localStorage.getItem('site_lang') || 'ar';
    let newLang = currentLang === 'ar' ? 'en' : 'ar';
    changeLanguage(newLang);
}

function applyLanguage(lang) {
    if(lang === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
    } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
    }

    // ترجمة النصوص العادية
    document.querySelectorAll('[data-ar]').forEach(el => {
        let text = (lang === 'en' && el.getAttribute('data-en')) ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        if (text) el.innerText = text;
    });

    // ترجمة الـ Placeholders
    document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
        let ph = (lang === 'en' && el.getAttribute('data-en-placeholder')) ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-ar-placeholder');
        if (ph) el.placeholder = ph;
    });

    // ترجمة عنوان الصفحة (Title)
    let titleEl = document.querySelector('title[data-ar]');
    if (titleEl) {
        document.title = (lang === 'en' && titleEl.getAttribute('data-en')) ? titleEl.getAttribute('data-en') : titleEl.getAttribute('data-ar');
    }
}

// ===== Auth في الـ Navbar =====
function updateAuthNav() {
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let lang = localStorage.getItem('site_lang') || 'ar';
    let authLinks = document.querySelectorAll('.auth-nav-link');
    
    authLinks.forEach(link => {
        if (isLoggedIn) {
            link.setAttribute('data-ar', 'تسجيل الخروج');
            link.setAttribute('data-en', 'Logout');
            link.href = '#';
            link.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                localStorage.removeItem('userAvatar');
                showToast(lang === 'ar' ? 'تم تسجيل الخروج' : 'Logged out', 'info');
                setTimeout(() => { window.location.href = '../index.html'; }, 1000);
            };
        } else {
            link.setAttribute('data-ar', 'دخول/تسجيل');
            link.setAttribute('data-en', 'Login/Register');
            link.href = '../login_register/index.html';
            link.onclick = null;
        }
        
        if(lang === 'en' && link.getAttribute('data-en')) {
            link.innerText = link.getAttribute('data-en');
        } else if(link.getAttribute('data-ar')) {
            link.innerText = link.getAttribute('data-ar');
        }
    });
}

// ===== تحديد الرابط النشط في الـ Sidebar =====
function markActiveNav() {
    let currentPath = window.location.pathname;
    document.querySelectorAll('.global-sidebar ul li a').forEach(link => {
        if(link.href && currentPath.includes(link.getAttribute('href').replace('../', ''))) {
            link.classList.add('active-nav');
        }
    });
}

// ===== تحميل avatar المستخدم =====
function loadUserAvatar() {
    let avatarEl = document.getElementById('navUserAvatar');
    if(!avatarEl) return;
    let avatar = localStorage.getItem('userAvatar') || generateAvatar(localStorage.getItem('username') || '?');
    avatarEl.src = avatar;
    avatarEl.style.display = 'block';
}

function generateAvatar(name) {
    // رسم حرف أول على خلفية ملونة
    let canvas = document.createElement('canvas');
    canvas.width = 40; canvas.height = 40;
    let ctx = canvas.getContext('2d');
    let colors = ['#0079d3','#7e57c2','#26a69a','#ef5350','#42a5f5','#66bb6a'];
    let idx = name.charCodeAt(0) % colors.length || 0;
    ctx.fillStyle = colors[idx];
    ctx.fillRect(0,0,40,40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Tajawal, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name.charAt(0).toUpperCase() || '?', 20, 21);
    return canvas.toDataURL();
}

// ===== Toast Notifications =====
function showToast(message, type='success') {
    let existing = document.getElementById('global-toast');
    if(existing) existing.remove();
    
    let toast = document.createElement('div');
    toast.id = 'global-toast';
    let bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
        background: ${bgColor}; color: white; padding: 14px 28px; border-radius: 50px;
        font-family: 'Tajawal', sans-serif; font-size: 15px; font-weight: bold;
        box-shadow: 0 8px 30px rgba(0,0,0,0.4); z-index: 9999;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
        opacity: 0; white-space: nowrap;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ===== حساب الوقت المنقضي (Time Ago) =====
function timeAgo(timestamp) {
    if (!timestamp) return '';
    let lang = localStorage.getItem('site_lang') || 'ar';
    let now = Date.now();
    let seconds = Math.floor((now - timestamp) / 1000);
    
    if (seconds < 60) return lang === 'en' ? 'Just now' : 'الآن';
    
    let intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    let labels = {
        ar: { year: 'سنة', month: 'شهر', week: 'أسبوع', day: 'يوم', hour: 'ساعة', minute: 'دقيقة', ago: 'منذ' },
        en: { year: 'year', month: 'month', week: 'week', day: 'day', hour: 'hour', minute: 'minute', ago: 'ago' }
    };
    
    for (let key in intervals) {
        let count = Math.floor(seconds / intervals[key]);
        if (count >= 1) {
            let label = labels[lang][key];
            if (lang === 'en') {
                return `${count} ${label}${count > 1 ? 's' : ''} ${labels[lang].ago}`;
            } else {
                return `${labels[lang].ago} ${count} ${label}`;
            }
        }
    }
    return lang === 'en' ? 'Just now' : 'الآن';
}

// ===== CSS Animation (inject once) =====
if(!document.getElementById('shared-anim-style')) {
    let style = document.createElement('style');
    style.id = 'shared-anim-style';
    style.textContent = `
        @keyframes slideDown {
            from { opacity:0; transform: translateY(-8px); }
            to   { opacity:1; transform: translateY(0); }
        }
        .global-sidebar ul li a.active-nav {
            background: rgba(0, 121, 211, 0.15);
            color: var(--accent);
            border-right: 3px solid var(--accent);
        }
        html[dir="ltr"] .global-sidebar ul li a.active-nav {
            border-right: none;
            border-left: 3px solid var(--accent);
        }
        .post { transition: box-shadow 0.2s; }
        .post:hover { box-shadow: 0 4px 20px rgba(0,121,211,0.12); }
        .action-btn { transition: color 0.2s, transform 0.2s; }
        .action-btn:hover { transform: scale(1.05); }
        .btn { transition: filter 0.2s, transform 0.15s; }
        .btn:active { transform: scale(0.97); }
        .global-sidebar ul li a { transition: background 0.2s, color 0.2s; }
    `;
    document.head.appendChild(style);
}
