document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const toggleInput = document.getElementById("theme-toggle");
  const root = document.documentElement;

  if (root.getAttribute("data-theme") === "dark") {
    toggleInput.checked = true;
  }

  toggleInput.addEventListener("change", () => {
    const newTheme = toggleInput.checked ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
  });

  // Typed text
  const typedText = document.getElementById("typed-text");
  const words = ["Momentum", "Impact", "Change"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedText.textContent = currentWord.substring(0, charIndex--);
    } else {
      typedText.textContent = currentWord.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 60 : 120;
    setTimeout(type, typingSpeed);
  }
  type();

  // Hamburger menu
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open");
  });

  // Scroll-activated quote lines
  const quoteLines = document.querySelectorAll(".quote-line");
  let currentLine = 0;

  function revealNextLine() {
    if (currentLine < quoteLines.length) {
      quoteLines[currentLine].classList.add("visible");
      currentLine++;
    }
  }

  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      revealNextLine();
    }
  });

  if (quoteLines.length) {
    quoteLines[0].classList.add("visible");
    currentLine = 1;
  }

  // Read more toggle
  const readMoreBtn = document.getElementById("read-more-btn");
  const hiddenParagraph = document.querySelector(".more-text");

  if (readMoreBtn && hiddenParagraph) {
    readMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      hiddenParagraph.classList.toggle("show");
      readMoreBtn.textContent = hiddenParagraph.classList.contains("show")
        ? "Show Less"
        : "Read More";
    });
  }

  // Slide animation for Our Story section
  const storyLeft = document.querySelector(".story-left");
  const storyRight = document.querySelector(".story-right");
  const ourStorySection = document.querySelector(".our-story-section");

  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let isVisible = false;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = ourStorySection.offsetTop;
    const sectionHeight = ourStorySection.offsetHeight;

    if (!storyLeft || !storyRight) return;

    const isInView =
      currentScroll >= sectionTop - window.innerHeight / 2 &&
      currentScroll < sectionTop + sectionHeight;

    if (currentScroll > lastScrollTop && isInView && !isVisible) {
      // Scrolling down into view → slide in
      storyLeft.classList.add("slide-in");
      storyRight.classList.add("slide-in");
      storyLeft.classList.remove("slide-out-left");
      storyRight.classList.remove("slide-out-right");
      isVisible = true;
    } else if (currentScroll < lastScrollTop && isVisible && !isInView) {
      // Scrolling up past view → slide out
      storyLeft.classList.remove("slide-in");
      storyRight.classList.remove("slide-in");
      storyLeft.classList.add("slide-out-left");
      storyRight.classList.add("slide-out-right");
      isVisible = false;
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
// Mission/Vision Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  const mvBoxes = document.querySelectorAll(".mv-box");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  mvBoxes.forEach((box) => observer.observe(box));
});
document.querySelectorAll(".testimonial-card").forEach((card) => {
  const track = card.closest(".testimonial-track");
  let pauseTimeout;
  let resumeTimeout;

  card.addEventListener("mouseenter", () => {
    clearTimeout(resumeTimeout);
    pauseTimeout = setTimeout(() => {
      track.style.animationPlayState = "paused";
    }, 100); // Add slight delay before pausing
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(pauseTimeout);
    resumeTimeout = setTimeout(() => {
      track.style.animationPlayState = "running";
    }, 100); // Add slight delay before resuming
  });
});

// services

document.querySelectorAll('.service-card').forEach(card => {
  const toggleBtn = card.querySelector('.pill-toggle');
  const dropdown = card.querySelector('.pill-dropdown');
  const header = card.querySelector('.pill-header');

  const toggleDropdown = () => {
    dropdown.classList.toggle('active');
    dropdown.classList.toggle('hidden');
    if (toggleBtn) toggleBtn.textContent = toggleBtn.textContent === '+' ? '×' : '+';
  };

  if (header) header.addEventListener('click', toggleDropdown);
  if (toggleBtn) toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality (from previous step)
    const activeServiceCards = document.querySelectorAll('.service-card:not(.coming-soon)');

    activeServiceCards.forEach(card => {
        const header = card.querySelector('.card-header');
        header.addEventListener('click', () => {
            card.classList.toggle('open');
        });

        // --- NEW: Add this section for tag interactivity ---
        const tags = card.querySelectorAll('.card-tags span');
        tags.forEach(clickedTag => {
            clickedTag.addEventListener('click', (event) => {
                // Prevent the click from bubbling up and closing the accordion
                event.stopPropagation();

                // Remove .active class from all tags within this card
                tags.forEach(tag => {
                    tag.classList.remove('active');
                });

                // Add .active class to the clicked tag
                clickedTag.classList.add('active');

                // Here you can add logic to change the content
                // in .card-main based on the clickedTag.textContent
                console.log(`Switched to: ${clickedTag.textContent}`);
            });
        });
        // --- End of new section ---
    });
});

  document.addEventListener("DOMContentLoaded", () => {
  // === Theme Toggle ===
  const toggleInput = document.getElementById("theme-toggle");
  const root = document.documentElement;
  if (toggleInput && root.getAttribute("data-theme") === "dark") {
    toggleInput.checked = true;
    toggleInput.addEventListener("change", () => {
      const newTheme = toggleInput.checked ? "dark" : "light";
      root.setAttribute("data-theme", newTheme);
    });
  }

  // === Login/Register Toggle ===
  const loginToggle = document.getElementById("loginToggle");
  const registerToggle = document.getElementById("registerToggle");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginToggle && registerToggle && loginForm && registerForm) {
    loginToggle.addEventListener("click", () => {
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");
      loginToggle.classList.add("active");
      registerToggle.classList.remove("active");
    });

    registerToggle.addEventListener("click", () => {
      registerForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      registerToggle.classList.add("active");
      loginToggle.classList.remove("active");
    });
  }

  // === Learner/Coach Toggle ===
  const learnerToggle = document.getElementById("learnerToggle");
  const coachToggle = document.getElementById("coachToggle");
  const coachFields = document.getElementById("coachFields");

  if (learnerToggle && coachToggle && coachFields) {
    learnerToggle.addEventListener("click", () => {
      learnerToggle.classList.add("active");
      coachToggle.classList.remove("active");
      coachFields.classList.add("hidden");
    });

    coachToggle.addEventListener("click", () => {
      coachToggle.classList.add("active");
      learnerToggle.classList.remove("active");
      coachFields.classList.remove("hidden");
    });
  }
});

