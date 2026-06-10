# motion-primitives

> Production-ready Framer Motion animation components for React — copy-paste into any Next.js or React project.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)

## Components

| Component | Description |
|-----------|-------------|
| `<PageTransition>` | Smooth page-level enter/exit animations |
| `<FadeIn>` | Staggered fade-in for lists and cards |
| `<SlideUp>` | Slide-up reveal on scroll intersection |
| `<MagneticButton>` | Cursor-following magnetic hover effect |
| `<TextReveal>` | Character-by-character text animation |
| `<ParallaxSection>` | Depth parallax on scroll |
| `<Drawer>` | Spring-physics slide-in drawer |
| `<NumberTicker>` | Animated number counter |

## Usage

```tsx
import { FadeIn, SlideUp, MagneticButton } from '@/components/motion-primitives';

export default function HeroSection() {
  return (
    <SlideUp>
      <FadeIn stagger={0.1}>
        <h1>Build fast.</h1>
        <p>Ship beautiful animations.</p>
        <MagneticButton strength={0.3}>
          <button>Get Started</button>
        </MagneticButton>
      </FadeIn>
    </SlideUp>
  );
}
```

## FadeIn

```tsx
<FadeIn
  stagger={0.08}      // delay between children
  duration={0.5}      // animation duration
  from="bottom"       // direction: bottom | top | left | right
  distance={24}       // pixels to travel
>
  {items.map(item => <Card key={item.id} {...item} />)}
</FadeIn>
```

## PageTransition

Wrap your layout to get automatic route change animations:

```tsx
// app/layout.tsx
import { PageTransition } from '@/components/motion-primitives';

export default function Layout({ children }) {
  return (
    <PageTransition variant="slide" duration={0.35}>
      {children}
    </PageTransition>
  );
}
```

## Requirements

- React 18+
- Framer Motion 11+
- Next.js 14+ (App Router) or any React project

## License

MIT
