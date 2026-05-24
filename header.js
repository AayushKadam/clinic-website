/**
 * Shared Header Component for Aura Maternity & Pediatrics Clinic
 */
class ClinicHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- NAVIGATION HEADER -->
      <header class="header" id="navbar">
        <div class="nav-container container">
          <a href="index.html" class="logo-link">
            <div class="logo-wrapper">
              <img src="assets/logo.png" alt="New SMS Hospital" class="logo-img">
              <span class="logo-text">NewSMS<span>Hospital</span></span>
            </div>
          </a>
          <nav class="nav-menu">
            <ul class="nav-list">
              <li class="nav-item"><a href="doctors.html" class="nav-link">Our Doctors</a></li>
              <li class="nav-item"><a href="social-hub.html" class="nav-link">Knowledge Centre</a></li>
              <li class="nav-item"><a href="index.html" class="nav-link">Book Appointment</a></li>
              <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
            </ul>
          </nav>
          <div class="nav-actions">
            <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Drawer -->
      <div class="mobile-drawer" id="mobile-drawer">
        <div class="drawer-header">
          <div class="logo-wrapper">
            <img src="assets/logo.png" alt="Aura Maternity Logo" class="logo-img">
            <span class="logo-text">Aura<span>Maternity</span></span>
          </div>
          <button class="drawer-close" id="drawer-close" aria-label="Close Menu">&times;</button>
        </div>
        <ul class="drawer-list">
          <li><a href="doctors.html" class="drawer-link">Our Doctors</a></li>
          <li><a href="social-hub.html" class="drawer-link">Social Hub</a></li>
          <li><a href="index.html" class="drawer-link">Book Appointment</a></li>
          <li><a href="contact.html" class="drawer-link">Contact</a></li>
        </ul>
      </div>
      <div class="drawer-overlay" id="drawer-overlay"></div>

      <!-- Floating Action Button (FAB) for Booking -->
      <a href="index.html" class="floating-booking-btn" aria-label="Book Appointment">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
        </svg>
        <span>Book Appointment</span>
      </a>
    `;

    // Highlight the active navigation page link
    this.highlightActiveLinks();
  }

  highlightActiveLinks() {
    const navLinks = this.querySelectorAll('.nav-link');
    const drawerLinks = this.querySelectorAll('.drawer-link');

    // Extract current filename, default to 'index.html' for root '/' path
    let currentFile = window.location.pathname.split('/').pop();
    if (!currentFile || currentFile === '') {
      currentFile = 'index.html';
    }

    const highlight = (linksList) => {
      linksList.forEach(link => {
        link.classList.remove('active');
        const hrefValue = link.getAttribute('href');

        // Exact match or base match (in case of subpaths)
        if (hrefValue === currentFile || (currentFile === 'index.html' && hrefValue === '#')) {
          link.classList.add('active');
        }
      });
    };

    highlight(navLinks);
    highlight(drawerLinks);
  }
}

customElements.define('clinic-header', ClinicHeader);
