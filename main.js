window.onload = function() {
      Calendly.initBadgeWidget({
        url: 'https://calendly.com/agnislabs-zohomail/30min',
        text: 'Schedule time with me',
        color: '#0069ff',
        textColor: '#ffffff',
        branding: false
      });
    };
    
document.addEventListener('DOMContentLoaded', () => {
  // Set footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Calendly popup handling (using data-calendly-url on buttons)
  const calendlyButtons = document.querySelectorAll('[data-calendly-url]');
  calendlyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = btn.getAttribute('data-calendly-url');
      if (window.Calendly && url) {
        window.Calendly.initPopupWidget({ url });
      } else {
        console.warn('Calendly script not loaded or URL missing');
      }
    });
  });

  // OPTIONAL: Web3Forms AJAX submit & popup (only if you switched to the JS version)
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('successPopup');
  const closePopup = document.getElementById('closePopup');

  if (form && popup && closePopup) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          form.reset();
          popup.style.display = 'flex';
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (err) {
        alert('Network error. Please try again.');
      }
    });

    closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.style.display = 'none';
    });
  }
});