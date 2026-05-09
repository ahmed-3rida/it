    document.addEventListener("DOMContentLoaded", function() {
        let name = localStorage.getItem('username') || '';
        let avatarEl = document.getElementById('homeUserAvatar');
        if(name && avatarEl) {
            avatarEl.innerText = name.charAt(0).toUpperCase();
        }

        // Load user posts
        let myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        let mainContent = document.querySelector('.main-content');
        let welcomeBar = document.querySelector('.container-box');
        
        let urlParams = new URLSearchParams(window.location.search);
        let currentCategory = urlParams.get('category');
        
        // Hide static posts if viewing a specific category
        if (currentCategory) {
            document.querySelectorAll('.post').forEach(p => p.style.display = 'none');
            // Show a header indicating the category
            let catHeader = document.createElement('h2');
            catHeader.className = 'accent-title';
            catHeader.style.marginBottom = '20px';
            catHeader.innerText = 'القسم: ' + currentCategory;
            welcomeBar.insertAdjacentElement('afterend', catHeader);
            welcomeBar = catHeader; // Insert dynamic posts after this header
            
            myPosts = myPosts.filter(p => p.category === currentCategory);
        }
        
        myPosts.forEach(post => {
            let div = document.createElement('div');
            div.className = 'post';
            div.setAttribute('data-post-id', post.id);
            let timeText = localStorage.getItem('site_lang') === 'en' ? 'Just now' : 'الآن';
            
            // Use post.author if available, else current logged in user, else "زائر" (Visitor)
            let defaultName = localStorage.getItem('site_lang') === 'en' ? 'Visitor' : 'زائر';
            let uName = post.author || name || defaultName;
            let firstLetter = uName.charAt(0).toUpperCase();
            
            div.innerHTML = `
                <div class="post-header">
                    <div class="left">
                        <div class="avatar" style="background:var(--accent);">${firstLetter}</div>
                        <div>
                            <div class="username">${uName}</div>
                            <div class="time">${timeText}</div>
                        </div>
                    </div>
                </div>
                <h2 class="accent-title" style="font-size:18px; margin-bottom:8px;">${post.title}</h2>
                <p style="color:var(--text-secondary); line-height:1.7; margin:0;">${post.content}</p>
                ${post.media ? `<img src="${post.media}" style="width:100%; border-radius:10px; max-height:400px; object-fit:cover; margin-top:10px;">` : ''}
                <div class="post-actions">
                    <button class="action-btn" onclick="toggleLikeGlobal(this)">👍 <span>${localStorage.getItem('site_lang') === 'en' ? 'Like' : 'أعجبني'}</span> (<span class="like-count">0</span>)</button>
                    <button class="action-btn" onclick="toggleCommentSection(this)">💬 <span>${localStorage.getItem('site_lang') === 'en' ? 'Comment' : 'تعليق'}</span> (<span class="comment-count">0</span>)</button>
                    <button class="action-btn" onclick="toggleSaveGlobal(this)">🔖 <span>${localStorage.getItem('site_lang') === 'en' ? 'Save' : 'حفظ'}</span></button>
                </div>
                <div class="comment-section" style="display:none;">
                    <div class="comment-input-row">
                        <input type="text" placeholder="${localStorage.getItem('site_lang') === 'en' ? 'Add a comment...' : 'أضف تعليقاً...'}" style="flex:1; padding:10px 14px; border-radius:50px; border:1px solid var(--border-color); background:var(--bg-color); color:var(--text-primary);" onkeydown="if(event.key==='Enter') addInlineComment(this.nextElementSibling)">
                        <button class="btn" style="border-radius:50px; padding:10px 18px;" onclick="addInlineComment(this)">${localStorage.getItem('site_lang') === 'en' ? 'Add' : 'إضافة'}</button>
                    </div>
                    <div class="comments-list"></div>
                </div>
            `;
            welcomeBar.insertAdjacentElement('afterend', div);
        });
    });

    function handleSave(btn) {
        let lang = localStorage.getItem('site_lang') || 'ar';
        showToast(lang === 'ar' ? '✅ تم حفظ المنشور!' : '✅ Post saved!', 'success');
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