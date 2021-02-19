let main = document.querySelector("main");
let footer = document.querySelector("footer");
let cookiesBtn = document.querySelector("#cookiesBtn");
let selector = document.querySelector("select");


const state = {
    baseURL: "https://www.theaudiodb.com/api/v1/json/",
    key: "523532",
    pathTo: "/searchalbum.php?s=queen"
}

async function getData() {
    const response = await fetch(`${state.baseURL}${state.key}${state.pathTo}`);
    return await response.json();
}


function renderCards(album) {
    album.forEach(element => {
        let card = document.createElement("div");
        let cover = document.createElement("img");
        let description = document.createElement("h2")
        card.classList.add("albumCard");
        main.appendChild(card);
        if (element.strAlbumThumb) {
            cover.src = element.strAlbumThumb;
        }
        else {
            cover.src = "https://www.brdtex.com/wp-content/uploads/2019/09/no-image-480x480.png";
        }
        card.appendChild(cover);
        description.textContent = `${element.strAlbum} - ${element.intYearReleased}`;
        card.appendChild(description);
    });
}

async function renderAlbums() {
    //Svuoto il main in modo da non accumulare le selezioni
    main.innerHTML = "";
    let selection = document.getElementById('typeof').value;
    let discographyToShow = [];
    const discography = await getData();
    //Ordino per data di pubblicazione
    discography.album.sort(function (a, b) {
        return a.intYearReleased - b.intYearReleased;
    });
    //Switch che lega il select HTML a un filtro per formato
    switch (selection) {
        case "fullDiscography":
            renderCards(discography.album);
            break;
        case "Album":
            discographyToShow = discography.album.filter(element => element.strReleaseFormat === "Album")
            renderCards(discographyToShow);
            break;
        case "Single":
            discographyToShow = discography.album.filter(element => element.strReleaseFormat === "Single")
            renderCards(discographyToShow);
            break;
        case "Compilation":
            discographyToShow = discography.album.filter(element => element.strReleaseFormat === "Compilation")
            renderCards(discographyToShow);
            break;
    }
}

function hidefooter() {
    footer.classList.add("hidden");
}

cookiesBtn.addEventListener("click", hidefooter, { once: true });
document.addEventListener("DOMContentLoaded", renderAlbums);
selector.addEventListener("change", renderAlbums);