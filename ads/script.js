function submitAd(e, form) {
    e.preventDefault();
    let title = document.getElementById('adTitle').value.trim();
    let link = document.getElementById('adLink').value.trim();
    let budget = document.getElementById('adBudget').value;

    if (!title || !link || !budget) return;

    let ads = JSON.parse(localStorage.getItem('adminAds') || '[]');
    ads.push({
        id: Date.now(),
        title: title,
        link: link,
        budget: budget
    });
    localStorage.setItem('adminAds', JSON.stringify(ads));

    let lang = localStorage.getItem('site_lang') || 'ar';
    showToast(lang === 'ar' ? 'تم إرسال الحملة الإعلانية بنجاح!' : 'Campaign Submitted successfully!', 'success');

    form.reset();
}
