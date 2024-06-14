document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.lightbox-image');
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  document.body.appendChild(lightbox);

  const title = document.createElement('div');
  title.classList.add('title');
  lightbox.appendChild(title);

  const img = document.createElement('img');
  lightbox.appendChild(img);

  const closeButton = document.createElement('button');
  closeButton.innerText = '×';
  closeButton.classList.add('close');
  lightbox.appendChild(closeButton);

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = item.getAttribute('href');
      const imgTitle = item.getAttribute('title');
      img.setAttribute('src', imgSrc);
      title.innerText = imgTitle;
      lightbox.classList.add('active');
    });
  });

  closeButton.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== img && e.target !== title) {
      lightbox.classList.remove('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (header) {
        if (header.id) {
            var wrap = document.createElement('a');
            wrap.href = '#' + header.id;
            wrap.classList.add('header-link');

            while (header.firstChild) {
                wrap.appendChild(header.firstChild);
            }

            header.appendChild(wrap);
        }
    });
});

function toggleExpand(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        arrow.classList.add('down');
    } else {
        content.style.display = "none";
        arrow.classList.remove('down');
    }
}