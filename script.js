// Grab DOM elements
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const categoryButtons = document.querySelectorAll('.categories button');

let currentIndex = 0;
let filteredItems = Array.from(galleryItems); // Initially all

// Open lightbox with selected image
function openLightbox(index) {
  currentIndex = index;
  const imgSrc = filteredItems[currentIndex].querySelector('img').src;
  lightboxImg.src = imgSrc;
  lightbox.classList.remove('hidden');
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.add('hidden');
}

// Show next image
function showNext() {
  currentIndex = (currentIndex + 1) % filteredItems.length;
  lightboxImg.src = filteredItems[currentIndex].querySelector('img').src;
}

// Show previous image
function showPrev() {
  currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
  lightboxImg.src = filteredItems[currentIndex].querySelector('img').src;
}

// Click on gallery item to open lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    openLightbox(index);
  });
});

// Close button click
closeBtn.addEventListener('click', closeLightbox);

// Navigation buttons
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Close lightbox on outside click
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Filter images by category
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    filteredItems = filter === 'all'
      ? Array.from(galleryItems)
      : Array.from(galleryItems).filter(item => item.dataset.category === filter);

    // Hide all
    galleryItems.forEach(item => item.style.display = 'none');
    // Show filtered
    filteredItems.forEach(item => item.style.display = 'block');
  });
});
