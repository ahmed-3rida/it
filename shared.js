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

    document.querySelectorAll('[data-ar]').forEach(el => {
        if(lang === 'en' && el.getAttribute('data-en')) {
            el.innerText = el.getAttribute('data-en');
        } else if(el.getAttribute('data-ar')) {
            el.innerText = el.getAttribute('data-ar');
        }
    });

    document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
        if(lang === 'en' && el.getAttribute('data-en-placeholder')) {
            el.placeholder = el.getAttribute('data-en-placeholder');
        } else if(el.getAttribute('data-ar-placeholder')) {
            el.placeholder = el.getAttribute('data-ar-placeholder');
        }
    });
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

// ===== Like =====
function toggleLikeGlobal(btn) {
    let span = btn.querySelector('.like-count');
    if (!span) return;
    
    let post = btn.closest('.post');
    let titleEl = post.querySelector('.accent-title') || post.querySelector('h2');
    let title = titleEl ? titleEl.innerText : 'منشور';
    let postId = post.getAttribute('data-post-id') || title;
    
    let count = parseInt(span.innerText);
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');

    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        btn.style.color = '';
        btn.style.transform = '';
        span.innerText = count - 1;
        likedPosts = likedPosts.filter(p => p.id !== postId);
    } else {
        btn.classList.add('liked');
        btn.style.color = 'var(--accent)';
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => { btn.style.transform = ''; }, 200);
        span.innerText = count + 1;
        if (!likedPosts.find(p => p.id === postId)) {
            likedPosts.push({ id: postId, title: title });
        }
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
}

// ===== Save =====
function toggleSaveGlobal(btn) {
    let post = btn.closest('.post');
    let titleEl = post.querySelector('.accent-title') || post.querySelector('h2');
    let title = titleEl ? titleEl.innerText : 'منشور';
    let postId = post.getAttribute('data-post-id') || title;

    let savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    let isSaved = btn.classList.contains('saved');
    let lang = localStorage.getItem('site_lang') || 'ar';

    if (isSaved) {
        btn.classList.remove('saved');
        btn.style.color = '';
        savedPosts = savedPosts.filter(p => p.id !== postId);
        showToast(lang === 'ar' ? 'تمت الإزالة من المحفوظات' : 'Removed from saved', 'info');
    } else {
        btn.classList.add('saved');
        btn.style.color = 'var(--accent)';
        if (!savedPosts.find(p => p.id === postId)) {
            savedPosts.push({ id: postId, title: title });
        }
        showToast(lang === 'ar' ? 'تم الحفظ!' : 'Saved!', 'success');
    }
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
}

// ===== Follow =====
function toggleFollow(btn) {
    let lang = localStorage.getItem('site_lang') || 'ar';
    let isAr = (lang === 'ar');
    let followTextAr = '+ متابعة';
    let followTextEn = '+ Follow';
    let unfollowTextAr = 'إلغاء المتابعة';
    let unfollowTextEn = 'Unfollow';

    let currentText = btn.innerText.trim();

    if(currentText === followTextAr || currentText === followTextEn) {
        btn.innerText = isAr ? unfollowTextAr : unfollowTextEn; 
        btn.setAttribute('data-ar', unfollowTextAr);
        btn.setAttribute('data-en', unfollowTextEn);
        btn.classList.remove('btn-secondary');
        showToast(isAr ? 'تمت المتابعة!' : 'Followed!', 'success');
    } else {
        btn.innerText = isAr ? followTextAr : followTextEn; 
        btn.setAttribute('data-ar', followTextAr);
        btn.setAttribute('data-en', followTextEn);
        btn.classList.add('btn-secondary');
        showToast(isAr ? 'تم إلغاء المتابعة' : 'Unfollowed', 'info');
    }
}

// ===== Comments =====
function toggleCommentSection(btn) {
    let post = btn.closest('.post');
    let section = post.querySelector('.comment-section');
    let input = section ? section.querySelector('input[type="text"]') : null;
    
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        section.style.animation = 'slideDown 0.3s ease';
        if(input) setTimeout(() => input.focus(), 100);
    } else {
        section.style.display = 'none';
    }
}

function addInlineComment(btn) {
    let section = btn.closest('.comment-section');
    let input = section.querySelector('input[type="text"]');
    let list = section.querySelector('.comments-list');
    let countSpan = btn.closest('.post').querySelector('.comment-count');
    
    if (!input || input.value.trim() === '') return;
    
    let lang = localStorage.getItem('site_lang') || 'ar';
    let youText = (lang === 'en') ? 'You' : 'أنت';
    let deleteText = (lang === 'en') ? 'Delete' : 'حذف';
    let username = localStorage.getItem('username') || youText;
    
    let div = document.createElement('div');
    div.className = 'comment-item';
    div.style.cssText = 'background: var(--bg-color); padding: 10px 14px; margin-bottom: 10px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; animation: slideDown 0.2s ease;';
    
    div.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:32px; height:32px; border-radius:50%; background:var(--accent); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:bold; color:white; flex-shrink:0;">
                ${(username.charAt(0) || '?').toUpperCase()}
            </div>
            <div>
                <strong style="color:var(--accent); font-size:13px;">${username}</strong>
                <p style="margin:2px 0 0; font-size:14px;">${input.value}</p>
            </div>
        </div>
        <button class="btn" style="padding: 4px 10px; font-size: 12px; background: rgba(231,76,60,0.2); color:#ef4444; border:1px solid rgba(231,76,60,0.3);" onclick="deleteInlineComment(this)">${deleteText}</button>
    `;
    
    list.prepend(div);
    if(countSpan) countSpan.innerText = parseInt(countSpan.innerText) + 1;
    input.value = '';
    input.focus();
}

function deleteInlineComment(btn) {
    let post = btn.closest('.post');
    let countSpan = post ? post.querySelector('.comment-count') : null;
    let item = btn.closest('.comment-item');
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.2s';
    setTimeout(() => {
        item.remove();
        if(countSpan) {
            let c = parseInt(countSpan.innerText);
            countSpan.innerText = Math.max(0, c - 1);
        }
    }, 200);
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
