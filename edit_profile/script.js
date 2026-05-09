

document.addEventListener("DOMContentLoaded", function() {
        let name = localStorage.getItem('username') || 'المستخدم';
        let bio = localStorage.getItem('userBio') || '';
        document.getElementById('editUsername').value = name;
        document.getElementById('editBio').value = bio;
        document.getElementById('editAvatar').innerText = name.charAt(0).toUpperCase();
    });

    function handleEditSubmit(event) {
        event.preventDefault();
        let nameInput = document.getElementById('editUsername').value.trim();
        let bioInput = document.getElementById('editBio').value.trim();
        if(nameInput) {
            localStorage.setItem('username', nameInput);
        }
        localStorage.setItem('userBio', bioInput);
        let btn = document.getElementById('editSubmitBtn');
        let lang = localStorage.getItem('site_lang') || 'ar';
        btn.innerText = lang === 'ar' ? 'جاري الحفظ...' : 'Saving...';
        btn.disabled = true;
        
        showToast(lang === 'ar' ? 'تم حفظ التعديلات بنجاح!' : 'Changes saved successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = '../profile/index.html';
        }, 1200);
    }