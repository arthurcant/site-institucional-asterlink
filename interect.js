(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('mainNav');
  const closeMenu = () => {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
    document.querySelector('.nav-more')?.removeAttribute('open');
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true';
      closeMenu();
      if (wasOpen) menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const carousel = document.querySelector('.technology-carousel');
  if (carousel) {
    const track = carousel.querySelector('.technology-track');
    const status = carousel.querySelector('.carousel-status');
    let moving = false;
    // Advance only on an arrow click, including the seamless wraparound.
    const move = async (direction) => {
      if (moving) return;
      moving = true;
      const card = direction === 1 ? track.firstElementChild : track.lastElementChild;
      let clone;
      let animation;
      try {
        if (!reducedMotion.matches) {
          const step = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
          clone = card.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          clone.inert = true;
          clone.removeAttribute('id');
          clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
          if (direction === 1) track.append(clone);
          else track.prepend(clone);
          animation = track.animate([
            { transform: `translateX(${direction === 1 ? 0 : -step}px)` },
            { transform: `translateX(${direction === 1 ? -step : 0}px)` },
          ], { duration: 360, easing: 'cubic-bezier(.22, .61, .36, 1)', fill: 'forwards' });
          await animation.finished;
        }
      } finally {
        clone?.remove();
        if (direction === 1) track.append(card);
        else track.prepend(card);
        animation?.cancel();
        moving = false;
        status.textContent = `Tecnologia em destaque: ${track.firstElementChild.querySelector('h3').textContent}`;
      }
    };
    carousel.querySelector('.previous').addEventListener('click', () => move(-1));
    carousel.querySelector('.next').addEventListener('click', () => move(1));
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const summary = item.querySelector('summary');
    let animation;
    let expanded = item.open;
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      expanded = !expanded;
      const from = item.getBoundingClientRect().height;
      animation?.cancel();
      item.style.height = '';
      item.style.overflow = '';
      if (reducedMotion.matches) {
        item.open = expanded;
        return;
      }
      item.open = true;
      const to = expanded ? item.getBoundingClientRect().height : summary.getBoundingClientRect().height;
      item.style.overflow = 'hidden';
      animation = item.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration: 280,
        easing: 'cubic-bezier(.22, .61, .36, 1)',
      });
      animation.onfinish = () => {
        item.open = expanded;
        item.style.overflow = '';
        animation = null;
      };
    });
  });

  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(
      Array.from(new FormData(form), ([name, value]) => [name, value.trim()]),
    );
    for (const name of ['nome', 'email', 'telefone', 'cidade', 'mensagem']) {
      if (!values[name]) {
        form.elements[name].setCustomValidity('Preencha este campo.');
        form.elements[name].reportValidity();
        return;
      }
    }
    const phoneDigits = values.telefone.replace(/\D/g, '');
    if (!/^[+\d\s().-]+$/.test(values.telefone) || phoneDigits.length < 10 || phoneDigits.length > 15) {
      form.elements.telefone.setCustomValidity('Informe um telefone válido com DDD.');
      form.elements.telefone.reportValidity();
      return;
    }
    const message = [
      'Solicitação de diagnóstico — Áster Link',
      '',
      'Como podemos ajudar?',
      `Tipo de projeto: ${values.tipoSolucao}`,
      '',
      'Dados de contato',
      `Nome completo: ${values.nome}`,
      `Empresa ou organização: ${values.empresa || 'Não informada'}`,
      `E-mail: ${values.email}`,
      `WhatsApp: ${values.telefone}`,
      '',
      'Informações do projeto',
      `Cidade / UF: ${values.cidade}`,
      `Data ou prazo previsto: ${values.prazo || 'Não informado'}`,
      '',
      'O que precisa estar conectado?',
      values.mensagem,
    ].join('\n');
    const whatsappUrl = new URL(form.action);
    whatsappUrl.searchParams.set('text', message);
    status.dataset.state = 'pending';
    status.textContent = 'Abrindo o WhatsApp. Revise a mensagem e toque em Enviar para concluir a solicitação.';
    window.location.assign(whatsappUrl.href);
  });
  form.addEventListener('input', (event) => event.target.setCustomValidity?.(''));
})();
