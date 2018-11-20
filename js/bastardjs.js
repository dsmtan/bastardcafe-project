const template = document.querySelector("#eventtemplate").content;
const parent = document.querySelector(".eventwrapper");


const params = new URLSearchParams(window.location.search);





function getGameEvents() {
    fetch("http://mariaernst.com/kea/07cms/wordpress-huset/wp-json/wp/v2/events?categories=14&_embed&order=asc").then(res => res.json()).then(showEvents);
}

function showEvents(eventList) {
    eventList.forEach(event => {
        const copy = template.cloneNode(true);

        copy.querySelector("article").id = event.slug;
        copy.querySelector("h3").textContent = event.title.rendered;
        copy.querySelector("img").src = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;

        copy.querySelector(".shortdescr").innerHTML = event.content.rendered;
        copy.querySelector(".eventdate span").textContent = event.acf.date;
        copy.querySelector(".eventtime span").textContent = event.acf.time;

        if(event.acf.price = "0"){
            copy.querySelector(".eventprice span").textContent = "Free";
        } else {
        copy.querySelector(".eventprice span").textContent = event.acf.price;
        };



        /*copy.querySelector("a").href = "details.html?petid=" + pet.id;
        */


        parent.appendChild(copy);
    })
}

getGameEvents();
