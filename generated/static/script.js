function prepare() {
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
}

function update(path, push = true) {
    fetch(path + "index.json")
        .then(resp => resp.json())
        .then(json => {
            document.title = "Wiki Robotech Nancy - " + json["title"];
            document.querySelector('meta[name="description"]').content = json["description"];

            let main = document.querySelector('.main');

            main.querySelector('.content').innerHTML = json["page_content"];
            main.querySelector('h2').innerText = json["uri"] || "Wiki Robotech Nancy";
            main.querySelector('h3').innerText = json["title"];

            if (push)
                window.history.pushState({}, '', path);

            prepare();
            window.scrollTo(0, 0);
            document.body.classList.remove('nav-open');
        })
        .catch(err => {
            console.log("Failed to fetch page: ", err);
        });
}

prepare();
let curPath = window.location.pathname;

document.querySelectorAll('a').forEach(a => {
    if ((a.href.baseVal || a.href).startsWith(window.location.origin)) {
        a.addEventListener('click', e => {
            e.preventDefault();

            if (a.href != window.location.href) {
                update(a.href);
            }
        });
    }
});

window.addEventListener('popstate', _ => {
    if (window.location.pathname != curPath) {
        update(window.location.href, false);
        curPath = window.location.pathname;
    }
});
