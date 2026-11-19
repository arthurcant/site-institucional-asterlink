(() => {
  const host = document.getElementById('hero-particles');
  if (!host || !window.tsParticles) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const libraryReady = window.loadSlim(window.tsParticles);
  let activeContainer;

  const initialize = async () => {
    await libraryReady;
    activeContainer?.destroy();
    activeContainer = await window.tsParticles.load({
      id: host.id,
      options: {
        fullScreen: { enable: false },
        fpsLimit: 40,
        detectRetina: true,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onHover: { enable: false },
            onClick: { enable: true, mode: 'push' },
          },
          modes: { push: { quantity: 4 } },
        },
        particles: {
          number: { value: 55, density: { enable: true } },
          color: { value: '#56c8ff' },
          shape: { type: 'circle' },
          opacity: { value: { min: 0.25, max: 0.65 } },
          size: { value: { min: 1, max: 2.5 } },
          links: { enable: true, distance: 160, color: '#56c8ff', opacity: 0.18, width: 1 },
          move: { enable: !reducedMotion.matches, speed: 1.45, outModes: { default: 'out' } },
        },
        responsive: [{ maxWidth: 768, options: { particles: { number: { value: 18, density: { enable: false } }, links: { distance: 120 } } } }],
      },
    });
  };

  const start = () => initialize().catch(() => {
    // The existing hero background remains visible if initialization fails.
  });
  start();
  reducedMotion.addEventListener('change', start);
})();
