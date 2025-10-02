// Preloader functionality
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const progressBar = document.querySelector(".preloader__progress-bar");
  const body = document.body;

  body.classList.add("loading");

  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 2.5; // 100% за 2000ms с интервалом 50ms
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => hidePreloader(preloader, body), 300);
    }
    progressBar && (progressBar.style.width = progress + "%");
  }, 50);

  window.addEventListener("load", () => {
    clearInterval(progressInterval);
    progressBar && (progressBar.style.width = "100%");
    setTimeout(() => hidePreloader(preloader, body), 500);
  });
}

function hidePreloader(preloader, body) {
  preloader.classList.add("hidden");
  body.classList.remove("loading");
  setTimeout(() => preloader.remove(), 500);
}

// Card functionality
function initCardFlip() {
  const flipCard = document.getElementById("flipCard");
  const flipSound = new Audio("./sounds/woosh.mp3");

  flipCard?.addEventListener("click", function (e) {
    if (e.target.closest(".card__qr")) return;

    this.classList.toggle("flipped");
    flipSound.play().catch(() => {});

    clearTimeout(this.returnTimer);
    if (this.classList.contains("flipped")) {
      this.returnTimer = setTimeout(
        () => this.classList.remove("flipped"),
        10000
      );
    }
  });

  // QR code animation
  document.querySelectorAll(".card__qr").forEach((qr) => {
    qr.addEventListener("click", function (e) {
      e.stopPropagation();
      this.style.transform = "scale(0.95)";
      setTimeout(() => (this.style.transform = "scale(1)"), 150);
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const elements = {
    burger: document.querySelector(".header__burger"),
    menu: document.querySelector(".header__menu"),
    overlay: document.querySelector(".header__overlay"),
    links: document.querySelectorAll(".header__menu-link"),
  };

  if (!elements.burger) return;

  const toggleMenu = () => {
    const isActive = elements.burger.classList.toggle("active");
    elements.menu.classList.toggle("active");
    elements.overlay.classList.toggle("active");
    document.body.style.overflow = isActive ? "hidden" : "";
  };

  // Event handlers
  elements.burger.addEventListener("click", toggleMenu);
  elements.overlay.addEventListener("click", toggleMenu);

  elements.links.forEach((link) => {
    link.addEventListener(
      "click",
      () => window.innerWidth <= 480 && toggleMenu()
    );
  });

  // Scroll handler
  const scrollHandler = () => {
    elements.burger.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", scrollHandler);
  scrollHandler();

  // Resize handler
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 480 &&
      elements.burger.classList.contains("active")
    ) {
      toggleMenu();
    }
  });
}

// Progress bars animation
function animateProgressBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute("data-progress");
          const fill = entry.target.querySelector(".progress-bar__fill");
          setTimeout(() => (fill.style.width = progress + "%"), 300);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll(".progress-bar")
    .forEach((bar) => observer.observe(bar));
}

// Gallery filters
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  const style = document.createElement("style");
  style.textContent = `
    .project-card {
      transition: all 0.4s ease-in-out;
    }
    .project-card.hidden {
      opacity: 0;
      transform: scale(0.9);
      height: 0;
      margin: 0;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filterValue = this.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");
        const shouldShow =
          filterValue === "all" || categories.includes(filterValue);

        if (shouldShow) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Projects animation
function animateProjects() {
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Modal functionality
function initModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const contactForm = document.getElementById("contactForm");

  const openModal = () => {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Event handlers
  document
    .querySelectorAll(".main__cta-btn:not(.main__cta-btn--primary)")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener(
    "click",
    (e) => e.target === modalOverlay && closeModal()
  );
  document.addEventListener(
    "keydown",
    (e) =>
      e.key === "Escape" &&
      modalOverlay.classList.contains("active") &&
      closeModal()
  );

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    alert(
      `Сообщение отправлено!\n\nИмя: ${formData.get(
        "name"
      )}\nEmail: ${formData.get("email")}\nСообщение: ${formData.get(
        "message"
      )}`
    );
    closeModal();
    contactForm.reset();
  });
}

// Smooth scroll functionality
function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href");
    if (targetId === "#" || targetId === "#scrollToTop") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    // Close mobile menu if open
    const burger = document.querySelector(".header__burger");
    if (burger?.classList.contains("active")) {
      burger.classList.remove("active");
      document.querySelector(".header__menu").classList.remove("active");
      document.querySelector(".header__overlay").classList.remove("active");
      document.body.style.overflow = "";
    }

    // Calculate scroll position
    const headerHeight = document.querySelector(".header").offsetHeight;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  });
}

// Scroll to top button
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (!scrollToTopBtn) return;

  const toggleButton = () => {
    scrollToTopBtn.classList.toggle(
      "visible",
      window.scrollY > window.innerHeight * 0.5
    );
  };

  scrollToTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  scrollToTopBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  window.addEventListener("scroll", toggleButton);
  toggleButton();
}

// Header scroll effect
function updateScrollHandler() {
  const header = document.querySelector(".header");
  const handleScroll = () =>
    header.classList.toggle("scrolled", window.scrollY > 50);
  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

// SEO analytics (simplified)
const seoAnalytics = {
  init: () => {
    // Track project clicks
    document.addEventListener("click", (e) => {
      const projectLink = e.target.closest(".project-link");
      if (projectLink) {
        const projectName = projectLink
          .closest(".project-card")
          ?.querySelector(".project-card__title")?.textContent;
        console.log(`Project clicked: ${projectName}`);
      }
    });
  },
};

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  initPreloader();
  initCardFlip();
  initMobileMenu();
  animateProgressBars();
  initGalleryFilters();
  animateProjects();
  initModal();
  initSmoothScroll();
  initScrollToTop();
  updateScrollHandler();
  seoAnalytics.init();
});
