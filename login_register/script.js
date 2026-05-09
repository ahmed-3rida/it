function showTab(tab) {
    if(tab === 'login') {
        document.getElementById('form-login').style.display = 'block';
        document.getElementById('form-register').style.display = 'none';
        document.getElementById('tab-login').style.color = 'var(--accent)';
        document.getElementById('tab-login').style.borderBottom = '2px solid var(--accent)';
        document.getElementById('tab-register').style.color = 'var(--text-secondary)';
        document.getElementById('tab-register').style.borderBottom = 'none';
    } else {
        document.getElementById('form-login').style.display = 'none';
        document.getElementById('form-register').style.display = 'block';
        document.getElementById('tab-register').style.color = 'var(--accent)';
        document.getElementById('tab-register').style.borderBottom = '2px solid var(--accent)';
        document.getElementById('tab-login').style.color = 'var(--text-secondary)';
        document.getElementById('tab-login').style.borderBottom = 'none';
    }
}

function doLogin(username) {
    // حفظ حالة تسجيل الدخول واسم المستخدم
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username || 'مستخدم');
    window.location.href = '../home/index.html';
}