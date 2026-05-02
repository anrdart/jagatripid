const TARGET = new Date('2026-05-16T23:59:59+07:00').getTime();

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function initCountdown(): void {
  const days = document.getElementById('cd-days');
  const hours = document.getElementById('cd-hours');
  const mins = document.getElementById('cd-mins');
  const secs = document.getElementById('cd-secs');
  if (!days || !hours || !mins || !secs) return;

  const daysEl = days as HTMLElement;
  const hoursEl = hours as HTMLElement;
  const minsEl = mins as HTMLElement;
  const secsEl = secs as HTMLElement;

  function tick(): void {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }
    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    daysEl.textContent = pad(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent = pad(m);
    secsEl.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
}
