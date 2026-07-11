/** Shared helpers for scrolling the `.walk` container to a section. */

export function getWalkRoot(): HTMLElement | null {
  return document.querySelector('.walk');
}

export function scrollToSection(id: string) {
  const root = getWalkRoot();
  if (!root) return;

  const tryScroll = (attempts = 0) => {
    const el = document.getElementById(id);
    if (!el) {
      if (attempts < 24) requestAnimationFrame(() => tryScroll(attempts + 1));
      return;
    }
    const offset = el.getBoundingClientRect().top - root.getBoundingClientRect().top;
    root.scrollTo({ top: root.scrollTop + offset, behavior: 'smooth' });
  };

  tryScroll();
}
