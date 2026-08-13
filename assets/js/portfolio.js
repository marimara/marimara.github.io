(() => {
  'use strict';

  const body = document.body;
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('.project-card')];
  const emptyState = document.querySelector('.filter-empty');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-nav a')];
  const dialogs = [...document.querySelectorAll('.project-dialog')];
  let lastTrigger = null;

  const setFilter = (filter) => {
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  const hydrateMedia = (dialog) => {
    dialog.querySelectorAll('[data-src]').forEach((media) => {
      if (media.src) return;
      media.src = media.dataset.src;
      if (media.tagName === 'VIDEO') {
        media.load();
        media.play().catch(() => {});
      }
    });
  };

  document.querySelectorAll('[data-project]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialog = document.getElementById(`project-${trigger.dataset.project}`);
      if (!dialog) return;
      lastTrigger = trigger;
      hydrateMedia(dialog);
      dialog.showModal();
      body.classList.add('dialog-open');
      dialog.querySelector('.dialog-close')?.focus();
    });
  });

  dialogs.forEach((dialog) => {
    const closeDialog = () => dialog.close();
    dialog.querySelector('.dialog-close')?.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener('close', () => {
      body.classList.remove('dialog-open');
      dialog.querySelectorAll('video').forEach((video) => video.pause());
      lastTrigger?.focus();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openDialog = dialogs.find((dialog) => dialog.open);
    if (openDialog) {
      event.preventDefault();
      openDialog.close();
    }
  });

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav?.classList.toggle('is-open', !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle?.setAttribute('aria-expanded', 'false');
      mobileNav?.classList.remove('is-open');
    });
  });

  const sections = [...document.querySelectorAll('.portfolio-section[id]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -65%', threshold: [0, 0.1, 0.4] });
    sections.forEach((section) => observer.observe(section));
  }
})();
