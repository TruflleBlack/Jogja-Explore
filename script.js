document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Highlight active navbar item based on scroll position
const sections = document.querySelectorAll('section'); // Semua bagian
const navLinks = document.querySelectorAll('.nav-links .nav-item'); // Semua tautan navbar

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80; // 80px untuk menyesuaikan tinggi navbar
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id'); // Ambil id dari bagian yang sedang aktif
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); // Hapus kelas aktif sebelumnya
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active'); // Tambahkan kelas aktif ke tautan sesuai bagian
        }
    });
});


// JavaScript for carousel
let currentIndexes = {}; // Track current index for each section

function moveCarousel(sectionId, direction) {
    const section = document.querySelector(`#${sectionId}`);
    if (!section) return; // Stop if section does not exist

    const cards = section.querySelectorAll('.card');
    const container = section.querySelector('.cards');
    if (!cards.length || !container) return; // Stop if no cards or container

    const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
    currentIndexes[sectionId] = currentIndexes[sectionId] || 0; // Initialize if undefined

    // Update current index
    currentIndexes[sectionId] += direction;

    // Boundary check
    if (currentIndexes[sectionId] < 0) {
        currentIndexes[sectionId] = 0;
    } else if (currentIndexes[sectionId] >= cards.length) {
        currentIndexes[sectionId] = cards.length - 1;
    }

    // Scroll the container
    container.scrollTo({
        left: currentIndexes[sectionId] * cardWidth,
        behavior: 'smooth',
    });

    // Update dots
    updateDots(sectionId);
}

function moveToSlide(sectionId, index) {
    const section = document.querySelector(`#${sectionId}`);
    if (!section) return; // Stop if section does not exist

    const cards = section.querySelectorAll('.card');
    const container = section.querySelector('.cards');
    if (!cards.length || !container) return; // Stop if no cards or container

    const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
    currentIndexes[sectionId] = index; // Set current index

    container.scrollTo({
        left: currentIndexes[sectionId] * cardWidth,
        behavior: 'smooth',
    });

    // Update dots
    updateDots(sectionId);
}

function updateDots(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (!section) return; // Stop if section does not exist

    const dots = section.querySelectorAll('.dot');
    if (!dots.length) return; // Stop if no dots

    dots.forEach((dot, i) => {
        if (i === currentIndexes[sectionId]) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
