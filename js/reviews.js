const template = document.querySelector("#reviewtemplate").content;
const parent = document.querySelector(".reviewwrapper");
const filters = document.querySelector(".dropdown-content");


const params = new URLSearchParams(window.location.search);
const catID = params.get("catid");


loadCategories();

function loadCategories() {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/categories?parent=53").then(e => e.json()).then(createFilter);
}

function createFilter(categories) {
    categories.forEach(cat => {
        const newA = document.createElement("a");
        newA.textContent = cat.name;
        newA.href = "?catid=" + cat.id;
        newA.id = cat.name;
        filters.appendChild(newA);
    })
}

if (catID) {
    loadEventsbyCategory(catID);
} else {
    getGames();
}

function loadEventsbyCategory(catID) {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/boardgames?categories=" + catID + "&_embed").then(e => e.json()).then(showGames);
}



function getGames() {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/boardgames?_embed&per_page=100&order=asc").then(res => res.json()).then(showGames);
}

function showGames(gameList) {
    gameList.forEach(game => {
        const copy = template.cloneNode(true);

        copy.querySelector("article").id = game.slug;
        copy.querySelector("h3").textContent = game.title.rendered;

        copy.querySelector("img").src = game._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;


        /*copy.querySelector("a").href = "details.html?petid=" + pet.id;
         */

        parent.appendChild(copy);
    })


}






let dropBtn = document.querySelector(".dropbtn");
let closeFilter = document.querySelector(".closeFilter");
let dropdownBox = document.querySelector(".dropdown-content");

dropBtn.addEventListener("click", showFilters);

function showFilters() {
    dropdownBox.classList.toggle("show");
}

