function filterUsers() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('user-card');
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].innerText.toLowerCase();
        if (name.includes(input)) {
            cards[i].style.display = 'flex';
        } else {
            cards[i].style.display = 'none';
        }
    }
}