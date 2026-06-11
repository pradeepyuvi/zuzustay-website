window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Deliberate 1.2s preloader show time for premium feel
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1200);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // ZUZUStay Interactive Animation Hook
  console.log('ZUZUStay Coming Soon page loaded successfully.');
});
