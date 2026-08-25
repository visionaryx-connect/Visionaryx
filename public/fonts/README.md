# Neue Montreal — display face

Neue Montreal is a **commercial typeface** (Pangram Pangram). The files are not
committed here; buy or license them, export `.woff2`, and drop them in this
folder using exactly these names:

| File                          | Weight | Used for                          |
| ----------------------------- | ------ | --------------------------------- |
| `NeueMontreal-Book.woff2`     | 400    | `font-display` at normal weight   |
| `NeueMontreal-Medium.woff2`   | 500    | eyebrows, labels                  |
| `NeueMontreal-Bold.woff2`     | 700    | **every headline on the site**    |

The Pangram Pangram download names its files `PPNeueMontreal-Book.woff2` etc. —
strip the `PP` prefix when you copy them in.

Only `NeueMontreal-Bold.woff2` is strictly required; the headlines are what use
it. The other two are nice-to-have.

## How it is wired

`@font-face` rules live in [`src/app/globals.css`](../../src/app/globals.css).
The Tailwind token is:

```css
--font-display: "Neue Montreal", var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
```

So `class="font-display"` resolves to Neue Montreal when these files exist and
falls through to Inter Tight when they do not. Nothing errors either way —
add the files and the site picks them up on the next reload.

Body copy is Inter throughout and does not depend on this folder.

Neue Montreal's heaviest cut is Bold (700), so all display headings use
`font-bold`. `font-synthesis-weight: none` is set on `.font-display` to stop the
browser faking anything heavier.
