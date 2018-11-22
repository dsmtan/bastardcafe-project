const template = document.querySelector("#reviewtemplate").content;
const parent = document.querySelector(".reviewwrapper");
const filters = document.querySelector(".dropdown-content");

const params = new URLSearchParams(window.location.search);
const catID = params.get("catid");
const gameID = params.get("gameid");


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
    loadGamesbyCategory(catID);
} else if (gameID) {
    loadGamesbyID(gameID);
} else {
    getGames();
}

function loadGamesbyCategory(catID) {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/boardgames?categories=" + catID + "&_embed").then(e => e.json()).then(showGames);
}


function loadGamesbyID(gameID) {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/boardgames/" + gameID + "?_embed").then(e => e.json()).then(showSingleGame);
}

function showSingleGame(singlegame) {
    template.querySelector("article").id = singlegame.id;
    template.querySelector("h3").textContent = singlegame.title.rendered;

    template.querySelector("img").src = singlegame._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    template.querySelector(".difficulty span").textContent = singlegame.acf.difficulty;
    template.querySelector(".duration span").textContent = singlegame.acf.game_duration;
    template.querySelector(".players span").textContent = singlegame.acf.players;
    template.querySelector(".designer span").textContent = singlegame.acf.designer;

    template.querySelector(".reviewtext").innerHTML = singlegame.content.rendered;


    if (singlegame.acf.rating == "2") {
        template.querySelector(".rating-img").style.backgroundImage = "url('images/2stars.png')";
    } else if (singlegame.acf.rating == "3") {
        template.querySelector(".rating-img").style.backgroundImage = "url('images/3stars.png')";
    } else if (singlegame.acf.rating == "4") {
        template.querySelector(".rating-img").style.backgroundImage = "url('images/4stars.png')";
    } else if (singlegame.acf.rating == "5") {
        template.querySelector(".rating-img").style.backgroundImage = "url('images/5stars.png')";
    }

    parent.appendChild(template);
}



function getGames() {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/boardgames?_embed&per_page=100&order=asc").then(res => res.json()).then(showGames);
}


function showGames(gameList) {
    gameList.forEach(game => {
        const copy = template.cloneNode(true);

        copy.querySelector("article").id = game.id;
        copy.querySelector("h3").textContent = game.title.rendered;

        copy.querySelector("img").src = game._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

        copy.querySelector(".difficulty span").textContent = game.acf.difficulty;
        copy.querySelector(".duration span").textContent = game.acf.game_duration;
        copy.querySelector(".players span").textContent = game.acf.players;
        copy.querySelector(".designer span").textContent = game.acf.designer;

        copy.querySelector(".reviewtext").innerHTML = game.content.rendered;


        if (game.acf.rating == "2") {
            copy.querySelector(".rating-img").style.backgroundImage = "url('images/2stars.png')";
        } else if (game.acf.rating == "3") {
            copy.querySelector(".rating-img").style.backgroundImage = "url('images/3stars.png')";
        } else if (game.acf.rating == "4") {
            copy.querySelector(".rating-img").style.backgroundImage = "url('images/4stars.png')";
        } else if (game.acf.rating == "5") {
            copy.querySelector(".rating-img").style.backgroundImage = "url('images/5stars.png')";
        }

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
