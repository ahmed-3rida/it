document.addEventListener("DOMContentLoaded", function() {
    let name = localStorage.getItem('username') || 'مستخدم';
    let bio = localStorage.getItem('userBio');
    
    let profileName = document.getElementById('profileName');
    let profileHandle = document.getElementById('profileHandle');
    let profileAvatarInitial = document.getElementById('profileAvatarInitial');
    
    if(profileName) profileName.innerText = name;
    if(profileHandle) profileHandle.innerText = '@' + name.toLowerCase().replace(/\s+/g, '_');
    if(profileAvatarInitial) profileAvatarInitial.innerText = (name.charAt(0).toUpperCase()) || '?';
    
    if(bio) {
        let bioEl = document.getElementById('profileBio');
        if(bioEl) {
            bioEl.innerText = bio;
            bioEl.removeAttribute('data-ar');
            bioEl.removeAttribute('data-en');
        }
    }
    
    // Load recent posts
    let myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
    let postCountStat = document.getElementById('postCountStat');
    if(postCountStat) postCountStat.innerText = myPosts.length;
    
    let recentContainer = document.getElementById('recentPostsContainer');
    if(recentContainer) {
        recentContainer.innerHTML = '';
        let lang = localStorage.getItem('site_lang') || 'ar';
        
        if(myPosts.length === 0) {
            let emptyMsg = document.createElement('p');
            emptyMsg.style.color = 'var(--text-secondary)';
            emptyMsg.innerText = lang === 'en' ? 'No posts yet.' : 'لا توجد منشورات حتى الآن.';
            recentContainer.appendChild(emptyMsg);
        } else {
            let recentPosts = [...myPosts].reverse().slice(0, 5);
            recentPosts.forEach(p => {
                let div = document.createElement('div');
                div.className = 'post';
                div.style.marginBottom = '15px';
                
                let timeText = timeAgo(p.id);
                let mediaHtml = p.media ? `<img src="${p.media}" style="width:100%; border-radius:10px; max-height:200px; object-fit:cover; margin:10px 0;">` : '';
                
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h4 style="margin:0;">${p.title}</h4>
                        <span style="font-size:12px; color:var(--text-secondary);">${timeText}</span>
                    </div>
                    <p style="margin:0; color:var(--text-secondary); font-size:14px;">${p.content}</p>
                    ${mediaHtml}
                `;
                recentContainer.appendChild(div);
            });
        }
    }

    let followBtn = document.getElementById('followBtn');
    if(followBtn) followBtn.style.display = 'none';
});

function toggleFollow() {
    let btn = document.getElementById('followBtn');
    if(btn.innerText === 'متابعة') {
        btn.innerText = 'إلغاء المتابعة';
        btn.style.background = '#7f8c8d';
    } else {
        btn.innerText = 'متابعة';
        btn.style.background = '#ff4500';
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