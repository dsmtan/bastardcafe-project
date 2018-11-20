const template = document.querySelector("#librarytemplate").content;
const parent = document.querySelector(".librarywrapper");
const filters = document.querySelector(".libraryfilters");

const params = new URLSearchParams(window.location.search);
const catID = params.get("catid");



getGames();

function getGames() {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/boardgames?_embed&order=asc").then(res => res.json()).then(showGames);
}

function showGames(gameList) {
    gameList.forEach(event => {
        const copy = template.cloneNode(true);

        copy.querySelector("article").id = event.slug;
        copy.querySelector("h3").textContent = event.title.rendered;

        /*        copy.querySelector("img").src = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;*/


        /*copy.querySelector("a").href = "details.html?petid=" + pet.id;
         */


        parent.appendChild(copy);
    })
}
