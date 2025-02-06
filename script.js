document.getElementById('wishForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const wishInput = document.getElementById('wishInput');
    const picInput = document.getElementById('picInput');
    const name = nameInput.value;
    const wishText = wishInput.value;
    const picURL = picInput.value;

    console.log('Form submitted:', { name, wishText, picURL });

    if (name && wishText) {
        const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
        const newWish = { id: Date.now(), name, text: wishText, picURL };
        wishes.push(newWish);
        localStorage.setItem('wishes', JSON.stringify(wishes));
        console.log('Wish added to local storage');
        nameInput.value = '';
        wishInput.value = '';
        picInput.value = '';
        loadWishes(); // Reload wishes to display the new one
    } else {
        console.log('Name or wish text is missing');
    }
});

function addWish(name, text, picURL, id) {
    const wishDiv = document.createElement('div');
    wishDiv.className = 'wish';
    wishDiv.dataset.id = id;

    if (picURL) {
        const img = document.createElement('img');
        img.src = picURL;
        img.alt = 'Wish Image';
        img.onerror = () => {
            img.style.display = 'none';
            console.error('Image failed to load:', picURL);
        };
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
}

function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    document.getElementById('wall').innerHTML = '';
    wishes.forEach(wish => {
        addWish(wish.name, wish.text, wish.picURL, wish.id);
    });
}

function editWish(id) {
    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
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
    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    const wishIndex = wishes.findIndex(wish => wish.id === id);
    if (wishIndex !== -1) {
        wishes[wishIndex] = { id, name, text, picURL };
        localStorage.setItem('wishes', JSON.stringify(wishes));
    }
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
        confetti.style.animationDelay = `${Math.random() * 10}s`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random duration between 2s and 5s
        confetti.style.setProperty('--confetti-color', colors[Math.floor(Math.random() * colors.length)]);
        document.body.appendChild(confetti);
    }
}

// CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        background-color: var(--confetti-color);
        opacity: 0.7;
        animation-name: fall;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createConfetti();

// Load wishes when the page loads
window.onload = loadWishes;
