const root = document.documentElement;
const heroPanel = document.querySelector('.hero-panel');
const cards = document.querySelectorAll('.mini-card, .book-cover');

if (heroPanel) {
  heroPanel.animate(
    [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    {
      duration: 850,
      easing: 'ease-out',
      fill: 'forwards'
    }
  );
}

cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 90}ms`;
  card.classList.add('fade-up');
});
