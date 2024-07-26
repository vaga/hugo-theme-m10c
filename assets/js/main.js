document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    wrapHeadersWithLinks();
    setupSidebarTOC();
});

function initLightbox() {
    const galleryItems = document.querySelectorAll(".lightbox-image");
    const lightbox = createLightbox();
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", e => {
            e.preventDefault();
            currentIndex = index;
            const imgSrc = item.getAttribute("href");
            const imgTitle = item.getAttribute("title");
            updateLightbox(lightbox, imgSrc, imgTitle, currentIndex, galleryItems.length);
        });
    });

    lightbox.querySelector(".close").addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox.querySelector("img").addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    document.addEventListener("keydown", e => {
        if (lightbox.classList.contains("active")) {
            if (e.key === "ArrowRight" || e.key === "l") {
                navigateLightbox(1);
            } else if (e.key === "ArrowLeft" || e.key === "h") {
                navigateLightbox(-1);
            } else if (e.key === "Escape") {
                lightbox.classList.remove("active");
            }
        }
    });

    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        const currentItem = galleryItems[currentIndex];
        const imgSrc = currentItem.getAttribute("href");
        const imgTitle = currentItem.getAttribute("title");
        updateLightbox(lightbox, imgSrc, imgTitle, currentIndex, galleryItems.length);
    }
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

function updateLightbox(lightbox, imgSrc, imgTitle, currentIndex, totalItems) {
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
