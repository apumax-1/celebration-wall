document.getElementById('wishForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ownerInput = document.getElementById('ownerInput');
    const nameInput = document.getElementById('nameInput');
    const wishInput = document.getElementById('wishInput');
    const picInput = document.getElementById('picInput');
    const owner = ownerInput.value;
    const name = nameInput.value;
    const wishText = wishInput.value;
    const picURL = picInput.value;

    if (owner && name && wishText) {
        addWish(owner, name, wishText, picURL);
        ownerInput.value = '';
        nameInput.value = '';
        wishInput.value = '';
        picInput.value = '';
        saveWish(owner, name, wishText, picURL);
    }
});

function addWish(owner, name, text, picURL, id = Date.now()) {
    const wishDiv = document.createElement('div');
    wishDiv.className = 'wish';
    wishDiv.dataset.id = id;
    wishDiv.dataset.owner = owner;

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
    editButton.onclick = () => editWish(id, owner);
    wishDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteWish(id, owner);
    wishDiv.appendChild(deleteButton);

    document.getElementById('wall').appendChild(wishDiv);
}

function saveWish(owner, name, text, picURL, id = Date.now()) {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.push({ id, owner, name, text, picURL });
    localStorage.setItem('wishes', JSON.stringify(wishes));
}

function loadWishes() {
    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.forEach(wish => addWish(wish.owner, wish.name, wish.text, wish.picURL, wish.id));
}

function editWish(id, owner) {
    const currentOwner = prompt("Enter your name to edit this wish:");
    if (currentOwner === owner) {
        let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
        const wish = wishes.find(wish => wish.id === id);
        if (wish) {
            document.getElementById('ownerInput').value = wish.owner;
            document.getElementById('nameInput').value = wish.name;
            document.getElementById('wishInput').value = wish.text;
            document.getElementById('picInput').value = wish.picURL;
            deleteWish(id, owner);
        }
    } else {
        alert("You are not authorized to edit this wish.");
    }
}

function deleteWish(id, owner) {
    const currentOwner = prompt("Enter your name to delete this wish:");
    if (currentOwner === owner) {
        let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
        wishes = wishes.filter(wish => wish.id !== id);
        localStorage.setItem('wishes', JSON.stringify(wishes));
        document.querySelector(`.wish[data-id='${id}']`).remove();
    } else {
        alert("You are not authorized to delete this wish.");
    }
}

// Load wishes when the page loads
window.onload = loadWishes;
