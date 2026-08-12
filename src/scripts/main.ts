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

/* ---------- prepínač jazykov: zavrieť po kliknutí mimo (odkazy vedú na začiatok stránky) ---------- */
const langMenu = document.querySelector<HTMLDetailsElement>('[data-lang-menu]');
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
      // offset 0: hrana sekcie sadne na vrch viewportu (schová sa pod fixný header),
      // sekcia tak pekne vyplní celú obrazovku
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.1 });
    });
  });

  // jednotlivé prvky — viditeľný fade-up, ale trigger dosť skoro,
  // aby pri rýchlom scrolle obsah nepôsobil "zmiznuto"
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 30,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  // skupiny so stagger efektom (karty, štatistiky…)
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 30,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 86%' },
    });
  });

  // "kreslenie" trás v SVG diagrame — spustí sa samo, keď mapa príde do záberu
  document.querySelectorAll<SVGSVGElement>('svg:has([data-draw])').forEach((svg) => {
    const paths = svg.querySelectorAll<SVGPathElement>('[data-draw]');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: 'top 80%' },
    });
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      tl.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut' },
        i * 0.22,
      );
    });
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
