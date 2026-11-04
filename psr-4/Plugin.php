<?php
/**
 * Plugin
 *
 * @author    Pronamic
 * @copyright 2026 Pronamic
 * @license   GPL-2.0-or-later
 * @package   Pronamic\PronamicPayIcons
 */

declare(strict_types=1);

namespace Pronamic\PronamicPayIcons;

/**
 * Plugin class
 */
final class Plugin {
	/**
	 * Instance.
	 *
	 * @var self|null
	 */
	private static ?self $instance = null;

	/**
	 * Return instance of this class.
	 *
	 * @return self A single instance of this class.
	 */
	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Construct.
	 */
	private function __construct() {
		\add_action( 'init', $this->init( ... ) );
	}

	/**
	 * Initialize.
	 *
	 * The Icon API was introduced in WordPress 7.1, when this package is used
	 * as a library on older WordPress versions nothing is registered.
	 *
	 * @return void
	 */
	private function init(): void {
		if ( ! \function_exists( 'wp_register_icon' ) ) {
			return;
		}

		$this->register_icons();
		$this->register_block_patterns();
	}

	/**
	 * Register icon collection and icons.
	 *
	 * @return void
	 */
	private function register_icons(): void {
		\wp_register_icon_collection(
			'pronamic-pay',
			[
				'label'       => \__( 'Pronamic Pay', 'pronamic-pay-wp-icons' ),
				'description' => \__( 'Payment method icons provided by Pronamic Pay.', 'pronamic-pay-wp-icons' ),
			]
		);

		$icons = [
			'apple'              => \__( 'Apple', 'pronamic-pay-wp-icons' ),
			'apple-pay'          => \__( 'Apple Pay', 'pronamic-pay-wp-icons' ),
			'bancontact'         => \__( 'Bancontact', 'pronamic-pay-wp-icons' ),
			'bancontact-ribbon'  => \__( 'Bancontact ribbon', 'pronamic-pay-wp-icons' ),
			'google-monogram'    => \__( 'Google monogram', 'pronamic-pay-wp-icons' ),
			'google-pay'         => \__( 'Google Pay', 'pronamic-pay-wp-icons' ),
			'ideal'              => \__( 'iDEAL', 'pronamic-pay-wp-icons' ),
			'ideal-wero'         => \__( 'iDEAL | Wero', 'pronamic-pay-wp-icons' ),
			'klarna'             => \__( 'Klarna', 'pronamic-pay-wp-icons' ),
			'klarna-monogram'    => \__( 'Klarna monogram', 'pronamic-pay-wp-icons' ),
			'paypal'             => \__( 'PayPal', 'pronamic-pay-wp-icons' ),
			'paypal-monogram'    => \__( 'PayPal monogram', 'pronamic-pay-wp-icons' ),
			'sepa-euro-outline'  => \__( 'SEPA euro outlined', 'pronamic-pay-wp-icons' ),
			'sepa-euro-solid'    => \__( 'SEPA euro solid', 'pronamic-pay-wp-icons' ),
			'sepa-filled-euro'   => \__( 'SEPA filled euro', 'pronamic-pay-wp-icons' ),
			'sepa-outlined-euro' => \__( 'SEPA outlined euro', 'pronamic-pay-wp-icons' ),
			'wero'               => \__( 'Wero', 'pronamic-pay-wp-icons' ),
			'wero-monogram'      => \__( 'Wero monogram', 'pronamic-pay-wp-icons' ),
		];

		$icons_dir = \dirname( __DIR__ ) . '/icons/';

		foreach ( $icons as $slug => $label ) {
			\wp_register_icon(
				'pronamic-pay/' . $slug,
				[
					'label'     => $label,
					'file_path' => $icons_dir . $slug . '/' . $slug . '.svg',
				]
			);
		}
	}

	/**
	 * Register block patterns.
	 *
	 * @return void
	 */
	private function register_block_patterns(): void {
		\register_block_pattern_category(
			'pronamic-pay',
			[
				'label' => \__( 'Pronamic Pay', 'pronamic-pay-wp-icons' ),
			]
		);

		\register_block_pattern(
			'pronamic-pay/payment-method-icons',
			[
				'title'       => \__( 'Payment method icons', 'pronamic-pay-wp-icons' ),
				'description' => \__( 'A row of icons of the most important payment methods.', 'pronamic-pay-wp-icons' ),
				'categories'  => [ 'pronamic-pay', 'footer' ],
				'keywords'    => [ 'ideal', 'wero', 'payment', 'icons' ],
				'content'     => <<<'HTML'
					<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
					<div class="wp-block-group">
					<!-- wp:icon {"icon":"pronamic-pay/ideal-wero","ariaLabel":"iDEAL | Wero","style":{"dimensions":{"width":"32px"}}} /-->

					<!-- wp:icon {"icon":"pronamic-pay/bancontact","ariaLabel":"Bancontact","style":{"dimensions":{"width":"32px"}}} /-->

					<!-- wp:icon {"icon":"pronamic-pay/paypal","ariaLabel":"PayPal","style":{"dimensions":{"width":"32px"}}} /-->

					<!-- wp:icon {"icon":"pronamic-pay/apple-pay","ariaLabel":"Apple Pay","style":{"dimensions":{"width":"32px"}}} /-->

					<!-- wp:icon {"icon":"pronamic-pay/google-pay","ariaLabel":"Google Pay","style":{"dimensions":{"width":"32px"}}} /-->

					<!-- wp:icon {"icon":"pronamic-pay/klarna","ariaLabel":"Klarna","style":{"dimensions":{"width":"32px"}}} /-->
					</div>
					<!-- /wp:group -->
					HTML,
			]
		);
	}
}
