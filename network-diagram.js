(() => {
  const map = document.querySelector('.network-interactive .network-map');
  if (!map) return;
  const center = map.querySelector('.network-center');
  const nodes = [...map.querySelectorAll('.network-node, .network-outputs span')];
  const paths = [...map.querySelectorAll('.network-wires path')];
  const updateRoutes = () => {
    const bounds = map.getBoundingClientRect();
    const midpoint = (node) => {
      const rect = node.getBoundingClientRect();
      return [rect.left - bounds.left + rect.width / 2, rect.top - bounds.top + rect.height / 2];
    };
    const [cx, cy] = midpoint(center);
    nodes.forEach((node, index) => {
      const [x, y] = midpoint(node);
      paths[index].setAttribute('d', `M ${x} ${y} L ${cx} ${cy}`);
    });
  };
  const observer = new ResizeObserver(updateRoutes);
  observer.observe(map);
  nodes.forEach((node) => observer.observe(node));
  document.fonts.ready.then(updateRoutes);
  updateRoutes();
})();
