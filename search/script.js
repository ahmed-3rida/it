function filterUsers() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('user-card');
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].innerText.toLowerCase();
        if (name.includes(input)) {
            cards[i].style.display = 'flex';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

function filterUsers() {
                    let input = document.getElementById('searchInput').value.toLowerCase();
                    let cards = document.getElementsByClassName('user-card');
                    for(let card of cards) {
                        if(card.innerText.toLowerCase().includes(input)) card.style.display = 'flex';
                        else card.style.display = 'none';
                    }
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