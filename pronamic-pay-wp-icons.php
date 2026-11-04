<?php
/**
 * Pronamic Pay Icons
 *
 * @author    Pronamic
 * @copyright 2026 Pronamic
 * @license   GPL-2.0-or-later
 * @package   Pronamic\PronamicPayIcons
 *
 * @wordpress-plugin
 * Plugin Name:       Pronamic Pay Icons
 * Plugin URI:        https://www.pronamic.eu/plugins/pronamic-pay/
 * Description:       WordPress icon collection with payment method icons by Pronamic Pay.
 * Version:           1.0.0
 * Requires at least: 7.1
 * Requires PHP:      8.3
 * Author:            Pronamic
 * Author URI:        https://www.pronamic.eu/
 * Text Domain:       pronamic-pay-wp-icons
 * Domain Path:       /languages/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * GitHub URI:        https://github.com/pronamic/pronamic-pay-wp-icons
 */

declare(strict_types=1);

namespace Pronamic\PronamicPayIcons;

if ( ! \defined( 'ABSPATH' ) ) {
	exit;
}

( static function (): void {
	$autoload_path = __DIR__ . '/vendor/autoload_packages.php';

	if ( \file_exists( $autoload_path ) ) {
		require_once $autoload_path;
	}

	Plugin::instance();
} )();
