function preFetch() {
    loader.classList.add('active');
}

function updateWithJSON(json) {
    document.title = "Wiki Robotech Nancy - " + json["title"];
    document.querySelector('meta[name="description"]').content = json["description"];

    let main = document.querySelector('.main');

    main.querySelector('.content').innerHTML = json["page_content"];
    main.querySelector('h2').innerText = json["uri"] || "Wiki Robotech Nancy";
    main.querySelector('h3').innerText = json["title"];
}

function postFetch() {
    document.querySelectorAll("h3").forEach(h3 => {
        if (h3.classList.contains("no-anchor"))
            return;
    
        h3.id = h3.textContent
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        h3.addEventListener("click", e => {
            history.pushState(null, null, "#" + e.target.id);
            navigator.clipboard.writeText(window.location.href);
            e.target.scrollIntoView();
        });
    });

    window.scrollTo(0, 0);
    document.body.classList.remove('nav-open');

}
