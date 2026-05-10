function sendMessage() {
    let input = document.getElementById('msgInput');
    let text = input.value;
    if (text.trim() === '') return;
    let messages = document.getElementById('chatMessages');
    let div = document.createElement('div');
    div.style = 'align-self: flex-end; background: #fff; border: 1px solid #ddd; padding: 8px 12px; border-radius: 10px;';
    div.innerText = text;
    messages.appendChild(div);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
}

let currentChat = 'Ahmed Mohamed';

            document.addEventListener("DOMContentLoaded", function() {
                loadChatMessages(currentChat);
                

                document.getElementById('msgInput').addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') sendMessage();
                });
            });

            function switchChat(chatId, element) {
                currentChat = chatId;
                

                document.querySelectorAll('.chat-contact').forEach(el => {
                    el.style.background = '';
                });
                element.style.background = 'var(--hover-bg)';
                

                let titleEl = document.getElementById('activeChatTitle');
                let isAr = (localStorage.getItem('site_lang') || 'ar') === 'ar';
                if(chatId === 'Ahmed Mohamed') {
                    titleEl.setAttribute('data-ar', 'أحمد محمد');
                    titleEl.setAttribute('data-en', 'Ahmed Mohamed');
                    titleEl.innerText = isAr ? 'أحمد محمد' : 'Ahmed Mohamed';
                } else if(chatId === 'Sara Ali') {
                    titleEl.setAttribute('data-ar', 'سارة علي');
                    titleEl.setAttribute('data-en', 'Sara Ali');
                    titleEl.innerText = isAr ? 'سارة علي' : 'Sara Ali';
                }
                

                loadChatMessages(chatId);
            }

            function loadChatMessages(chatId) {
                let messagesContainer = document.getElementById('chatMessages');
                messagesContainer.innerHTML = '';
                
                let saved = JSON.parse(localStorage.getItem('chat_' + chatId) || '[]');
                

                if(saved.length === 0) {
                    if(chatId === 'Ahmed Mohamed') {
                        saved = [
                            { sender: 'other', text: 'مرحباً، كيف حالك؟', textEn: 'Hello, how are you?' },
                            { sender: 'me', text: 'أهلاً بك، أنا بخير!', textEn: 'Hi, I am fine!' }
                        ];
                    } else {
                        saved = [
                            { sender: 'other', text: 'أهلاً، هل رأيت منشوري الأخير؟', textEn: 'Hi, did you see my last post?' }
                        ];
                    }
                    localStorage.setItem('chat_' + chatId, JSON.stringify(saved));
                }

                let lang = localStorage.getItem('site_lang') || 'ar';

                saved.forEach(msg => {
                    let div = document.createElement('div');
                    let isMe = msg.sender === 'me';
                    
                    div.style.alignSelf = isMe ? 'flex-end' : 'flex-start';
                    div.style.background = isMe ? 'var(--accent)' : 'var(--hover-bg)';
                    div.style.color = isMe ? 'white' : 'var(--text-primary)';
                    div.style.padding = '10px 15px';
                    div.style.borderRadius = '15px';
                    

                    if(typeof msg === 'string') {
                        div.innerText = msg;
                    } else {
                        div.innerText = (lang === 'en' && msg.textEn) ? msg.textEn : msg.text;
                    }
                    
                    messagesContainer.appendChild(div);
                });
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            function sendMessage() {
                let input = document.getElementById('msgInput');
                let text = input.value.trim();
                if(text === '') return;
                
                let messages = document.getElementById('chatMessages');
                let div = document.createElement('div');
                div.style.alignSelf = 'flex-end';
                div.style.background = 'var(--accent)';
                div.style.color = 'white';
                div.style.padding = '10px 15px';
                div.style.borderRadius = '15px';
                div.innerText = text;
                messages.appendChild(div);
                

                let saved = JSON.parse(localStorage.getItem('chat_' + currentChat) || '[]');

                if(saved.length > 0 && typeof saved[0] === 'string') {
                    saved = saved.map(s => ({sender: 'me', text: s, textEn: s}));
                }
                saved.push({ sender: 'me', text: text, textEn: text });
                localStorage.setItem('chat_' + currentChat, JSON.stringify(saved));
                
                input.value = '';
                messages.scrollTop = messages.scrollHeight;
            }