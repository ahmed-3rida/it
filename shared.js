document.addEventListener("DOMContentLoaded", function() {
    let lang = localStorage.getItem('site_lang') || 'ar';
    applyLanguage(lang);
    updateAuthNav();
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
        } else {
            el.innerText = el.getAttribute('data-ar');
        }
    });

    document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
        if(lang === 'en' && el.getAttribute('data-en-placeholder')) {
            el.placeholder = el.getAttribute('data-en-placeholder');
        } else {
            el.placeholder = el.getAttribute('data-ar-placeholder');
        }
    });
}

function updateAuthNav() {
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let lang = localStorage.getItem('site_lang') || 'ar';
    let authLinks = document.querySelectorAll('.nav-links a:last-child');
    
    authLinks.forEach(link => {
        if (isLoggedIn) {
            link.setAttribute('data-ar', 'تسجيل خروج');
            link.setAttribute('data-en', 'Logout');
            link.href = '#';
            link.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.href = '../index.html';
            };
        } else {
            link.setAttribute('data-ar', 'دخول/تسجيل');
            link.setAttribute('data-en', 'Login/Register');
            link.href = '../login_register/index.html';
            link.onclick = null;
        }
        
        if(lang === 'en' && link.getAttribute('data-en')) {
            link.innerText = link.getAttribute('data-en');
        } else {
            link.innerText = link.getAttribute('data-ar');
        }
    });
}

function toggleLikeGlobal(btn) {
    let span = btn.querySelector('.like-count');
    if (!span) return;
    
    let count = parseInt(span.innerText);
    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        btn.style.color = 'var(--text-secondary)';
        span.innerText = count - 1;
    } else {
        btn.classList.add('liked');
        btn.style.color = 'var(--accent)';
        span.innerText = count + 1;
    }
}

function toggleFollow(btn) {
    let lang = localStorage.getItem('site_lang') || 'ar';
    let isAr = (lang === 'ar');
    let followText = isAr ? 'متابعة' : 'Follow';
    let unfollowText = isAr ? 'إلغاء المتابعة' : 'Unfollow';

    if(btn.innerText === followText) {
        btn.innerText = unfollowText; 
        btn.className = 'btn btn-secondary';
    } else {
        btn.innerText = followText; 
        btn.className = 'btn';
    }
}

// دالة لفتح وإغلاق التعليقات في نفس الصفحة
function toggleCommentSection(btn) {
    let post = btn.closest('.post');
    let section = post.querySelector('.comment-section');
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// دالة لإضافة تعليق في نفس الصفحة
function addInlineComment(btn) {
    let section = btn.closest('.comment-section');
    let input = section.querySelector('input');
    let list = section.querySelector('.comments-list');
    let countSpan = btn.closest('.post').querySelector('.comment-count');
    
    if (input.value.trim() === '') return;
    
    let lang = localStorage.getItem('site_lang') || 'ar';
    let youText = (lang === 'en') ? 'You:' : 'أنت:';
    let deleteText = (lang === 'en') ? 'Delete' : 'حذف';
    
    let div = document.createElement('div');
    div.className = 'comment-item';
    div.style = 'background: var(--bg-color); padding: 10px; margin-bottom: 10px; border-radius: 4px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;';
    
    div.innerHTML = `
        <div>
            <strong style="color:var(--accent)" data-ar="أنت:" data-en="You:">${youText}</strong> 
            <span>${input.value}</span>
        </div>
        <button class="btn" style="padding: 2px 8px; font-size: 12px; background: #e74c3c; border: none; color: white;" onclick="deleteInlineComment(this)" data-ar="حذف" data-en="Delete">${deleteText}</button>
    `;
    
    list.prepend(div);
    
    if(countSpan) countSpan.innerText = parseInt(countSpan.innerText) + 1;
    
    input.value = '';
}

// دالة لحذف التعليق
function deleteInlineComment(btn) {
    let countSpan = btn.closest('.post').querySelector('.comment-count');
    btn.closest('.comment-item').remove();
    if(countSpan) countSpan.innerText = parseInt(countSpan.innerText) - 1;
}
