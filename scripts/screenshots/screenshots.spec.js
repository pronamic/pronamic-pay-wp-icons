/**
 * Screenshots for wordpress.org, the README and marketing.
 *
 * The numbers match the `== Screenshots ==` section in `readme.txt`.
 */
const fs = require( 'fs' );
const path = require( 'path' );
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

const root = path.join( __dirname, '../..' );

const screenshotPath = ( number ) =>
	path.join( root, '.wordpress-org', `screenshot-${ number }.png` );

const readContent = ( file ) =>
	fs.readFileSync( path.join( __dirname, 'content', file ), 'utf8' );

/**
 * Block markup with all icons of the collection.
 *
 * @return {string} Block markup.
 */
function allIconsContent() {
	const icons = fs
		.readdirSync( path.join( root, 'icons' ), { withFileTypes: true } )
		.filter( ( entry ) => entry.isDirectory() )
		.map(
			( entry ) =>
				`<!-- wp:icon {"icon":"pronamic-pay/${ entry.name }","style":{"dimensions":{"width":"48px"}}} /-->`
		)
		.join( '\n' );

	return `<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"var:preset|spacing|50"}}} -->
<div class="wp-block-group">
${ icons }
</div>
<!-- /wp:group -->`;
}

/**
 * Open the editor in fullscreen mode.
 *
 * @param {Object}      fixtures        Test fixtures.
 * @param {number|null} postId          Post ID, `null` for a new post.
 * @param {Object}      corePreferences Editor preferences, e.g. `fixedToolbar`.
 * @return {Promise<void>}
 */
async function openEditor(
	{ admin, editor, page },
	postId,
	corePreferences = {}
) {
	if ( null === postId ) {
		// A new post, not a page, to skip the starter patterns modal.
		await admin.createNewPost( { fullscreenMode: true } );
	} else {
		await admin.editPost( postId );
		await editor.setPreferences( 'core/edit-post', {
			fullscreenMode: true,
		} );
	}

	await editor.setPreferences( 'core', {
		fixedToolbar: false,
		...corePreferences,
	} );

	// WordPress 7.1 keeps the admin bar visible in fullscreen mode.
	await page.addStyleTag( {
		content: `
			#wpadminbar { display: none !important; }
			html.wp-toolbar { padding-top: 0 !important; }
			.interface-interface-skeleton { top: 0 !important; }
		`,
	} );
}

/**
 * Give fonts and previews a moment to finish rendering.
 *
 * @param {import('@playwright/test').Page} page Page.
 * @return {Promise<void>}
 */
async function settle( page ) {
	await page.evaluate( () => document.fonts.ready );
	await page.waitForTimeout( 1000 );
}

test.describe( 'Screenshots', () => {
	const pages = {};

	test.beforeAll( async ( { requestUtils } ) => {
		// `wp-env` maps the plugin source, but does not activate it.
		await requestUtils.rest( {
			method: 'POST',
			path: '/wp/v2/plugins/pronamic-pay-wp-icons-dev/pronamic-pay-wp-icons',
			data: { status: 'active' },
		} );

		// Screenshots in English, `.wp-env.json` sets the site to Dutch.
		await requestUtils.rest( {
			method: 'POST',
			path: '/wp/v2/users/me',
			data: { locale: 'en_US' },
		} );

		const create = ( title, content ) =>
			requestUtils.createPage( { title, content, status: 'publish' } );

		pages.paymentMethods = await create(
			'Payment methods',
			readContent( 'payment-methods.html' )
		);
		pages.colors = await create( 'Colours', readContent( 'colors.html' ) );
		pages.icons = await create( 'Icon collection', allIconsContent() );
	} );

	test.afterAll( async ( { requestUtils } ) => {
		for ( const page of Object.values( pages ) ) {
			await requestUtils.rest( {
				method: 'DELETE',
				path: `/wp/v2/pages/${ page.id }`,
				params: { force: true },
			} );
		}

		// Back to the site language.
		await requestUtils.rest( {
			method: 'POST',
			path: '/wp/v2/users/me',
			data: { locale: '' },
		} );
	} );

	test( '1. Icon library with the Pronamic Pay collection', async ( {
		admin,
		editor,
		page,
	} ) => {
		await openEditor( { admin, editor, page }, null );

		await editor.insertBlock( { name: 'core/icon' } );

		await page
			.getByRole( 'toolbar', { name: 'Block tools' } )
			.getByRole( 'button', { name: 'Choose icon' } )
			.click();

		const dialog = page.getByRole( 'dialog', { name: 'Icon library' } );

		await dialog.getByRole( 'tab', { name: 'Pronamic Pay' } ).click();

		await expect( dialog.getByText( 'iDEAL | Wero' ) ).toBeVisible();

		await settle( page );

		await page.screenshot( { path: screenshotPath( 1 ) } );
	} );

	test( '2. Payment method icons pattern in the inserter', async ( {
		admin,
		editor,
		page,
	} ) => {
		await openEditor( { admin, editor, page }, null );

		await page
			.getByRole( 'region', { name: 'Editor top bar' } )
			.getByRole( 'button', { name: 'Block Inserter', exact: true } )
			.click();

		const inserter = page.getByRole( 'region', { name: 'Block Library' } );

		await inserter.getByRole( 'tab', { name: 'Patterns' } ).click();
		await inserter.getByRole( 'tab', { name: 'Pronamic Pay' } ).click();

		await expect(
			page.getByRole( 'option', { name: 'Payment method icons' } )
		).toBeVisible();

		await settle( page );

		// Crop to the inserter, the pattern preview is small on a full screen.
		const panel = await page
			.locator( '.block-editor-inserter__category-panel' )
			.boundingBox();

		await page.screenshot( {
			path: screenshotPath( 2 ),
			clip: {
				x: 0,
				y: panel.y,
				width: panel.x + panel.width,
				height: 400,
			},
		} );
	} );

	test( '3. Pattern in the page editor', async ( {
		admin,
		editor,
		page,
	} ) => {
		await openEditor( { admin, editor, page }, pages.paymentMethods.id, {
			fixedToolbar: true,
		} );

		await editor.canvas
			.getByRole( 'document', { name: 'Block: Icon' } )
			.first()
			.click();

		await editor.openDocumentSettingsSidebar();

		await settle( page );

		await page.screenshot( { path: screenshotPath( 3 ) } );
	} );

	test.describe( 'Frontend', () => {
		// Logged out, so without the admin bar.
		test.use( { storageState: { cookies: [], origins: [] } } );

		test( '4. Pattern on the frontend', async ( { page } ) => {
			await page.goto( pages.paymentMethods.link );
			await settle( page );

			await page
				.locator( 'main' )
				.screenshot( { path: screenshotPath( 4 ) } );
		} );

		test.describe( 'Narrow', () => {
			test.use( { viewport: { width: 800, height: 600 } } );

			test( '5. Icons follow the text colour', async ( { page } ) => {
				await page.goto( pages.colors.link );
				await settle( page );

				await page
					.locator( '.wp-block-post-content' )
					.screenshot( { path: screenshotPath( 5 ) } );
			} );

			test( '6. All icons in the Pronamic Pay collection', async ( {
				page,
			} ) => {
				await page.goto( pages.icons.link );
				await settle( page );

				await page
					.locator( '.wp-block-post-content' )
					.screenshot( { path: screenshotPath( 6 ) } );
			} );
		} );
	} );
} );
