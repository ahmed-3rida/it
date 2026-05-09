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