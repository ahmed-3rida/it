// جميع الـ functions المشتركة (like, save, follow, comment) موجودة في shared.js

document.addEventListener("DOMContentLoaded", function() {
    // تنظيف المنشورات القديمة لمنع التكرار مع الـ HTML الثابت
    let currentPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
    localStorage.setItem('myPosts', JSON.stringify(
        currentPosts.filter(p => !p.title.includes("UniSkills Social!") && !p.title.includes("كيف تبدأ في تعلم"))
    ));

    let currentPolls = JSON.parse(localStorage.getItem('customPolls') || '[]');
    localStorage.setItem('customPolls', JSON.stringify(
        currentPolls.filter(p => !p.question.includes("ما هي لغة البرمجة") && !p.question.includes("ما هو الهاتف الذكي"))
    ));

    // تحديث أفاتار المستخدم في الـ welcome bar
    let name = localStorage.getItem('username') || '';
    let avatarEl = document.getElementById('homeUserAvatar');
    if (name && avatarEl) avatarEl.innerText = name.charAt(0).toUpperCase();

    // تحميل المنشورات والاستطلاعات الديناميكية من localStorage
    let lang = localStorage.getItem('site_lang') || 'ar';
    let myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]').map(p => ({...p, type: 'post'}));
    let customPolls = JSON.parse(localStorage.getItem('customPolls') || '[]').map(p => ({...p, type: 'poll'}));
    let combinedFeed = [...myPosts, ...customPolls].sort((a, b) => (b.id || 0) - (a.id || 0));

    let welcomeBar = document.getElementById('mainWelcomeBar');

    // فلترة حسب الفئة إن وُجدت
    let urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category');
    if (currentCategory) {
        let catHeader = document.createElement('h2');
        catHeader.className = 'accent-title';
        catHeader.style.marginBottom = '20px';
        catHeader.innerText = (lang === 'en' ? 'Category: ' : 'القسم: ') + currentCategory;
        welcomeBar.insertAdjacentElement('afterend', catHeader);
        welcomeBar = catHeader;
        combinedFeed = combinedFeed.filter(item => item.category === currentCategory);
    }

    let voteText = lang === 'en' ? 'Vote' : 'تصويت';
    let resText = lang === 'en' ? 'Results:' : 'النتائج:';
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    let savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    let allComments = JSON.parse(localStorage.getItem('allComments') || '{}');

    // إدراج من الأقدم للأحدث حتى يظهر الأحدث في الأعلى
    [...combinedFeed].reverse().forEach(item => {
        let div = document.createElement('div');
        div.className = 'post';

        if (item.type === 'post') {
            div.setAttribute('data-post-id', item.id);
            let uName = item.author || name || (lang === 'en' ? 'Visitor' : 'زائر');
            let isLiked = likedPosts.find(p => p.id === String(item.id));
            let isSaved = savedPosts.find(p => p.id === String(item.id));
            let postComments = allComments[item.id] || [];

            div.innerHTML = `
                <div class="post-header">
                    <div class="left">
                        <div class="avatar" style="background:var(--accent);">${uName.charAt(0).toUpperCase()}</div>
                        <div>
                            <div class="username">${uName}</div>
                            <div class="time">${timeAgo(item.id)}</div>
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

            // عرض التعليقات الموجودة
            let list = div.querySelector('.comments-list');
            postComments.forEach(c => renderSingleComment(list, c, lang));

        } else {
            // استطلاع
            let totalVotes = item.options.reduce((sum, opt) => sum + opt.votes, 0);
            let hasVoted = localStorage.getItem('voted_' + item.id) === 'true';
            let formHtml = '', resultsHtml = '';

            item.options.forEach((opt, idx) => {
                let perc = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                formHtml += `<div style="margin-bottom:10px;"><label><input type="radio" name="home_poll_${item.id}" value="${idx}" required> ${opt.text}</label></div>`;
                resultsHtml += `<div style="margin-bottom:10px;">${opt.text} (${perc}%) - ${opt.votes} <div style="background:var(--bg-color); height:10px; border-radius:5px;"><div style="background:var(--accent); height:10px; border-radius:5px; width:${perc}%; transition:width 0.3s;"></div></div></div>`;
            });

            div.innerHTML = `
                <div class="post-header">
                    <div class="left">
                        <div class="avatar" style="background:var(--accent);">📊</div>
                        <div>
                            <div class="username">${lang === 'en' ? 'Active Poll' : 'استطلاع رأي نشط'}</div>
                            <div class="time">${timeAgo(item.id)}</div>
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
    let saved = JSON.parse(localStorage.getItem('customPolls') || '[]');
    let poll = saved.find(p => p.id === pollId);
    if (poll) {
        poll.options[parseInt(selectedInput.value)].votes += 1;
        localStorage.setItem('customPolls', JSON.stringify(saved));
        localStorage.setItem('voted_' + pollId, 'true');
        window.location.reload();
    }
}