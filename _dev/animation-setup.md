# GSAP + Lenis Init Order

Always initialize in this exact order. All ScrollTrigger animations must go **after** this block.

```js
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(100); // complete animations instantly
}
// All ScrollTrigger animations go AFTER this block
```
