document.addEventListener("DOMContentLoaded", function() {
    let select = document.getElementById('threadCategory');
    if (!select) return;
    
    let saved = JSON.parse(localStorage.getItem('customCategories') || '[]');
    saved.forEach(cat => {
        let opt = document.createElement('option');
        opt.value = cat;
        opt.innerText = '✨ ' + cat;
        select.appendChild(opt);
    });
});

function handleThreadSubmit(event) {
    event.preventDefault();

    let titleInput = document.getElementById('threadTitle');
    let contentInput = document.getElementById('threadContent');
    let catSelect = document.getElementById('threadCategory');
    
    let title = titleInput ? titleInput.value.trim() : '';
    let content = contentInput ? contentInput.value.trim() : '';
    let category = catSelect ? catSelect.value : '';

    if (!title || !content) return;

    let btn = document.getElementById('threadSubmitBtn');
    let lang = localStorage.getItem('site_lang') || 'ar';
    btn.innerText = lang === 'ar' ? 'جاري النشر...' : 'Posting...';
    btn.disabled = true;

    let posts = JSON.parse(localStorage.getItem('myPosts') || '[]');
    let currentUsername = localStorage.getItem('username') || '';
    

    posts.push({ 
        id: Date.now(), 
        title: '🧵 ' + title, 
        content: content, 
        media: null, 
        category: category, 
        author: currentUsername 
    });
    
    try {
        localStorage.setItem('myPosts', JSON.stringify(posts));
    } catch(e) {
        console.error("Local storage might be full", e);
    }
    
    showToast(lang === 'ar' ? 'تم إنشاء النقاش بنجاح!' : 'Thread created successfully!', 'success');
    
    setTimeout(() => {
        window.location.href = '../home/index.html';
    }, 1200);
}
