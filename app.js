/**
 * Aura Maternity & Pediatrics Clinic - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. STICKY HEADER & ACTIVE PAGE NAV LINK
     ========================================================================== */
  const header = document.getElementById('navbar');
  const stickyScrollThreshold = 50;

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > stickyScrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }


  /* ==========================================================================
     2. MOBILE MENU DRAWER
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerActionLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerActionLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });


  /* ==========================================================================
     3. SOCIAL HUB CAROUSEL & TAB SWITCHER (Social Hub Page Only)
     ========================================================================== */
  const socialTabBtns = document.querySelectorAll('.social-tabs .tab-btn');
  const socialContentSections = document.querySelectorAll('.social-content-section');

  if (socialTabBtns.length > 0) {
    socialTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Tab Button
        socialTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle Content Section Visibility
        const targetId = btn.getAttribute('data-target');
        socialContentSections.forEach(section => {
          if (section.id === targetId) {
            section.classList.add('active');
            section.style.display = 'block';
          } else {
            section.classList.remove('active');
            section.style.display = 'none';
          }
        });
      });
    });
  }

  // Hook up carousel arrows
  const carousels = [
    { containerId: 'ig-carousel-container', prevId: 'ig-prev-btn', nextId: 'ig-next-btn' },
    { containerId: 'yt-carousel-container', prevId: 'yt-prev-btn', nextId: 'yt-next-btn' }
  ];

  carousels.forEach(carousel => {
    const container = document.getElementById(carousel.containerId);
    const prevBtn = document.getElementById(carousel.prevId);
    const nextBtn = document.getElementById(carousel.nextId);

    if (container && prevBtn && nextBtn) {
      // Determine scroll amount based on slide width + gap
      const getScrollAmount = () => {
        const slide = container.querySelector('.carousel-slide');
        return slide ? slide.offsetWidth + 24 : 344;
      };

      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });

      // Update opacity of arrows based on scroll bounds
      const updateArrowStates = () => {
        const isAtStart = container.scrollLeft <= 5;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
        prevBtn.style.opacity = isAtStart ? '0.3' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
      };

      container.addEventListener('scroll', updateArrowStates);
      
      // Run update once on initialization
      setTimeout(updateArrowStates, 150);
      window.addEventListener('resize', updateArrowStates);
    }
  });


  /* ==========================================================================
     5. WHATSAPP FRONT DESK SELECTOR (Booking Page Only)
     ========================================================================== */
  const whatsappDeskSelect = document.getElementById('whatsapp-desk');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  const baseMessage = "Hello! I would like to book an appointment at the clinic. Please let me know the available slots.";
  const encodedMessage = encodeURIComponent(baseMessage);

  if (whatsappDeskSelect && whatsappBtn) {
    whatsappDeskSelect.addEventListener('change', () => {
      const selectedNumber = whatsappDeskSelect.value;
      whatsappBtn.href = `https://wa.me/${selectedNumber}?text=${encodedMessage}`;
    });
  }


  /* ==========================================================================
     6. INTERACTIVE GOOGLE MAP MOCK & DEFERRED LAZY LOADING (Contact Page Only)
     ========================================================================== */
  const btnLoadMap = document.getElementById('btn-load-map');
  const mapBox = document.getElementById('map-box');
  const liveGoogleMap = document.getElementById('live-google-map');
  const mapZoomIn = document.getElementById('map-zoom-in');
  const mapZoomOut = document.getElementById('map-zoom-out');
  const mapGraphicMock = document.querySelector('.map-graphic-mock');

  if (btnLoadMap && liveGoogleMap && mapBox) {
    btnLoadMap.addEventListener('click', () => {
      const springfieldMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11462.628867389146!2d-123.02325350810488!3d44.053154868241436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c114006c6411f1%3A0xe5a13c3a0df4bd3!2sSpringfield%2C%20OR!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus";
      liveGoogleMap.src = springfieldMapEmbedUrl;
      liveGoogleMap.classList.remove('hidden');
      mapBox.classList.add('hidden');
    });
  }

  let currentMapZoomScale = 1.0;
  
  if (mapZoomIn && mapGraphicMock) {
    mapZoomIn.addEventListener('click', () => {
      if (currentMapZoomScale < 1.8) {
        currentMapZoomScale += 0.15;
        mapGraphicMock.style.transform = `scale(${currentMapZoomScale})`;
        mapGraphicMock.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
  }

  if (mapZoomOut && mapGraphicMock) {
    mapGraphicMock.style.transformOrigin = '60% 45%';
    mapZoomOut.addEventListener('click', () => {
      if (currentMapZoomScale > 0.8) {
        currentMapZoomScale -= 0.15;
        mapGraphicMock.style.transform = `scale(${currentMapZoomScale})`;
        mapGraphicMock.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
  }

});
