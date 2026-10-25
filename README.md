document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.href === window.location.href.replace(/\/$/, '')) {
      link.classList.add('active');
    }
  });
});
