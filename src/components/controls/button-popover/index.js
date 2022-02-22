import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import { BaseControl, Button, Popover, PanelBody } from '@wordpress/components';

class WoostifyButtonPopoverControl extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			isVisible: false,
			isMouseOutside: true,
		};

		this.onToggleVisible = this.onToggleVisible.bind( this );
		this.handleClose = this.handleClose.bind( this );
		this.handleMouseLeave = this.handleMouseLeave.bind( this );
		this.handleMouseEnter = this.handleMouseEnter.bind( this );
		this.handleOnClickOutside = this.handleOnClickOutside.bind( this );
	}

	onToggleVisible() {
		this.setState( { isVisible: ! this.state.isVisible } );
	}

	handleClose() {
		this.setState( { isVisible: false } );
	}

	handleMouseLeave() {
		this.setState( { isMouseOutside: true } );
	}

	handleMouseEnter() {
		this.setState( { isMouseOutside: false } );
	}

	handleOnClickOutside( ev ) {
		// Do not do anything if the Media Manager is open.
		if ( window.wp?.media?.frame?.el?.clientHeight ) {
			return;
		}

		if ( this.state.isVisible ) {
			if (
				! ev.target.closest( '.wb-button-popover' ) &&
				! ev.target.closest( '.wb-button-popover-icon' ) &&
				! ev.target.closest( '.components-color-picker' )
			) {
				this.handleClose();
			}
		}
	}

	componentWillUnmount() {
		// Remove event listener for moousedown.
		document.removeEventListener( 'mousedown', this.handleOnClickOutside );
	}

	componentDidMount() {
		// Added event listener for mousedown.
		document.addEventListener( 'mousedown', this.handleOnClickOutside );
	}

	render() {
		const { isVisible } = this.state;
		return (
			<Fragment>
				<BaseControl
					className="wb-base-control--grid"
					label="Typography"
				>
					<Button
						className="wb-button-popover-icon"
						variant="secondary"
						onClick={ this.onToggleVisible }
						icon="edit"
					/>
					{ isVisible && (
						<Popover
							className="wb-button-popover"
							focusOnMount="container"
							onMouseLeave={ this.handleMouseLeave }
							onMouseEnter={ this.handleMouseEnter }
						>
							<PanelBody>{ this.props.children }</PanelBody>
						</Popover>
					) }
				</BaseControl>
			</Fragment>
		);
	}
}

export default WoostifyButtonPopoverControl;
