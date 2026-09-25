document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('dotsWrap');
  const cards = document.querySelectorAll('.diploma-card');

  let currentIndex = 0;

  // Calculăm câte carduri încap pe ecran
  function getVisibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  // Generare puncte (dots)
  function createDots() {
    dotsWrap.innerHTML = '';
    const totalDots = getMaxIndex() + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = `dot ${i === currentIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsWrap.appendChild(dot);
    }
  }

  // Actualizare deplasare carusel
  function updateCarousel() {
    if (!cards.length) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24; // valoarea gap-ului din CSS
    const moveAmount = (cardWidth + gap) * currentIndex;
    
    track.style.transform = `translateX(-${moveAmount}px)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : getMaxIndex();
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex < getMaxIndex() ? currentIndex + 1 : 0;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    if (currentIndex > getMaxIndex()) {
      currentIndex = getMaxIndex();
    }
    createDots();
    updateCarousel();
  });

  // Swipe pe mobil
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 45) {
      nextBtn.click();
    } else if (endX - startX > 45) {
      prevBtn.click();
    }
  });

  createDots();

  // --- Modal Lightbox ---
  const modal = document.getElementById('diplomaModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalIssuer = document.getElementById('modalIssuer');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(title, issuer, imgSrc) {
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalIssuer.innerText = issuer;
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  // Deschidere modal din dataset-ul cardului
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const issuer = card.getAttribute('data-issuer');
      const img = card.getAttribute('data-img');
      openModal(title, issuer, img);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
