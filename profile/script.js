

document.addEventListener("DOMContentLoaded", function() {
    let name = localStorage.getItem('username') || 'مستخدم';
    let bio = localStorage.getItem('userBio');

    let profileName = document.getElementById('profileName');
    let profileHandle = document.getElementById('profileHandle');
    let profileAvatarInitial = document.getElementById('profileAvatarInitial');

    if (profileName) profileName.innerText = name;
    if (profileHandle) profileHandle.innerText = '@' + name.toLowerCase().replace(/\s+/g, '_');
    if (profileAvatarInitial) profileAvatarInitial.innerText = name.charAt(0).toUpperCase() || '?';

    if (bio) {
        let bioEl = document.getElementById('profileBio');
        if (bioEl) {
            bioEl.innerText = bio;
            bioEl.removeAttribute('data-ar');
            bioEl.removeAttribute('data-en');
        }
    }


    let myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
    let postCountStat = document.getElementById('postCountStat');
    if (postCountStat) postCountStat.innerText = myPosts.length;

    let recentContainer = document.getElementById('recentPostsContainer');
    if (recentContainer) {
        recentContainer.innerHTML = '';
        let lang = localStorage.getItem('site_lang') || 'ar';
        if (myPosts.length === 0) {
            let p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.innerText = lang === 'en' ? 'No posts yet.' : 'لا توجد منشورات حتى الآن.';
            recentContainer.appendChild(p);
        } else {
            [...myPosts].reverse().slice(0, 5).forEach(p => {
                let div = document.createElement('div');
                div.className = 'post';
                div.style.marginBottom = '15px';
                let mediaHtml = p.media ? `<img src="${p.media}" style="width:100%; border-radius:10px; max-height:200px; object-fit:cover; margin:10px 0;">` : '';
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h4 style="margin:0;">${p.title}</h4>
                        <span style="font-size:12px; color:var(--text-secondary);">${timeAgo(p.id)}</span>
                    </div>
                    <p style="margin:0; color:var(--text-secondary); font-size:14px;">${p.content}</p>
                    ${mediaHtml}
                `;
                recentContainer.appendChild(div);
            });
        }
    }

    let followBtn = document.getElementById('followBtn');
    if (followBtn) followBtn.style.display = 'none';
});

function toggleFollowProfile(btn) {
    toggleFollow(btn);
}