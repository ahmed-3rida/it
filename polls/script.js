function submitPoll(e) {
    e.preventDefault();
    document.getElementById('pollForm').style.display = 'none';
    document.getElementById('pollResults').style.display = 'block';
}