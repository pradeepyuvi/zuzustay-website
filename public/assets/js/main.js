// Naadhe Core Logic

// 1. Preloader Screen Timeout
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 600);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Naadhe Interactive Animation Hook
  console.log('Naadhe Coming Soon page loaded successfully.');
});


