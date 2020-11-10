const url = 'https://jsonplaceholder.typicode.com/';
const photoUrl = 'photos';
let photoHistory = [];

let photoContainer = document.querySelector('.photo-container');
let request = document.querySelector('#request');
let add = document.querySelector('#add');
let photoInput = document.querySelector('#photoInput');

request.addEventListener('click', main);
photoInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        main()
    } else {
        event.preventDefault()
    }
});

async function main() {
    let id = photoInput.value;

    if (!isNaN(id)) {
        photoInput.disabled = true;

        const response = await fetch(`${url}${photoUrl}/${id}`);
        const fetchedImg = await response.json();
        const {image, data} = await loadImage(fetchedImg);

        console.log(fetchedImg);

        photoContainer.append(image);
        photoHistory.push(data);

        photoInput.disabled = false;
        photoInput.focus();
    }
}

function loadImage(data) {
    return new Promise(function (resolve, reject) {
        let image = new Image();
        image.src = data.url;
        image.onload = () => resolve({
            image,
            data
        });
        image.onerror = () => reject();
    })
}

let newPhoto = {
    albumId: 1,
    id: 1,
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952"
}

async function addPhoto(imgObj) {
    try {
        imgObj = JSON.stringify(imgObj);

        const response = await fetch(`${url}${photoUrl}/${newPhoto.id}`, { method: 'PUT', body: imgObj});

        console.log(response);
    } catch (error) {
        console.error(error)
    }
}

add.onclick = () => {
    addPhoto(newPhoto);
}