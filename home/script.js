    document.addEventListener("DOMContentLoaded", function() {
        let name = localStorage.getItem('username') || '';
        let avatarEl = document.getElementById('homeUserAvatar');
        if(name && avatarEl) {
            avatarEl.innerText = name.charAt(0).toUpperCase();
        }

        // Load and combine posts and polls
        let myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]').map(p => ({...p, type: 'post'}));
        let customPolls = JSON.parse(localStorage.getItem('customPolls') || '[]').map(p => ({...p, type: 'poll'}));
        
        let combinedFeed = [...myPosts, ...customPolls];
        
        // Sort by ID descending (newest first)
        combinedFeed.sort((a, b) => (b.id || 0) - (a.id || 0));
        
        let welcomeBar = document.querySelector('.container-box');
        let urlParams = new URLSearchParams(window.location.search);
        let currentCategory = urlParams.get('category');
        if (currentCategory) {
            let catHeader = document.createElement('h2');
            catHeader.className = 'accent-title';
            catHeader.style.marginBottom = '20px';
            catHeader.innerText = (localStorage.getItem('site_lang') === 'en' ? 'Category: ' : 'القسم: ') + currentCategory;
            welcomeBar.insertAdjacentElement('afterend', catHeader);
            welcomeBar = catHeader;
            
            combinedFeed = combinedFeed.filter(item => item.category === currentCategory);
        }
        
        let lang = localStorage.getItem('site_lang') || 'ar';
        let voteText = lang === 'en' ? 'Vote' : 'تصويت';
        let resText = lang === 'en' ? 'Results:' : 'النتائج:';

        let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        let savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        let allComments = JSON.parse(localStorage.getItem('allComments') || '{}');

        // Use a container or insert in reverse to keep newest at top
        // Let's iterate in reverse (Oldest to Newest) so 'afterend' puts Newest at the top
        [...combinedFeed].reverse().forEach(item => {
            let div = document.createElement('div');
            div.className = 'post';
            
            if (item.type === 'post') {
                div.setAttribute('data-post-id', item.id);
                let timeText = timeAgo(item.id);
                let defaultName = lang === 'en' ? 'Visitor' : 'زائر';
                let uName = item.author || name || defaultName;
                let firstLetter = uName.charAt(0).toUpperCase();
                
                let isLiked = likedPosts.find(p => p.id === String(item.id));
                let isSaved = savedPosts.find(p => p.id === String(item.id));
                let postComments = allComments[item.id] || [];
                
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
                    <h2 class="accent-title" style="font-size:18px; margin-bottom:8px;">${item.title}</h2>
                    <p style="color:var(--text-secondary); line-height:1.7; margin:0;">${item.content}</p>
                    ${item.media ? `<img src="${item.media}" style="width:100%; border-radius:10px; max-height:400px; object-fit:cover; margin-top:10px;">` : ''}
                    <div class="post-actions">
                        <button class="action-btn ${isLiked ? 'liked' : ''}" style="${isLiked ? 'color:var(--accent);' : ''}" onclick="toggleLikeGlobal(this)">👍 <span>${lang === 'en' ? 'Like' : 'أعجبني'}</span> (<span class="like-count">${isLiked ? 1 : 0}</span>)</button>
                        <button class="action-btn" onclick="toggleCommentSection(this)">💬 <span>${lang === 'en' ? 'Comment' : 'تعليق'}</span> (<span class="comment-count">${postComments.length}</span>)</button>
                        <button class="action-btn ${isSaved ? 'saved' : ''}" style="${isSaved ? 'color:var(--accent);' : ''}" onclick="toggleSaveGlobal(this)">🔖 <span>${lang === 'en' ? 'Save' : 'حفظ'}</span></button>
                    </div>
                    <div class="comment-section" style="display:none;">
                        <div class="comment-input-row">
                            <input type="text" placeholder="${lang === 'en' ? 'Add a comment...' : 'أضف تعليقاً...'}" style="flex:1; padding:10px 14px; border-radius:50px; border:1px solid var(--border-color); background:var(--bg-color); color:var(--text-primary);" onkeydown="if(event.key==='Enter') addInlineComment(this.nextElementSibling)">
                            <button class="btn" style="border-radius:50px; padding:10px 18px;" onclick="addInlineComment(this)">${lang === 'en' ? 'Add' : 'إضافة'}</button>
                        </div>
                        <div class="comments-list"></div>
                    </div>
                `;
                
                // Render existing comments
                let list = div.querySelector('.comments-list');
                postComments.forEach(c => renderSingleComment(list, c, lang));

            } else {
                // Poll rendering
                let totalVotes = item.options.reduce((sum, opt) => sum + opt.votes, 0);
                let hasVoted = localStorage.getItem('voted_' + item.id) === 'true';
                let timeText = timeAgo(item.id);
                let formHtml = '';
                let resultsHtml = '';

                item.options.forEach((opt, idx) => {
                    let perc = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                    formHtml += `<div style="margin-bottom: 10px;"><label><input type="radio" name="home_poll_${item.id}" value="${idx}" required> ${opt.text}</label></div>`;
                    resultsHtml += `<div style="margin-bottom: 10px;">${opt.text} (${perc}%) - ${opt.votes} votes <div style="background: var(--bg-color); height: 10px; border-radius: 5px;"><div style="background: var(--accent); height: 10px; border-radius: 5px; width: ${perc}%; transition: width 0.3s;"></div></div></div>`;
                });

                div.innerHTML = `
                    <div class="post-header">
                        <div class="left">
                            <div class="avatar" style="background:var(--accent);">📊</div>
                            <div>
                                <div class="username">${lang === 'en' ? 'Active Poll' : 'استطلاع رأي نشط'}</div>
                                <div class="time">${timeText}</div>
                            </div>
                        </div>
                    </div>
                    <h3 style="margin-bottom:15px; color:var(--text-primary); font-size:18px;">${item.question}</h3>
                    <form onsubmit="handleHomeVote(event, ${item.id})" style="${hasVoted ? 'display:none;' : ''}">
                        ${formHtml}
                        <button type="submit" class="btn" style="margin-top:10px;">${voteText}</button>
                    </form>
                    <div id="home_res_${item.id}" style="${hasVoted ? 'display:block;' : 'display:none;'} margin-top:20px;">
                        <h4 style="color:var(--text-secondary); margin-bottom:10px;">${resText}</h4>
                        ${resultsHtml}
                    </div>
                `;
            }
            welcomeBar.insertAdjacentElement('afterend', div);
        });
    });

    function handleHomeVote(e, pollId) {
        e.preventDefault();
        let selectedInput = e.target.querySelector(`input[name="home_poll_${pollId}"]:checked`);
        if (!selectedInput) return;
        
        let selectedIdx = selectedInput.value;
        let saved = JSON.parse(localStorage.getItem('customPolls') || '[]');
        let poll = saved.find(p => p.id === pollId);
        
        if(poll) {
            poll.options[parseInt(selectedIdx)].votes += 1;
            localStorage.setItem('customPolls', JSON.stringify(saved));
            localStorage.setItem('voted_' + pollId, 'true');
            window.location.reload();
        }
    }

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
    let post = btn.closest('.post');
    let postId = post.getAttribute('data-post-id');
    let section = post.querySelector('.comment-section');
    let input = section.querySelector('input[type="text"]');
    let list = section.querySelector('.comments-list');
    let countSpan = post.querySelector('.comment-count');
    
    if (!input || input.value.trim() === '') return;
    
    let lang = localStorage.getItem('site_lang') || 'ar';
    let youText = (lang === 'en') ? 'You' : 'أنت';
    let username = localStorage.getItem('username') || youText;
    
    let newComment = {
        id: Date.now(),
        author: username,
        text: input.value.trim()
    };

    // Save to localStorage
    let allComments = JSON.parse(localStorage.getItem('allComments') || '{}');
    if (!allComments[postId]) allComments[postId] = [];
    allComments[postId].push(newComment);
    localStorage.setItem('allComments', JSON.stringify(allComments));

    renderSingleComment(list, newComment, lang);
    
    if(countSpan) countSpan.innerText = allComments[postId].length;
    input.value = '';
    input.focus();
}

function renderSingleComment(container, comment, lang) {
    let deleteText = (lang === 'en') ? 'Delete' : 'حذف';
    let div = document.createElement('div');
    div.className = 'comment-item';
    div.setAttribute('data-comment-id', comment.id);
    div.style.cssText = 'background: var(--bg-color); padding: 10px 14px; margin-bottom: 10px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; animation: slideDown 0.2s ease;';
    
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
    let postId = post.getAttribute('data-post-id');
    let commentItem = btn.closest('.comment-item');
    let commentId = commentItem.getAttribute('data-comment-id');
    let countSpan = post.querySelector('.comment-count');

    // Remove from localStorage
    let allComments = JSON.parse(localStorage.getItem('allComments') || '{}');
    if (allComments[postId]) {
        allComments[postId] = allComments[postId].filter(c => String(c.id) !== String(commentId));
        localStorage.setItem('allComments', JSON.stringify(allComments));
        if(countSpan) countSpan.innerText = allComments[postId].length;
    }

    commentItem.style.opacity = '0';
    commentItem.style.transition = 'opacity 0.2s';
    setTimeout(() => commentItem.remove(), 200);
}