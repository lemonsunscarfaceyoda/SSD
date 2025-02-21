// Get all section elements
const sections = document.querySelectorAll('section');

// Track scroll speed
let lastScrollY = window.scrollY;
let lastTimestamp = 0;
let isScrolling = false;

// Function to change the background opacity based on scroll speed
function changeOpacityOnScroll() {
    const currentScrollY = window.scrollY;
    const currentTimestamp = Date.now();

    // Calculate time difference
    const timeDiff = currentTimestamp - lastTimestamp;

    // Calculate scroll speed in pixels per millisecond
    const scrollSpeed = Math.abs(currentScrollY - lastScrollY) / timeDiff;

    // Calculate opacity based on scroll speed, and limit it to 0.6
    let opacity = Math.max(0.6, 1 - scrollSpeed * 0.04); // Adjust multiplier (2 for slower change)

    // Apply the new background opacity to all sections
    sections.forEach(section => {
        section.style.backgroundColor = `rgba(244, 244, 244, ${opacity})`; // Update opacity for each section
    });

    // Update last values for next calculation
    lastScrollY = currentScrollY;
    lastTimestamp = currentTimestamp;
}

// Listen for the scroll event
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
            changeOpacityOnScroll();
            isScrolling = false;
        });
    }
});

// Reset the opacity when scrolling stops
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        sections.forEach(section => {
            section.style.backgroundColor = 'rgba(244, 244, 244, 0.99)'; // Reset opacity to default
        });
    }, 200); // Delay before resetting (in ms)
});
