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

function addWish(name, text, picURL) {
    const wishDiv = document.createElement('div');
    wishDiv.className = 'wish';

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

    document.getElementById('wall').appendChild(wishDiv);
}

function saveWish(name, text, picURL) {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.push({ name, text, picURL });
    localStorage.setItem('wishes', JSON.stringify(wishes));
}

function loadWishes() {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.forEach(wish => addWish(wish.name, wish.text, wish.picURL));
}

// Load wishes when the page loads
window.onload = loadWishes;
