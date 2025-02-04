// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6YacOCKmLUAY5wVOroCGEGRNEEpG--Ag",
    authDomain: "celebration-wall-c9534.firebaseapp.com",
    projectId: "celebration-wall-c9534",
    storageBucket: "celebration-wall-c9534.firebasestorage.app",
    messagingSenderId: "676085234476",
    appId: "1:676085234476:web:b5af1ebdde34cf76f28a89",
    measurementId: "G-SBMC9V1SSL"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('wishForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const wishInput = document.getElementById('wishInput');
    const picInput = document.getElementById('picInput');
    const name = nameInput.value;
    const wishText = wishInput.value;
    const picURL = picInput.value;

    if (name && wishText) {
        const newWishRef = database.ref('wishes').push();
        newWishRef.set({
            name: name,
            text: wishText,
            picURL: picURL
        });
        nameInput.value = '';
        wishInput.value = '';
        picInput.value = '';
    }
});

function addWish(name, text, picURL, id) {
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
}

function loadWishes() {
    database.ref('wishes').on('value', (snapshot) => {
        const wishes = snapshot.val();
        document.getElementById('wall').innerHTML = '';
        for (let id in wishes) {
            addWish(wishes[id].name, wishes[id].text, wishes[id].picURL, id);
        }
    });
}

function editWish(id) {
    database.ref('wishes/' + id).once('value').then((snapshot) => {
        const wish = snapshot.val();
        document.getElementById('nameInput').value = wish.name;
        document.getElementById('wishInput').value = wish.text;
        document.getElementById('picInput').value = wish.picURL;
        document.getElementById('wishForm').dataset.editId = id;
        deleteWish(id);
    });
}

function updateWish(id, name, text, picURL) {
    database.ref('wishes/' + id).set({
        name: name,
        text: text,
        picURL: picURL
    });
}

function deleteWish(id) {
    database.ref('wishes/' + id).remove();
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
        confetti.style.setProperty('--confetti-color', colors[Math.floor(Math.random() * colors.length)]);
        document.body.appendChild(confetti);
    }
}

createConfetti();

// Load wishes when the page loads
window.onload = loadWishes;
