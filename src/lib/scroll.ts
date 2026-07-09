import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToSection(selector: string) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(selector, { offset: 0, duration: 1.6 });
  } else {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  }
}
