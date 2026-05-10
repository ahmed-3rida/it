function submitPoll(e) {
    e.preventDefault();
    document.getElementById('pollForm').style.display = 'none';
    document.getElementById('pollResults').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
                loadPolls();
            });

            function loadPolls() {
                let saved = JSON.parse(localStorage.getItem('customPolls') || '[]');
                let container = document.getElementById('pollsList');

                let customPosts = container.querySelectorAll('.custom-poll');
                customPosts.forEach(p => p.remove());

                let lang = localStorage.getItem('site_lang') || 'ar';
                let voteText = lang === 'en' ? 'Vote' : 'تصويت';
                let resText = lang === 'en' ? 'Results:' : 'النتائج:';
                let deleteText = lang === 'en' ? 'Delete' : 'حذف';

                saved.forEach(poll => {
                    let div = document.createElement('div');
                    div.className = 'post custom-poll';
                    
                    let totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                    let hasVoted = localStorage.getItem('voted_' + poll.id) === 'true';

                    let formHtml = '';
                    let resultsHtml = '';

                    poll.options.forEach((opt, idx) => {
                        let perc = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                        formHtml += `<div style="margin-bottom: 10px;"><label><input type="radio" name="poll_${poll.id}" value="${idx}" required> ${opt.text}</label></div>`;
                        resultsHtml += `<div style="margin-bottom: 10px;">${opt.text} (${perc}%) - ${opt.votes} votes <div style="background: var(--bg-color); height: 10px; border-radius: 5px;"><div style="background: var(--accent); height: 10px; border-radius: 5px; width: ${perc}%; transition: width 0.3s;"></div></div></div>`;
                    });

                    div.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px;">
                            <h3 style="margin:0;">${poll.question}</h3>
                            <button class="btn" style="background:rgba(231,76,60,0.1); color:#ef4444; padding:5px 12px; font-size:12px; border:1px solid rgba(231,76,60,0.2);" onclick="deletePoll(${poll.id})">${deleteText}</button>
                        </div>
                        <form id="form_${poll.id}" onsubmit="handleVote(event, ${poll.id})" style="${hasVoted ? 'display:none;' : ''}">
                            ${formHtml}
                            <button type="submit" class="btn" style="margin-top:10px;">${voteText}</button>
                        </form>
                        <div id="res_${poll.id}" style="${hasVoted ? 'display:block;' : 'display:none;'} margin-top:20px;">
                            <h4>${resText}</h4>
                            ${resultsHtml}
                        </div>
                    `;
                    container.querySelector('h2').insertAdjacentElement('afterend', div);
                });
            }

            function deletePoll(pollId) {
                let lang = localStorage.getItem('site_lang') || 'ar';
                if(!confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الاستطلاع؟' : 'Are you sure you want to delete this poll?')) return;
                
                let saved = JSON.parse(localStorage.getItem('customPolls') || '[]');
                saved = saved.filter(p => p.id !== pollId);
                localStorage.setItem('customPolls', JSON.stringify(saved));
                

                localStorage.removeItem('voted_' + pollId);
                
                showToast(lang === 'ar' ? 'تم حذف الاستطلاع' : 'Poll deleted', 'info');
                loadPolls();
            }

            function handleVote(e, pollId) {
                e.preventDefault();
                let selectedIdx = e.target.querySelector(`input[name="poll_${pollId}"]:checked`).value;
                
                let saved = JSON.parse(localStorage.getItem('customPolls') || '[]');
                let poll = saved.find(p => p.id === pollId);
                if(poll) {
                    poll.options[parseInt(selectedIdx)].votes += 1;
                    localStorage.setItem('customPolls', JSON.stringify(saved));
                    localStorage.setItem('voted_' + pollId, 'true');
                    loadPolls();
                }
            }

            function addOptionField() {
                let container = document.getElementById('optionsContainer');
                let count = container.querySelectorAll('.form-group').length + 1;
                let lang = localStorage.getItem('site_lang') || 'ar';
                let labelAr = "الخيار " + count;
                let labelEn = "Option " + count;
                let text = lang === 'en' ? labelEn : labelAr;
                
                let div = document.createElement('div');
                div.className = 'form-group';
                div.innerHTML = `<label data-ar="${labelAr}" data-en="${labelEn}">${text}</label><input type="text" class="poll-option" required>`;
                container.appendChild(div);
            }

            function addPoll(e, form) {
                e.preventDefault();
                let questionInput = form.querySelector('input:not(.poll-option)');
                let question = questionInput.value.trim();
                
                let optionInputs = form.querySelectorAll('.poll-option');
                let options = [];
                optionInputs.forEach(i => {
                    if(i.value.trim()) options.push({ text: i.value.trim(), votes: 0 });
                });
                
                if(!question || options.length < 2) return;
                
                let saved = JSON.parse(localStorage.getItem('customPolls') || '[]');
                saved.push({ id: Date.now(), question: question, options: options });
                localStorage.setItem('customPolls', JSON.stringify(saved));
                
                questionInput.value = '';
                optionInputs.forEach(i => i.value = '');
                
                let lang = localStorage.getItem('site_lang') || 'ar';
                showToast(lang === 'ar' ? 'تم إنشاء الاستطلاع بنجاح!' : 'Poll created successfully!', 'success');
                loadPolls();
            }