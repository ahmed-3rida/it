

document.addEventListener("DOMContentLoaded", function() {
        loadAdminPosts();
        loadAdminReports();
        loadAdminAds();
    });

    function loadAdminPosts() {
        let posts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        let list = document.getElementById('adminPostsList');
        list.innerHTML = '';
        
        let lang = localStorage.getItem('site_lang') || 'ar';
        let deleteText = lang === 'en' ? 'Delete' : 'حذف';

        if(posts.length === 0) {
            let emptyMsg = document.createElement('li');
            emptyMsg.style.padding = '10px';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.color = 'var(--text-secondary)';
            emptyMsg.innerText = lang === 'en' ? 'No posts found.' : 'لا توجد منشورات.';
            list.appendChild(emptyMsg);
        }

        posts.forEach(post => {
            let li = document.createElement('li');
            li.style = 'padding:10px; border:1px solid var(--border-color); margin-bottom:5px; display:flex; justify-content:space-between; align-items:center; border-radius:4px;';
            li.innerHTML = `
                <span style="flex-grow:1; margin-right:15px;">${post.title}</span>
                <button class="btn" style="background:#e74c3c; padding:5px 10px;" onclick="adminDeletePost(${post.id})">${deleteText}</button>
            `;
            list.appendChild(li);
        });
        
        // Update total posts counter based on dynamic posts (plus some dummy static ones)
        document.getElementById('totalPosts').innerText = (3400 + posts.length).toLocaleString();
    }

    function adminDeletePost(postId) {
        let posts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        posts = posts.filter(p => p.id !== postId);
        localStorage.setItem('myPosts', JSON.stringify(posts));
        
        let lang = localStorage.getItem('site_lang') || 'ar';
        showToast(lang === 'ar' ? 'تم حذف المنشور بنجاح!' : 'Post deleted successfully!', 'success');
        loadAdminPosts();
    }

    function loadAdminReports() {
        let reports = JSON.parse(localStorage.getItem('adminReports') || '[]');
        let list = document.getElementById('adminReportsList');
        list.innerHTML = '';
        
        let lang = localStorage.getItem('site_lang') || 'ar';
        let ignoreText = lang === 'en' ? 'Ignore' : 'تجاهل';
        let resolveText = lang === 'en' ? 'Resolve' : 'إغلاق البلاغ';

        if(reports.length === 0) {
            let emptyMsg = document.createElement('li');
            emptyMsg.style.padding = '10px';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.color = 'var(--text-secondary)';
            emptyMsg.innerText = lang === 'en' ? 'No reports found.' : 'لا توجد بلاغات.';
            list.appendChild(emptyMsg);
        }

        reports.forEach(report => {
            let li = document.createElement('li');
            li.style = 'padding:15px; border:1px solid var(--border-color); margin-bottom:5px; background:rgba(231, 76, 60, 0.05); border-radius:4px;';
            
            let reasonText = lang === 'en' ? report.reasonEn : report.reasonAr;
            
            li.innerHTML = `
                <div style="margin-bottom:8px;"><strong>${reasonText}:</strong> ${report.target}</div>
                <div style="display:flex; gap:10px;">
                    <button class="btn btn-secondary" style="padding:5px 10px;" onclick="adminIgnoreReport(${report.id})">${ignoreText}</button>
                    <button class="btn" style="background:#e74c3c; padding:5px 10px;" onclick="adminResolveReport(${report.id})">${resolveText}</button>
                </div>
            `;
            list.appendChild(li);
        });
    }

    function adminIgnoreReport(reportId) {
        removeReportFromStorage(reportId);
        loadAdminReports();
    }

    function adminResolveReport(reportId) {
        removeReportFromStorage(reportId);
        let lang = localStorage.getItem('site_lang') || 'ar';
        showToast(lang === 'ar' ? 'تم إغلاق البلاغ وحل المشكلة!' : 'Report resolved!', 'success');
        loadAdminReports();
    }

    function removeReportFromStorage(reportId) {
        let reports = JSON.parse(localStorage.getItem('adminReports') || '[]');
        reports = reports.filter(r => r.id !== reportId);
        localStorage.setItem('adminReports', JSON.stringify(reports));
    }

    function loadAdminAds() {
        let ads = JSON.parse(localStorage.getItem('adminAds') || '[]');
        let list = document.getElementById('adminAdsList');
        if(!list) return;
        list.innerHTML = '';
        
        let lang = localStorage.getItem('site_lang') || 'ar';
        let stopText = lang === 'en' ? 'Stop Ad' : 'إيقاف الإعلان';

        if(ads.length === 0) {
            let emptyMsg = document.createElement('li');
            emptyMsg.style.padding = '10px';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.color = 'var(--text-secondary)';
            emptyMsg.innerText = lang === 'en' ? 'No ads found.' : 'لا توجد إعلانات.';
            list.appendChild(emptyMsg);
        }

        ads.forEach(ad => {
            let li = document.createElement('li');
            li.style = 'padding:10px; border:1px solid var(--border-color); margin-bottom:5px; display:flex; justify-content:space-between; align-items:center; border-radius:4px;';
            li.innerHTML = `
                <span style="flex-grow:1; margin-right:15px;">${ad.title} <small style="color:var(--text-secondary);">($${ad.budget}/day)</small></span>
                <button class="btn btn-secondary" style="padding:5px 10px;" onclick="adminStopAd(${ad.id})">${stopText}</button>
            `;
            list.appendChild(li);
        });
    }

    function adminStopAd(adId) {
        let ads = JSON.parse(localStorage.getItem('adminAds') || '[]');
        ads = ads.filter(a => a.id !== adId);
        localStorage.setItem('adminAds', JSON.stringify(ads));
        
        let lang = localStorage.getItem('site_lang') || 'ar';
        showToast(lang === 'ar' ? 'تم إيقاف الإعلان بنجاح!' : 'Ad stopped successfully!', 'success');
        loadAdminAds();
    }