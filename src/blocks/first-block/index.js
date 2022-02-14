import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

registerBlockType( 'woostify-block/first-block', {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
