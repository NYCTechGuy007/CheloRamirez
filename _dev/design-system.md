# Design System Reference

## Color Palette

| Token      | Hex       | Brand Name       | Usage                                   |
|------------|-----------|------------------|-----------------------------------------|
| Site bg    | `#0A0A0A` | Negro Onyx       | Page base (near-true onyx black)        |
| Wine red   | `#5A0A18` | Granate Profundo | Section accents, hover states           |
| Gold       | `#E5B547` | Oro Luminoso     | Highlights, dividers, section nums      |
| Gold High  | `#F5D078` | Oro Reflector    | Type callouts, foil highlights          |
| Copper     | `#C25028` | Cobre Encendido  | Bold accents, photo grading             |
| Cream      | `#F2E6C9` | Hueso Cálido     | Primary text                            |
| Muted      | `#8A7A69` | —                | Secondary text, captions                |
| Surface    | `#1A1410` | —                | Alternating section backgrounds         |

## Tailwind Config (inside HTML)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        wine:     '#5A0A18',
        gold:     '#E5B547',
        goldHigh: '#F5D078',
        copper:   '#C25028',
        cream:    '#F2E6C9',
        muted:    '#8A7A69',
        surface:  '#1A1410',
        site:     '#0A0A0A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    }
  }
}
```
