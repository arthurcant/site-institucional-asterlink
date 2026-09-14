(() => {
  const header = document.querySelector('.site-header');
  const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-link[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) {
    return;
  }

  const setActiveLink = (activeId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const getActivationOffset = () => (header ? header.offsetHeight : 0) + 24;

  const syncActiveLink = () => {
    const activationOffset = getActivationOffset();
    const currentSection = [...sections]
      .reverse()
      .find((section) => section.getBoundingClientRect().top <= activationOffset);

    setActiveLink((currentSection || sections[0]).id);
  };

  let ticking = false;

  const requestSync = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      syncActiveLink();
    });
  };

  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync);
  syncActiveLink();
})();







const form = document.getElementById('contact-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    nome: form.querySelector('[name="nome"]').value,
    telefone: form.querySelector('[name="telefone"]').value,
    email: form.querySelector('[name="email"]').value,
    cidade: form.querySelector('[name="cidade"]').value,
    tipodeplano: form.querySelector('[name="tipodeplano"]').value,
    mensagem: form.querySelector('[name="mensagem"]').value,
  };

  try {
    const response = await fetch('https://nodejs-serverless-function-express-gules-alpha.vercel.app/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.sucesso);
      form.reset();
    } else {
      alert(result.erro || 'Erro ao enviar mensagem.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Não foi possível se conectar ao servidor.');
  }
});
