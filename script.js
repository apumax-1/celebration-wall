document.getElementById('wishForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const wishInput = document.getElementById('wishInput');
    const wishText = wishInput.value;
    if (wishText) {
        addWish(wishText);
        wishInput.value = '';
        saveWish(wishText);
    }
});

function addWish(text) {
    const wishDiv = document.createElement('div');
    wishDiv.className = 'wish';
    wishDiv.textContent = text;
    document.getElementById('wall').appendChild(wishDiv);
}

function saveWish(text) {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.push(text);
    localStorage.setItem('wishes', JSON.stringify(wishes));
}

function loadWishes() {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.forEach(wish => addWish(wish));
}

// Load wishes when the page loads
window.onload = loadWishes;