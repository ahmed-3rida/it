

function filterUsers() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('user-card');
    for (let card of cards) {
        card.style.display = card.innerText.toLowerCase().includes(input) ? 'flex' : 'none';
    }
}