document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    wrapHeadersWithLinks();
    setupExpandableBoxes();
    setupSidebarTOC();
});

function initLightbox() {
    const galleryItems = document.querySelectorAll(".lightbox-image");
    const lightbox = createLightbox();

    galleryItems.forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            const imgSrc = item.getAttribute("href");
            const imgTitle = item.getAttribute("title");
            updateLightbox(lightbox, imgSrc, imgTitle);
        });
    });

    lightbox.querySelector(".close").addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", e => {
        if (e.target.tagName !== "IMG" && e.target.className !== "title") {
            lightbox.classList.remove("active");
        }
    });
}

function createLightbox() {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    const title = document.createElement("div");
    title.classList.add("title");
    lightbox.appendChild(title);

    const img = document.createElement("img");
    lightbox.appendChild(img);

    const closeButton = document.createElement("button");
    closeButton.innerText = "×";
    closeButton.classList.add("close");
    lightbox.appendChild(closeButton);

    document.body.appendChild(lightbox);

    return lightbox;
}

function updateLightbox(lightbox, imgSrc, imgTitle) {
    const img = lightbox.querySelector("img");
    const title = lightbox.querySelector(".title");

    img.setAttribute("src", imgSrc);
    title.innerText = imgTitle;
    lightbox.classList.add("active");
}

function wrapHeadersWithLinks() {
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach(header => {
        if (header.id) {
            const wrap = document.createElement("a");
            wrap.href = `#${header.id}`;
            wrap.classList.add("header-link");

            while (header.firstChild) {
                wrap.appendChild(header.firstChild);
            }

            header.appendChild(wrap);
        }
    });
}

function toggleExpand(element) {
    const expandableBox = element.closest('.expandable-box');
    expandableBox.classList.toggle('expanded');
    element.classList.toggle('expanded');
}

function setupSidebarTOC() {
    const sidebarContent = document.querySelector(".sidebar-content");

    if (sidebarContent && sidebarContent.offsetParent !== null) {
        const tocLinks = document.querySelectorAll(".sidebar-toc a");
        const headings = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));

        window.addEventListener("scroll", () => markScrolledPastLinks(headings, tocLinks));
        markScrolledPastLinks(headings, tocLinks);

        tocLinks.forEach(link => {
            link.addEventListener("click", function () {
                activateLink(tocLinks, this);
            });
        });
    }
}

function activateLink(tocLinks, link) {
    tocLinks.forEach(tocLink => tocLink.classList.remove("active"));
    if (link) {
        link.classList.add("active");
    }
}

function markScrolledPastLinks(headings, tocLinks) {
    let fromTop = window.scrollY + 10;

    headings.forEach((heading, index) => {
        const link = tocLinks[index];

        if (link) {
            if (heading.offsetTop - 40 <= fromTop) {
                activateLink(tocLinks, link);
            }
            if (heading.offsetTop + heading.offsetHeight <= fromTop) {
                link.classList.add("scrolled-past");
            } else {
                link.classList.remove("scrolled-past");
            }
        }
    });
}
