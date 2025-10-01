document.addEventListener("DOMContentLoaded", function () {
  const flipCard = document.getElementById("flipCard");
  const qrElements = document.querySelectorAll('.card__qr');
  const flipSound = new Audio("./sounds/woosh.mp3");
  

  if (flipCard) {
    flipCard.addEventListener("click", function (event) {
      this.classList.toggle("flipped");
      flipSound.play();
      clearTimeout(flipCard.returnTimer);
      if (this.classList.contains("flipped")) {
        flipCard.returnTimer = setTimeout(() => {
          this.classList.remove("flipped");
        }, 10000);
      }
    });
  }


  qrElements.forEach(qr => {
    qr.addEventListener('click', function(event) {
      event.stopPropagation();
      
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });

  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const overlay = document.querySelector('.header__overlay');
  const menuLinks = document.querySelectorAll('.header__menu-link');

  function handleScroll() {
    if (window.scrollY > 50) {
      burger.classList.add('scrolled');
    } else {
      burger.classList.remove('scrolled');
    }
  }

  function toggleMenu() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  }

  window.addEventListener('scroll', handleScroll);
  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 480) {
        toggleMenu();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 480) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  handleScroll();
});

function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        const fill = entry.target.querySelector('.progress-bar__fill');
        
        setTimeout(() => {
          fill.style.width = progress + '%';
        }, 300);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateProgressBars);

function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.querySelector('.projects-grid');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.display = 'block';
          }, 300);
        } else {
          card.classList.add('hidden');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function animateProjects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initGalleryFilters();
  animateProjects();
});

function updateProjectsCount() {
  const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');
  document.getElementById('visibleCount').textContent = visibleProjects.length;
}

function initModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const contactForm = document.getElementById('contactForm');
  const ctaButtons = document.querySelectorAll('.main__cta-btn:not(.main__cta-btn--primary)');

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    alert(`Сообщение отправлено!\n\nИмя: ${data.name}\nEmail: ${data.email}\nСообщение: ${data.message}`);
    
    closeModal();
    
    this.reset();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initModal();
});

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const burger = document.querySelector('.header__burger');
      const menu = document.querySelector('.header__menu');
      const overlay = document.querySelector('.header__overlay');
      
      if (burger && burger.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

function updateScrollHandler() {
  const header = document.querySelector('.header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

