export function initFaqToggle(): void {
  const items = document.querySelectorAll<HTMLElement>('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>('.faq-question');
    const answer = item.querySelector<HTMLElement>('.faq-answer');
    if (!btn || !answer) return;

    btn.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}
