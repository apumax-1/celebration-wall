document.getElementById('wishForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const wishInput = document.getElementById('wishInput');
    const picInput = document.getElementById('picInput');
    const name = nameInput.value;
    const wishText = wishInput.value;
    const picURL = picInput.value;

    if (name && wishText) {
        const editId = document.getElementById('wishForm').dataset.editId;
        if (editId) {
            updateWish(editId, name, wishText, picURL);
            document.getElementById('wishForm').removeAttribute('data-editId');
        } else {
            addWish(name, wishText, picURL);
        }
        nameInput.value = '';
        wishInput.value = '';
        picInput.value = '';
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
    editButton.onclick = (event) => {
        event.stopPropagation();
        editWish(id);
    };
    wishDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = (event) => {
        event.stopPropagation();
        deleteWish(id);
    };
    wishDiv.appendChild(deleteButton);

    wishDiv.onclick = (event) => {
        event.stopPropagation();
        toggleExpand(wishDiv);
    };

    document.getElementById('wall').appendChild(wishDiv);
    saveWish(name, text, picURL, id);
}

function saveWish(name, text, picURL, id) {
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
        document.getElementById('wishForm').dataset.editId = id;
        deleteWish(id);
    }
}

function updateWish(id, name, text, picURL) {
    addWish(name, text, picURL, id);
}

function deleteWish(id) {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes = wishes.filter(wish => wish.id !== id);
    localStorage.setItem('wishes', JSON.stringify(wishes));
    document.querySelector(`.wish[data-id='${id}']`).remove();
}

function toggleExpand(wishDiv) {
    const expanded = document.querySelector('.wish.expanded');
    if (expanded && expanded !== wishDiv) {
        expanded.classList.remove('expanded');
    }
    wishDiv.classList.toggle('expanded');
}

document.addEventListener('click', (event) => {
    const expanded = document.querySelector('.wish.expanded');
    if (expanded && !expanded.contains(event.target)) {
        expanded.classList.remove('expanded');
    }
});

// Create confetti
function createConfetti() {
    const confettiCount = 100;
    const colors = ['#ff6347', '#ff4500', '#ffd700', '#adff2f', '#00ced1'];
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random
