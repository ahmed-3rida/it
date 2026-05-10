// جميع الـ functions المشتركة (like, save, follow, comment) موجودة في shared.js

function switchDashTab(tabNum) {
    for (let i = 1; i <= 3; i++) {
        document.getElementById('content' + i).classList.remove('active');
        document.getElementById('tab' + i).classList.remove('active');
    }
    document.getElementById('content' + tabNum).classList.add('active');
    document.getElementById('tab' + tabNum).classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
    renderUserDashboard();
});

function renderUserDashboard() {
    let lang = localStorage.getItem('site_lang') || 'ar';

    // My Posts
    let myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
    let c1 = document.getElementById('content1');
    c1.innerHTML = '';
    if (myPosts.length === 0) {
        c1.innerHTML = `<p style="color:var(--text-secondary);">${lang === 'ar' ? 'لا توجد منشورات.' : 'No posts yet.'}</p>`;
    } else {
        myPosts.slice().reverse().forEach(p => {
            let div = document.createElement('div');
            div.className = 'post';
            div.style.cssText = 'border: 1px solid var(--border-color); margin-bottom: 15px;';
            div.innerHTML = `
                <h4 style="margin: 0 0 10px 0; color: var(--text-primary);">${p.title}</h4>
                <p style="margin: 0 0 15px 0;">${p.content}</p>
                ${p.media ? `<img src="${p.media}" style="width:100%; border-radius:10px; max-height:300px; object-fit:cover; margin-bottom:15px;">` : ''}
                <button class="btn" style="background: #e74c3c; padding: 5px 10px;" onclick="deleteMyPost('${p.id}')" data-ar="حذف المنشور" data-en="Delete Post">${lang === 'ar' ? 'حذف المنشور' : 'Delete Post'}</button>
            `;
            c1.appendChild(div);
        });
    }

    // Saved Posts
    let savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    let c2 = document.getElementById('content2');
    c2.innerHTML = '';
    if (savedPosts.length === 0) {
        c2.innerHTML = `<p style="color:var(--text-secondary);">${lang === 'ar' ? 'لا توجد محفوظات.' : 'No saved posts.'}</p>`;
    } else {
        savedPosts.slice().reverse().forEach(p => {
            let div = document.createElement('div');
            div.className = 'post';
            div.style.cssText = 'border: 1px solid var(--border-color); margin-bottom: 15px;';
            div.innerHTML = `
                <h4 style="margin: 0 0 10px 0; color: var(--text-primary);">${p.title}</h4>
                <button class="btn btn-secondary" style="padding: 5px 10px;" onclick="removeSaved('${p.id}')">${lang === 'ar' ? 'إزالة من المحفوظات' : 'Unsave'}</button>
            `;
            c2.appendChild(div);
        });
    }

    // Liked Posts
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    let c3 = document.getElementById('content3');
    c3.innerHTML = '';
    if (likedPosts.length === 0) {
        c3.innerHTML = `<p style="color:var(--text-secondary);">${lang === 'ar' ? 'لا توجد إعجابات.' : 'No liked posts.'}</p>`;
    } else {
        likedPosts.slice().reverse().forEach(p => {
            let div = document.createElement('div');
            div.className = 'post';
            div.style.cssText = 'border: 1px solid var(--border-color); margin-bottom: 15px;';
            div.innerHTML = `
                <h4 style="margin: 0 0 10px 0; color: var(--text-primary);">${p.title}</h4>
                <button class="btn btn-secondary" style="padding: 5px 10px;" onclick="removeLiked('${p.id}')">${lang === 'ar' ? 'إزالة الإعجاب' : 'Unlike'}</button>
            `;
            c3.appendChild(div);
        });
    }
}

function deleteMyPost(id) {
    let posts = JSON.parse(localStorage.getItem('myPosts') || '[]');
    posts = posts.filter(p => String(p.id) !== String(id));
    localStorage.setItem('myPosts', JSON.stringify(posts));
    renderUserDashboard();
}

function removeSaved(id) {
    let saved = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    saved = saved.filter(p => String(p.id) !== String(id));
    localStorage.setItem('savedPosts', JSON.stringify(saved));
    renderUserDashboard();
}

function removeLiked(id) {
    let liked = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    liked = liked.filter(p => String(p.id) !== String(id));
    localStorage.setItem('likedPosts', JSON.stringify(liked));
    renderUserDashboard();
}