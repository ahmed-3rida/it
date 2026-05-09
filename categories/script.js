

document.addEventListener("DOMContentLoaded", function() {
                loadCategories();
            });

            function loadCategories() {
                let saved = JSON.parse(localStorage.getItem('customCategories') || '[]');
                let grid = document.getElementById('categoriesGrid');
                let lang = localStorage.getItem('site_lang') || 'ar';
                let threadsText = (lang === 'en') ? '0 Threads' : '0 موضوع';
                let browseText = (lang === 'en') ? 'Browse' : 'تصفح';
                
                saved.forEach(val => {
                    let div = document.createElement('div');
                    div.style = 'background: var(--bg-color); padding: 20px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color);';
                    div.innerHTML = `
                        <h3 style="margin-bottom: 10px;">✨ ${val}</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 15px;" data-ar="0 موضوع" data-en="0 Threads">${threadsText}</p>
                        <button class="btn" onclick="window.location.href='../home/index.html?category=${encodeURIComponent(val)}'" data-ar="تصفح" data-en="Browse">${browseText}</button>
                    `;
                    grid.prepend(div);
                });
            }

            function addCategory(e, form) {
                e.preventDefault();
                let input = form.querySelector('input');
                let val = input.value.trim();
                if(val === '') return;
                
                let saved = JSON.parse(localStorage.getItem('customCategories') || '[]');
                if(!saved.includes(val)) {
                    saved.push(val);
                    localStorage.setItem('customCategories', JSON.stringify(saved));
                }
                
                let grid = document.getElementById('categoriesGrid');
                let div = document.createElement('div');
                div.style = 'background: var(--bg-color); padding: 20px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color);';
                
                let lang = localStorage.getItem('site_lang') || 'ar';
                let threadsText = (lang === 'en') ? '0 Threads' : '0 موضوع';
                let browseText = (lang === 'en') ? 'Browse' : 'تصفح';
                
                div.innerHTML = `
                    <h3 style="margin-bottom: 10px;">✨ ${val}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 15px;" data-ar="0 موضوع" data-en="0 Threads">${threadsText}</p>
                    <button class="btn" onclick="window.location.href='../home/index.html?category=${encodeURIComponent(val)}'" data-ar="تصفح" data-en="Browse">${browseText}</button>
                `;
                grid.prepend(div);
                input.value = '';
            }