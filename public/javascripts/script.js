document.addEventListener('DOMContentLoaded', function() {
    // Handle heart overlay for similar products
    const heartOverlays = document.querySelectorAll('.heart-overlay i');

    heartOverlays.forEach(heart => {
        heart.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior
            if (heart.classList.contains('far')) {
                heart.classList.remove('far');
                heart.classList.add('fas');
            } else {
                heart.classList.remove('fas');
                heart.classList.add('far');
            }
        });
    });

    // Handle heart overlay for unique product
    const heartOverlayUnique = document.querySelector('.heart-overlay-unique i');

    if (heartOverlayUnique) {
        heartOverlayUnique.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior
            if (heartOverlayUnique.classList.contains('far')) {
                heartOverlayUnique.classList.remove('far');
                heartOverlayUnique.classList.add('fas');
            } else {
                heartOverlayUnique.classList.remove('fas');
                heartOverlayUnique.classList.add('far');
            }
        });
    }

    // Handle accordion headers
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heartOverlay = document.querySelector('.heart-overlay-unique');

    heartOverlay.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action (scrolling to the top)
        heartOverlay.classList.toggle('filled'); // Toggle the 'filled' class
        const heartIcon = heartOverlay.querySelector('i');
        heartIcon.classList.toggle('fas'); // Change from 'far' to 'fas' for filled heart
        heartIcon.classList.toggle('far'); // Change from 'fas' to 'far' for empty heart
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heartOverlay = document.querySelector('.heart-overlay-unique');

    heartOverlay.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action (scrolling to the top)
        heartOverlay.classList.toggle('filled'); // Toggle the 'filled' class
        const heartIcon = heartOverlay.querySelector('i');
        heartIcon.classList.toggle('fas'); // Change from 'far' to 'fas' for filled heart
        heartIcon.classList.toggle('far'); // Change from 'fas' to 'far' for empty heart
    });
});

let currentIndex = 0;

function moveCarousel(direction) {
    const productGrid = document.querySelector('.product-grid');
    const productItems = document.querySelectorAll('.product-item');
    const itemWidth = productItems[0].offsetWidth + 20; // Adjust based on your margin/padding
    const visibleItems = 3; // Number of items visible at a time

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > productItems.length - visibleItems) {
        currentIndex = productItems.length - visibleItems;
    }

    productGrid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}
