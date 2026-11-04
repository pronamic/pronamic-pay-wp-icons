# Pronamic Pay Icons

WordPress icon collection with payment method icons by [Pronamic Pay](https://www.pronamic.eu/plugins/pronamic-pay/).

WordPress 7.1 introduced the [Icon API](https://make.wordpress.org/core/2026/07/24/registering-and-rendering-svg-icons-in-wordpress-7-1/) and the Icon block. This plugin registers a **Pronamic Pay** icon collection with single-colour icons of popular payment methods, so websites can show the accepted payment methods in for example a header or footer in a way that blends into the design.

[![Try it in WordPress Playground](https://img.shields.io/badge/Try%20it%20in-WordPress%20Playground-3858e9?logo=wordpress)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/pronamic/pronamic-pay-wp-icons/main/.wordpress-org/blueprints/blueprint.json)

![Pronamic Pay Icons](.wordpress-org/banner-1544x500.png)

## Requirements

- WordPress 7.1+
- PHP 8.2+

## Installation

### Plugin

Download the ZIP from the [releases](https://github.com/pronamic/pronamic-pay-wp-icons/releases), upload it via **Plugins → Add New → Upload Plugin** and activate **Pronamic Pay Icons**.

### Composer library

```sh
composer require pronamic/pronamic-pay-wp-icons
```

```php
\Pronamic\PronamicPayIcons\Plugin::instance();
```

The icons are registered on the `init` action. On WordPress versions without the Icon API nothing is registered.

## Usage

### Icon block

1. Insert the **Icon** block.
2. Open the icon picker and select the **Pronamic Pay** collection.
3. Optionally set a text and/or background colour, the icon follows the text colour.

![The Pronamic Pay collection in the icon library of the Icon block](.wordpress-org/screenshot-1.png)

![The icons follow the text colour of the Icon block](.wordpress-org/screenshot-5.png)

### Block pattern

The **Payment method icons** pattern (category **Pronamic Pay** and **Footer**) inserts a row with the iDEAL | Wero, Bancontact, PayPal, Apple Pay, Google Pay and Klarna icons.

![The "Payment method icons" pattern in the block inserter](.wordpress-org/screenshot-2.png)

![The payment method icons on a page in the block editor](.wordpress-org/screenshot-3.png)

![The payment method icons on the frontend of a website](.wordpress-org/screenshot-4.png)

### PHP

```php
echo \wp_get_icon( 'pronamic-pay/ideal-wero', [ 'size' => 32, 'label' => 'iDEAL | Wero' ] );
```

## Icons

| Icon | Name | WordPress icon name |
|---|---|---|
| <img src="icons/apple-pay/apple-pay.svg" width="24" height="24" alt=""> | [Apple Pay](icons/apple-pay/) | `pronamic-pay/apple-pay` |
| <img src="icons/apple/apple.svg" width="24" height="24" alt=""> | [Apple](icons/apple/) | `pronamic-pay/apple` |
| <img src="icons/bancontact-ribbon/bancontact-ribbon.svg" width="24" height="24" alt=""> | [Bancontact ribbon](icons/bancontact-ribbon/) | `pronamic-pay/bancontact-ribbon` |
| <img src="icons/bancontact/bancontact.svg" width="24" height="24" alt=""> | [Bancontact](icons/bancontact/) | `pronamic-pay/bancontact` |
| <img src="icons/google-monogram/google-monogram.svg" width="24" height="24" alt=""> | [Google monogram](icons/google-monogram/) | `pronamic-pay/google-monogram` |
| <img src="icons/google-pay/google-pay.svg" width="24" height="24" alt=""> | [Google Pay](icons/google-pay/) | `pronamic-pay/google-pay` |
| <img src="icons/ideal-wero/ideal-wero.svg" width="24" height="24" alt=""> | [iDEAL | Wero](icons/ideal-wero/) | `pronamic-pay/ideal-wero` |
| <img src="icons/ideal/ideal.svg" width="24" height="24" alt=""> | [iDEAL](icons/ideal/) | `pronamic-pay/ideal` |
| <img src="icons/klarna-monogram/klarna-monogram.svg" width="24" height="24" alt=""> | [Klarna monogram](icons/klarna-monogram/) | `pronamic-pay/klarna-monogram` |
| <img src="icons/klarna/klarna.svg" width="24" height="24" alt=""> | [Klarna](icons/klarna/) | `pronamic-pay/klarna` |
| <img src="icons/paypal-monogram/paypal-monogram.svg" width="24" height="24" alt=""> | [PayPal monogram](icons/paypal-monogram/) | `pronamic-pay/paypal-monogram` |
| <img src="icons/paypal/paypal.svg" width="24" height="24" alt=""> | [PayPal](icons/paypal/) | `pronamic-pay/paypal` |
| <img src="icons/sepa-euro-outline/sepa-euro-outline.svg" width="24" height="24" alt=""> | [SEPA euro outlined](icons/sepa-euro-outline/) | `pronamic-pay/sepa-euro-outline` |
| <img src="icons/sepa-euro-solid/sepa-euro-solid.svg" width="24" height="24" alt=""> | [SEPA euro solid](icons/sepa-euro-solid/) | `pronamic-pay/sepa-euro-solid` |
| <img src="icons/sepa-filled-euro/sepa-filled-euro.svg" width="24" height="24" alt=""> | [SEPA filled euro](icons/sepa-filled-euro/) | `pronamic-pay/sepa-filled-euro` |
| <img src="icons/sepa-outlined-euro/sepa-outlined-euro.svg" width="24" height="24" alt=""> | [SEPA outlined euro](icons/sepa-outlined-euro/) | `pronamic-pay/sepa-outlined-euro` |
| <img src="icons/wero-monogram/wero-monogram.svg" width="24" height="24" alt=""> | [Wero monogram](icons/wero-monogram/) | `pronamic-pay/wero-monogram` |
| <img src="icons/wero/wero.svg" width="24" height="24" alt=""> | [Wero](icons/wero/) | `pronamic-pay/wero` |

Each icon folder contains a `README.md` with the source of the icon. See [`icons/README.md`](icons/README.md) for the icon guidelines and how to add an icon.

## Development

```sh
composer install
npm install
npx wp-env start
```

The `.wp-env.json` maps the source to `wp-content/plugins/pronamic-pay-wp-icons-dev` and the build to `wp-content/plugins/pronamic-pay-wp-icons`.

### Screenshots and wordpress.org assets

The screenshots, banner and icon in [`.wordpress-org/`](.wordpress-org/) are generated with [Playwright](https://playwright.dev/), see [`scripts/screenshots/`](scripts/screenshots/).

```sh
npx playwright install chromium
npx wp-env start
npm run screenshots
npm run screenshots:assets
```

The screenshots temporarily add a few demo pages to the `wp-env` site and remove them afterwards. The raw screenshots are saved in `build/screenshots/` and then framed on an orange background into `.wordpress-org/`. To adjust only the frame, run `npm run screenshots:frame`; no WordPress needed. The [Screenshots workflow](.github/workflows/screenshots.yml) runs the same scripts on GitHub and opens a pull request with the changed images.

### Code quality

```sh
composer run phpcs
composer run phpstan
composer run build
composer run make-pot
```

## Trademarks

All payment method names and marks are trademarks of their respective owners. The icons are simplified single-colour versions; see the `README.md` in each icon folder for the source and trademark owner.

## License

GPL-2.0-or-later
