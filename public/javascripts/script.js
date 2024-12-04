document.addEventListener('DOMContentLoaded', function() {
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
});

document.addEventListener('DOMContentLoaded', function() {
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

