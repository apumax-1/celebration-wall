document.getElementById('wishForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const wishInput = document.getElementById('wishInput');
    const picInput = document.getElementById('picInput');
    const name = nameInput.value;
    const wishText = wishInput.value;
    const picURL = picInput.value;

    if (name && wishText) {
        addWish(name, wishText, picURL);
        nameInput.value = '';
        wishInput.value = '';
        picInput.value = '';
        saveWish(name, wishText, picURL);
    }
});

function addWish(name, text, picURL, id = Date.now()) {
    const wishDiv = document.createElement('div');
    wishDiv.className = 'wish';
    wishDiv.dataset.id = id;

    if (picURL) {
        const img = document.createElement('img');
        img.src = picURL;
        wishDiv.appendChild(img);
    }

    const namePara = document.createElement('p');
    namePara.textContent = `From: ${name}`;
    wishDiv.appendChild(namePara);

    const textPara = document.createElement('p');
    textPara.textContent = text;
    wishDiv.appendChild(textPara);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editWish(id);
    wishDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteWish(id);
    wishDiv.appendChild(deleteButton);

    document.getElementById('wall').appendChild(wishDiv);
}

function saveWish(name, text, picURL, id = Date.now()) {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.push({ id, name, text, picURL });
    localStorage.setItem('wishes', JSON.stringify(wishes));
}

function loadWishes() {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.forEach(wish => addWish(wish.name, wish.text, wish.picURL, wish.id));
}

function editWish(id) {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    const wish = wishes.find(wish => wish.id === id);
    if (wish) {
        document.getElementById('nameInput').value = wish.name;
        document.getElementById('wishInput').value = wish.text;
        document.getElementById('picInput').value = wish.picURL;
        deleteWish(id);
    }
}

function deleteWish(id) {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes = wishes.filter(wish => wish.id !== id);
    localStorage.setItem('wishes', JSON.stringify(wishes));
    document.querySelector(`.wish[data-id='${id}']`).remove();
}

// Load wishes when the page loads
window.onload = loadWishes;

// Create confetti
function createConfetti() {
    const confettiCount = 100;
    const colors = ['#ff6347', '#ff4500', '#ffd700', '#adff2f', '#00ced1'];
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 10}s`;
        confetti.style.setProperty('--confetti-color', colors[Math.floor(Math.random() * colors.length)]);
        document.body.appendChild(confetti);
    }
