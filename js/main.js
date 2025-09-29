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

// Функция для фильтрации проектов
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.querySelector('.projects-grid');
  
  // Добавляем обработчики для кнопок фильтров
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Убираем активный класс у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Фильтруем проекты
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Показываем проект
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.display = 'block';
          }, 300);
        } else {
          // Скрываем проект
          card.classList.add('hidden');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Анимация появления проектов при загрузке
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initGalleryFilters();
  animateProjects();
});

function updateProjectsCount() {
  const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');
  document.getElementById('visibleCount').textContent = visibleProjects.length;
}