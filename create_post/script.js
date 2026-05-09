// صفحة إنشاء المنشور

document.addEventListener("DOMContentLoaded", function() {
        let select = document.getElementById('postCategory');
        let saved = JSON.parse(localStorage.getItem('customCategories') || '[]');
        saved.forEach(cat => {
            let opt = document.createElement('option');
            opt.value = cat;
            opt.innerText = '✨ ' + cat;
            select.appendChild(opt);
        });
    });

    function handlePostSubmit(event) {
        event.preventDefault();

        let titleInput = event.target.querySelector('input[type="text"]');
        let contentInput = event.target.querySelector('textarea');
        let fileInput = event.target.querySelector('input[type="file"]');
        let catSelect = document.getElementById('postCategory');
        
        let title = titleInput ? titleInput.value.trim() : '';
        let content = contentInput ? contentInput.value.trim() : '';
        let category = catSelect ? catSelect.value : '';
        let file = fileInput ? fileInput.files[0] : null;

        let btn = document.getElementById('postSubmitBtn');
        let lang = localStorage.getItem('site_lang') || 'ar';
        btn.innerText = lang === 'ar' ? 'جاري النشر...' : 'Posting...';
        btn.disabled = true;

        let savePost = (mediaUrl) => {
            if (title && content) {
                let posts = JSON.parse(localStorage.getItem('myPosts') || '[]');
                let currentUsername = localStorage.getItem('username') || '';
                posts.push({ id: Date.now(), title: title, content: content, media: mediaUrl, category: category, author: currentUsername });
                try {
                    localStorage.setItem('myPosts', JSON.stringify(posts));
                } catch(e) {
                    console.error("Local storage might be full", e);
                }
            }
            showToast(lang === 'ar' ? 'تم نشر المنشور بنجاح!' : 'Posted successfully!', 'success');
            setTimeout(() => {
                window.location.href = '../user_dashboard/index.html';
            }, 1200);
        };

        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                savePost(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            savePost(null);
        }
    }