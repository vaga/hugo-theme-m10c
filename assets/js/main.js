document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".lightbox-image");
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    const title = document.createElement("div");
    title.classList.add("title");
    lightbox.appendChild(title);

    const img = document.createElement("img");
    lightbox.appendChild(img);

    const closeButton = document.createElement("button");
    closeButton.innerText = "×";
    closeButton.classList.add("close");
    lightbox.appendChild(closeButton);

    galleryItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const imgSrc = item.getAttribute("href");
            const imgTitle = item.getAttribute("title");
            img.setAttribute("src", imgSrc);
            title.innerText = imgTitle;
            lightbox.classList.add("active");
        });
    });

    closeButton.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== img && e.target !== title) {
            lightbox.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll("h2, h3, h4, h5, h6")
        .forEach(function (header) {
            if (header.id) {
                var wrap = document.createElement("a");
                wrap.href = "#" + header.id;
                wrap.classList.add("header-link");

                while (header.firstChild) {
                    wrap.appendChild(header.firstChild);
                }

                header.appendChild(wrap);
            }
        });
});

function toggleExpand(element) {
    const expandableBox = element.closest('.expandable-box');
    expandableBox.classList.toggle('expanded');
    element.classList.toggle('expanded');
}

document.addEventListener("DOMContentLoaded", function () {
    const sidebarContent = document.querySelector(".sidebar-content");

    // Check if sidebarContent exists and is visible
    if (sidebarContent && sidebarContent.offsetParent !== null) {
        const tocLinks = document.querySelectorAll(".sidebar-toc a");
        const headings = Array.from(
            document.querySelectorAll("h2, h3, h4, h5, h6"),
        );

        function activateLink(link) {
            tocLinks.forEach((tocLink) => tocLink.classList.remove("active"));
            if (link) {
                link.classList.add("active");
            }
        }

        function markScrolledPastLinks() {
            let fromTop = window.scrollY + 10;

            headings.forEach((heading, index) => {
                const link = tocLinks[index];

                if (link) {
                    if (
                        heading &&
                        heading.offsetTop - 40 <= fromTop
                    ) {
                        activateLink(link);
                    } else if (!heading && heading.offsetTop - 40 <= fromTop) {
                        activateLink(link);
                    }

                    if (heading.offsetTop + heading.offsetHeight <= fromTop) {
                        link.classList.add("scrolled-past");
                    } else {
                        link.classList.remove("scrolled-past");
                    }
                }
            });
        }

        window.addEventListener("scroll", markScrolledPastLinks);
        markScrolledPastLinks(); // Call once to set the initial state

        // Ensure the clicked header is highlighted
        tocLinks.forEach((link) => {
            link.addEventListener("click", function () {
                activateLink(this);
            });
        });
    }
});

