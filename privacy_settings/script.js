

document.addEventListener("DOMContentLoaded", function() {
                if (localStorage.getItem('isPrivateAccount') === 'true') {
                    document.getElementById('privateAccountCheckbox').checked = true;
                }
                if (localStorage.getItem('allowDMs') === 'false') {
                    document.getElementById('allowDMsCheckbox').checked = false;
                }
            });

            function savePrivacy(event) {
                event.preventDefault();
                let isPrivate = document.getElementById('privateAccountCheckbox').checked;
                let allowDMs = document.getElementById('allowDMsCheckbox').checked;
                
                localStorage.setItem('isPrivateAccount', isPrivate);
                localStorage.setItem('allowDMs', allowDMs);
                
                showToast('تم حفظ إعدادات الخصوصية بنجاح! / Privacy settings saved!', 'success');
            }