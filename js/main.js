/* ============================================
   VYAPTUM ADVISORY — SITE SCRIPTS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Announcement bar ---------- */
  const announceBar = document.getElementById('announceBar');
  const announceClose = document.getElementById('announceClose');
  if (announceClose) {
    announceClose.addEventListener('click', () => {
      announceBar.classList.add('hidden');
    });
  }

  /* ---------- Sticky header on scroll ---------- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile nav drawer ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const closeMobileNav = () => {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('active');
    mobileOverlay.classList.remove('active');
  };

  navToggle.addEventListener('click', () => {
    const isActive = mobileDrawer.classList.toggle('active');
    navToggle.classList.toggle('active', isActive);
    navToggle.setAttribute('aria-expanded', String(isActive));
    mobileOverlay.classList.toggle('active', isActive);
  });
  mobileOverlay.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.mobile-link, .mobile-drawer .btn').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-reveal-delay');
        if (delay) entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Stat counters (count up on scroll into view) ---------- */
  const statEls = document.querySelectorAll('.stat-number');
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObserver.observe(el));

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('testimonialTrack');
  const slides = track ? Array.from(track.querySelectorAll('.testimonial-slide')) : [];
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  let current = 0;
  let autoTimer;

  if (slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });

    function renderSlide() {
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goToSlide(i) {
      current = (i + slides.length) % slides.length;
      renderSlide();
      resetAutoplay();
    }

    function resetAutoplay() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goToSlide(current + 1), 6000);
    }

    prevBtn.addEventListener('click', () => goToSlide(current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current + 1));
    renderSlide();
    resetAutoplay();
  }

  /* ---------- Newsletter form (demo only, no backend) ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterNote = document.getElementById('newsletterNote');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterNote.textContent = 'Thanks — you’re on the list! (demo only, not connected to a mailing list yet)';
      newsletterForm.reset();
    });
  }

  /* ---------- Services accordion ---------- */
  document.querySelectorAll('.svc-category-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.closest('.svc-category');
      const isOpen = category.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
  document.querySelectorAll('.svc-sub-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const subgroup = btn.closest('.svc-subgroup');
      const isOpen = subgroup.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* ---------- Service links -> service detail page ---------- */
  const buildServiceHref = (topic, category) => {
    const params = new URLSearchParams({ name: topic });
    if (category) params.set('category', category);
    return `service.html?${params.toString()}`;
  };
  document.querySelectorAll('[data-wa-topic]').forEach(link => {
    const topic = link.getAttribute('data-wa-topic');
    const categoryEl = link.closest('.svc-category');
    const categoryTitleEl = categoryEl ? categoryEl.querySelector('.svc-category-title') : null;
    const category = link.getAttribute('data-category') || (categoryTitleEl ? categoryTitleEl.textContent.trim() : '');
    link.href = buildServiceHref(topic, category);
  });

  /* ---------- Mega menu (Services) ---------- */
  const navServices = document.getElementById('navServices');
  const navServicesBtn = document.getElementById('navServicesBtn');
  if (navServices && navServicesBtn) {
    const closeMegaMenu = () => {
      navServices.classList.remove('open');
      navServicesBtn.setAttribute('aria-expanded', 'false');
    };
    navServicesBtn.addEventListener('click', () => {
      const isOpen = navServices.classList.toggle('open');
      navServicesBtn.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!navServices.contains(e.target)) closeMegaMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMegaMenu();
    });
    navServices.querySelectorAll('.mega-link, .mega-col-view-all').forEach(link => {
      link.addEventListener('click', closeMegaMenu);
    });
  }

  /* ---------- Header search button -> jump to hero search ---------- */
  const navSearchBtn = document.getElementById('navSearchBtn');
  const heroSearchInput = document.getElementById('heroSearchInput');
  if (navSearchBtn && heroSearchInput) {
    navSearchBtn.addEventListener('click', () => {
      heroSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heroSearchInput.focus();
    });
  }

  /* ---------- Hero search (filters the full service catalog) ---------- */
  const heroSearchResults = document.getElementById('heroSearchResults');
  if (heroSearchInput && heroSearchResults) {
    const catalog = Array.from(document.querySelectorAll('#servicesAccordion .svc-leaf[data-wa-topic]')).map(el => {
      const categoryEl = el.closest('.svc-category');
      const categoryTitleEl = categoryEl ? categoryEl.querySelector('.svc-category-title') : null;
      const name = el.getAttribute('data-wa-topic');
      const category = categoryTitleEl ? categoryTitleEl.textContent.trim() : '';
      return { name, category, href: buildServiceHref(name, category) };
    });

    const renderResults = (matches) => {
      if (!matches.length) {
        heroSearchResults.innerHTML = '<p class="hero-search-empty">No matching service — try a different term, or WhatsApp us directly.</p>';
        return;
      }
      heroSearchResults.innerHTML = matches.slice(0, 8).map(m =>
        `<a class="hero-search-result" href="${m.href}"><strong>${m.name}</strong><span>${m.category}</span></a>`
      ).join('');
    };

    heroSearchInput.addEventListener('input', () => {
      const query = heroSearchInput.value.trim().toLowerCase();
      if (!query) {
        heroSearchResults.classList.remove('open');
        heroSearchResults.innerHTML = '';
        return;
      }
      const matches = catalog.filter(m => m.name.toLowerCase().includes(query) || m.category.toLowerCase().includes(query));
      renderResults(matches);
      heroSearchResults.classList.add('open');
    });
    heroSearchInput.addEventListener('focus', () => {
      if (heroSearchInput.value.trim()) heroSearchResults.classList.add('open');
    });
    document.addEventListener('click', (e) => {
      if (!heroSearchInput.contains(e.target) && !heroSearchResults.contains(e.target)) {
        heroSearchResults.classList.remove('open');
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* ---------- WhatsApp "Talk to Experts" link (global CTA) ---------- */
  const WHATSAPP_NUMBER = '916209005226';
  const buildWhatsAppLink = (topic) => {
    const text = topic
      ? `Hi, I'd like to know more about ${topic}.`
      : `Hi, I'd like to talk to an expert about your services.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };
  const talkToExpertsBtn = document.getElementById('talkToExpertsBtn');
  if (talkToExpertsBtn) talkToExpertsBtn.href = buildWhatsAppLink();
  const megaWhatsAppBtn = document.getElementById('megaWhatsAppBtn');
  if (megaWhatsAppBtn) megaWhatsAppBtn.href = buildWhatsAppLink();

  /* ---------- Lead capture modal ---------- */
  const leadModal = document.getElementById('leadModal');
  const leadModalOverlay = document.getElementById('leadModalOverlay');
  const leadModalClose = document.getElementById('leadModalClose');
  const leadModalForm = document.getElementById('leadModalForm');
  if (leadModal && leadModalOverlay) {
    const openLeadModal = () => {
      leadModal.classList.add('open');
      leadModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeLeadModal = () => {
      leadModal.classList.remove('open');
      leadModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    document.querySelectorAll('[data-lead-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openLeadModal();
      });
    });
    leadModalClose.addEventListener('click', closeLeadModal);
    leadModalOverlay.addEventListener('click', closeLeadModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLeadModal();
    });

    if (leadModalForm) {
      leadModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('leadName').value.trim();
        const phone = document.getElementById('leadPhone').value.trim();
        const email = document.getElementById('leadEmail').value.trim();
        const service = document.getElementById('leadService').value;
        const text = `Hi, I'd like a free consultation.\nName: ${name}\nPhone: +91 ${phone}\nEmail: ${email}\nService: ${service}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        closeLeadModal();
        leadModalForm.reset();
      });
    }

    if (!sessionStorage.getItem('leadModalShown')) {
      setTimeout(() => {
        if (!leadModal.classList.contains('open')) {
          openLeadModal();
          sessionStorage.setItem('leadModalShown', '1');
        }
      }, 20000);
    }
  }

  /* ---------- Smooth scroll offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]:not([data-lead-modal])').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const headerHeight = header.offsetHeight + 20;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});
