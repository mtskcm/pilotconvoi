import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- header: pozadie po odscrollovaní ---------- */
const nav = document.getElementById('site-nav');
function updateNav() {
  nav?.classList.toggle('nav-scrolled', window.scrollY > 24);
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

/* ---------- mobilné menu ---------- */
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = menuToggle?.querySelector('[data-icon-open]');
const iconClose = menuToggle?.querySelector('[data-icon-close]');

function setMenu(open: boolean) {
  mobileMenu?.classList.toggle('hidden', !open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  iconOpen?.classList.toggle('hidden', open);
  iconClose?.classList.toggle('hidden', !open);
}

menuToggle?.addEventListener('click', () => {
  setMenu(mobileMenu?.classList.contains('hidden') ?? false);
});
document.querySelectorAll('[data-menu-link]').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

/* ---------- prepínač jazykov: zachovať #kotvu + zavrieť po kliknutí mimo ---------- */
const langMenu = document.querySelector<HTMLDetailsElement>('[data-lang-menu]');
document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const base = link.getAttribute('href')?.split('#')[0] ?? '/';
    link.href = base + window.location.hash;
  });
});
document.addEventListener('click', (e) => {
  if (langMenu?.open && !langMenu.contains(e.target as Node)) langMenu.open = false;
});

/* ---------- scroll animácie (len bez prefers-reduced-motion) ---------- */
if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor odkazy cez Lenis (offset kvôli fixnému headeru)
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', id);
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.1 });
    });
  });

  // jednotlivé prvky
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 36,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 82%' },
    });
  });

  // skupiny so stagger efektom (karty, štatistiky…)
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 36,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 80%' },
    });
  });

  // "kreslenie" trás v SVG diagrame, naviazané na scroll
  document.querySelectorAll<SVGPathElement>('[data-draw]').forEach((path) => {
    const length = path.getTotalLength();
    gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: path.closest('svg'),
          start: 'top 78%',
          end: 'center 45%',
          scrub: 1,
        },
      },
    );
  });

  // jemná paralaxa hero glow vrstiev
  gsap.utils.toArray<HTMLElement>('[data-glow]').forEach((el) => {
    gsap.to(el, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
    });
  });
}
