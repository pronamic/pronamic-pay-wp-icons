/**
 * Banner and icon for wordpress.org.
 *
 * Rendered from HTML with the SVG icons from the `icons` folder. Adjust the
 * CSS variables in `style` to change the colours and font.
 *
 * Usage: `npm run screenshots:assets`, no WordPress needed.
 */
const fs = require( 'fs' );
const path = require( 'path' );
const { chromium } = require( '@playwright/test' );

const root = path.join( __dirname, '../..' );
const outputDir = path.join( root, '.wordpress-org' );

const getIconSvg = ( slug ) =>
	fs.readFileSync(
		path.join( root, 'icons', slug, `${ slug }.svg` ),
		'utf8'
	);

const style = `
	:root {
		--background: #1e1e1e;
		--accent: #ffe14d;
		--color: #ffffff;
		--muted: #b8b8b8;
		--font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
	}

	* { box-sizing: border-box; margin: 0; padding: 0; }

	html, body {
		width: 100%;
		height: 100%;
		background: var(--background);
		color: var(--color);
		font-family: var(--font);
	}

	svg { display: block; fill: currentColor; }
`;

const bannerIcons = [
	'ideal-wero',
	'bancontact',
	'paypal',
	'apple-pay',
	'google-pay',
	'klarna',
	'sepa-filled-euro',
	'wero',
];

const iconIcons = [ 'wero-monogram', 'paypal-monogram', 'klarna-monogram', 'apple' ];

/**
 * Banner HTML.
 *
 * @return {string} HTML.
 */
function bannerHtml() {
	const icons = bannerIcons
		.map( ( slug ) => `<div class="icon">${ getIconSvg( slug ) }</div>` )
		.join( '' );

	return `<!DOCTYPE html>
		<html>
		<head>
		<style>
			${ style }

			body {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 32px;
				padding: 0 40px;
			}

			h1 {
				font-size: 34px;
				font-weight: 700;
				letter-spacing: -0.02em;
				line-height: 1.1;
			}

			p {
				margin-top: 10px;
				max-width: 300px;
				color: var(--muted);
				font-size: 15px;
				line-height: 1.4;
			}

			.bar {
				width: 48px;
				height: 4px;
				margin-bottom: 16px;
				background: var(--accent);
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(4, 64px);
				gap: 16px;
			}

			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 64px;
				height: 64px;
				border-radius: 12px;
				background: rgba(255, 255, 255, 0.08);
			}

			.icon svg { width: 56px; height: 56px; }
		</style>
		</head>
		<body>
			<div>
				<div class="bar"></div>
				<h1>Pronamic Pay Icons</h1>
				<p>Payment method icons for the WordPress Icon block.</p>
			</div>
			<div class="grid">${ icons }</div>
		</body>
		</html>`;
}

/**
 * Plugin icon SVG, a 2 × 2 grid of icons.
 *
 * @return {string} SVG.
 */
function iconSvg() {
	const cells = iconIcons
		.map( ( slug, index ) => {
			const x = 8 + ( index % 2 ) * 56;
			const y = 8 + Math.floor( index / 2 ) * 56;

			// Keep the original `viewBox`, only position and size the icon.
			return getIconSvg( slug ).replace(
				/ width="24" height="24"/,
				` x="${ x }" y="${ y }" width="56" height="56" fill="#ffffff"`
			);
		} )
		.join( '' );

	return [
		'<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">',
		'<rect width="128" height="128" fill="#1e1e1e"/>',
		cells,
		'</svg>',
	].join( '' );
}

/**
 * Render HTML to a PNG file.
 *
 * @param {import('@playwright/test').Browser} browser Browser.
 * @param {string}                             html    HTML.
 * @param {Object}                             size    Width and height in CSS pixels.
 * @param {number}                             scale   Device scale factor.
 * @param {string}                             file    File name.
 * @return {Promise<void>}
 */
async function render( browser, html, size, scale, file ) {
	const page = await browser.newPage( {
		viewport: size,
		deviceScaleFactor: scale,
	} );

	await page.setContent( html );
	await page.screenshot( { path: path.join( outputDir, file ) } );
	await page.close();
}

( async () => {
	const browser = await chromium.launch();

	const banner = bannerHtml();
	const bannerSize = { width: 772, height: 250 };

	await render( browser, banner, bannerSize, 1, 'banner-772x250.png' );
	await render( browser, banner, bannerSize, 2, 'banner-1544x500.png' );

	const svg = iconSvg();
	const icon = `<!DOCTYPE html><html><head><style>${ style }</style></head><body>${ svg }</body></html>`;
	const iconSize = { width: 128, height: 128 };

	fs.writeFileSync( path.join( outputDir, 'icon.svg' ), svg + '\n' );

	await render( browser, icon, iconSize, 1, 'icon-128x128.png' );
	await render( browser, icon, iconSize, 2, 'icon-256x256.png' );

	await browser.close();
} )();
