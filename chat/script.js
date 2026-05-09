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