document.addEventListener("DOMContentLoaded", function() {
    applyTheme();
    
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

// ===== الوضع الصباحي والمسائي (Dark/Light Mode) =====
function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('site_theme', isLight ? 'light' : 'dark');
}

function applyTheme() {
    const savedTheme = localStorage.getItem('site_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
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
        if (!likedPosts.find(p => p.id === postId)) likedPosts.push({ id: postId, title: title });
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
        if (!savedPosts.find(p => p.id === postId)) savedPosts.push({ id: postId, title: title });
        showToast(lang === 'ar' ? 'تم الحفظ!' : 'Saved!', 'success');
    }
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
}

// ===== Follow =====
function toggleFollow(btn) {
    let lang = localStorage.getItem('site_lang') || 'ar';
    let isAr = (lang === 'ar');
    let followTextAr = '+ متابعة', followTextEn = '+ Follow';
    let unfollowTextAr = 'إلغاء المتابعة', unfollowTextEn = 'Unfollow';
    let currentText = btn.innerText.trim();
    if (currentText === followTextAr || currentText === followTextEn) {
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
        if (input) setTimeout(() => input.focus(), 100);
    } else {
        section.style.display = 'none';
    }
}

function addInlineComment(btn) {
    let post = btn.closest('.post');
    let postId = post ? post.getAttribute('data-post-id') : null;
    let section = post.querySelector('.comment-section');
    let input = section.querySelector('input[type="text"]');
    let list = section.querySelector('.comments-list');
    let countSpan = post.querySelector('.comment-count');
    if (!input || input.value.trim() === '') return;
    let lang = localStorage.getItem('site_lang') || 'ar';
    let username = localStorage.getItem('username') || (lang === 'en' ? 'You' : 'أنت');
    let newComment = { id: Date.now(), author: username, text: input.value.trim() };
    if (postId) {
        let allComments = JSON.parse(localStorage.getItem('allComments') || '{}');
        if (!allComments[postId]) allComments[postId] = [];
        allComments[postId].push(newComment);
        localStorage.setItem('allComments', JSON.stringify(allComments));
        if (countSpan) countSpan.innerText = allComments[postId].length;
    } else {
        if (countSpan) countSpan.innerText = parseInt(countSpan.innerText) + 1;
    }
    renderSingleComment(list, newComment, lang);
    input.value = '';
    input.focus();
}

function renderSingleComment(container, comment, lang) {
    let deleteText = (lang === 'en') ? 'Delete' : 'حذف';
    let div = document.createElement('div');
    div.className = 'comment-item';
    div.setAttribute('data-comment-id', comment.id);
    div.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:32px; height:32px; border-radius:50%; background:var(--accent); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:bold; color:white; flex-shrink:0;">
                ${(comment.author.charAt(0) || '?').toUpperCase()}
            </div>
            <div>
                <strong style="color:var(--accent); font-size:13px;">${comment.author}</strong>
                <p style="margin:2px 0 0; font-size:14px;">${comment.text}</p>
            </div>
        </div>
        <button class="btn" style="padding: 4px 10px; font-size: 12px; background: rgba(231,76,60,0.2); color:#ef4444; border:1px solid rgba(231,76,60,0.3);" onclick="deleteInlineComment(this)">${deleteText}</button>
    `;
    container.prepend(div);
}

function deleteInlineComment(btn) {
    let post = btn.closest('.post');
    let postId = post ? post.getAttribute('data-post-id') : null;
    let commentItem = btn.closest('.comment-item');
    let commentId = commentItem.getAttribute('data-comment-id');
    let countSpan = post ? post.querySelector('.comment-count') : null;
    if (postId) {
        let allComments = JSON.parse(localStorage.getItem('allComments') || '{}');
        if (allComments[postId]) {
            allComments[postId] = allComments[postId].filter(c => String(c.id) !== String(commentId));
            localStorage.setItem('allComments', JSON.stringify(allComments));
            if (countSpan) countSpan.innerText = allComments[postId].length;
        }
    } else {
        if (countSpan) countSpan.innerText = Math.max(0, parseInt(countSpan.innerText) - 1);
    }
    commentItem.style.opacity = '0';
    commentItem.style.transition = 'opacity 0.2s';
    setTimeout(() => commentItem.remove(), 200);
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
