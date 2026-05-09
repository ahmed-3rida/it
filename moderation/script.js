

function submitReport(e, form) {
                    e.preventDefault();
                    let target = document.getElementById('reportTarget').value.trim();
                    let reasonSelect = document.getElementById('reportReason');
                    let reasonValue = reasonSelect.value;
                    let reasonTextAr = reasonSelect.options[reasonSelect.selectedIndex].getAttribute('data-ar');
                    let reasonTextEn = reasonSelect.options[reasonSelect.selectedIndex].getAttribute('data-en');
                    
                    if(!target || !reasonValue) return;

                    let reports = JSON.parse(localStorage.getItem('adminReports') || '[]');
                    reports.push({
                        id: Date.now(),
                        target: target,
                        reasonAr: reasonTextAr,
                        reasonEn: reasonTextEn
                    });
                    localStorage.setItem('adminReports', JSON.stringify(reports));

                    let lang = localStorage.getItem('site_lang') || 'ar';
                    showToast(lang === 'ar' ? 'تم إرسال البلاغ بنجاح!' : 'Report sent successfully!', 'success');
                    
                    document.getElementById('reportTarget').value = '';
                    reasonSelect.value = '';
                }