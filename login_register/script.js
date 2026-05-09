// وظيفة للتبديل بين تسجيل الدخول وإنشاء حساب
function showTab(tabName) {
    // إخفاء كل النماذج
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');

    // إزالة اللون من الأزرار
    let tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // إظهار النموذج المطلوب وتفعيل زره
    if (tabName === 'login') {
        document.getElementById('login-form').classList.remove('hidden');
        tabs[0].classList.add('active');
    } else if (tabName === 'register') {
        document.getElementById('register-form').classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}
