# Icons

Every icon has its own folder with the SVG file and a `README.md` that documents where the icon comes from:

```
icons/
└── ideal/
    ├── ideal.svg
    └── README.md
```

## Guidelines

The icons follow the conventions of the WordPress core icon library, see for example [`wp-includes/images/icon-library/image.svg`](https://github.com/WordPress/WordPress/blob/76a463528f91ac2cedf8b6b8298c679140713311/wp-includes/images/icon-library/image.svg).

- **Canvas:** square, `viewBox="0 0 24 24"` with `width="24" height="24"`. WordPress assumes icons are square and uses one `size` for both width and height.
- **Padding:** 3 pixels on each side, so the icon itself fits within 18 × 18 pixels.

  ```
  ┌──────────────────────────────┐
  |            ↕ 3 ↕             |
  |     ┌──────────────────┐     |
  |  ↔  |      ← 18 →      |  ↔  |
  |     | ↑              ↑ |     |
  |  3  | 18            18 |  3  |
  |     | ↓              ↓ |     |
  |  ↔  |      ← 18 →      |  ↔  |
  |     └──────────────────┘     |
  |            ↕ 3 ↕             |
  └──────────────────────────────┘
  ```

- **Recognizable at 16 × 16 pixels.** Use the brand's monogram or symbol when the full logo becomes unreadable.
- **Single colour:** no `fill` colours, so the fill inherits `currentColor` and the text and background colour of the Icon block apply.
- **Only `<path>` (or `<polygon>`) elements**, preferably exactly one `<path>`. WordPress sanitizes icons with `wp_kses()` and only allows `svg`, `path` and `polygon` with a few attributes (`d`, `fill`, `fill-rule`, `transform`, `points`). Groups, gradients, masks, strokes, `style` attributes and basic shapes are removed.
- **No editor metadata:** remove `data-name`, `xml:space`, `id`, `class`, `style`, `<defs>`, comments, etc.
- **Icons, not logos:** an icon is a simplified mark that blends into a design. It does not replace the official full-colour logo.

## Adding an icon

1. Create a folder `icons/<slug>/` with `<slug>.svg` that meets the guidelines above. The slug may only contain lowercase letters, digits, hyphens and underscores.
2. Add a `README.md` (copy one from another icon) with the source URL, the modifications and the trademark owner.
3. Add `'<slug>' => \__( '<Label>', 'pronamic-pay-wp-icons' ),` to the `$icons` list in [`psr-4/Plugin.php`](../psr-4/Plugin.php).
4. Add the icon to the table in the main [`README.md`](../README.md).
