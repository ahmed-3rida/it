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
                // clear old custom ones (keep the h2 and the first static one)
                let customPosts = container.querySelectorAll('.custom-poll');
                customPosts.forEach(p => p.remove());

                let lang = localStorage.getItem('site_lang') || 'ar';
                let voteText = lang === 'en' ? 'Vote' : 'تصويت';
                let resText = lang === 'en' ? 'Results:' : 'النتائج:';

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
                        <h3>${poll.question}</h3>
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

            function handleVote(e, pollId) {
                e.preventDefault();
                let selectedIdx = e.target.querySelector(`input[name="poll_${pollId}"]:checked`).value;
                
                let saved = JSON.parse(localStorage.getItem('customPolls') || '[]');
                let poll = saved.find(p => p.id === pollId);
                if(poll) {
                    poll.options[parseInt(selectedIdx)].votes += 1;
                    localStorage.setItem('customPolls', JSON.stringify(saved));
                    localStorage.setItem('voted_' + pollId, 'true');
                    loadPolls(); // Re-render to show updated percentages
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