'use strict';
window.addEventListener(
	'DOMContentLoaded',
	() =>
	{
		/**
		 * Interceptor constructor must be called with a css selector string 
		 * that targets the header or nav that is used when calculating 
		 * scroll offsets; e.g., '.mk-header.header-style-1'; an array of
		 * classes must also be provided for interception targets. If an empty
		 * targets array is provided all click events on anchors will be intercepted.
		 * ( Quite obviously, that can lead to undesireble conflicting behavior, but one 
		 * may do that if so desired. )
		 */
		let interceptor = new AnchorInterceptor( '.mk-header .mk-header-holder', ['smoothScrollThis','js-smooth-scroll'] );
		if ( true === interceptor.checkForTarget() )
		{
			window.addEventListener(
				'load',
				() =>
				{
					interceptor.doAnimate( interceptor.getTarget() );
				}
			);
		}
		window.addEventListener(
			'click',
			function( ev )
			{
				interceptor.clickHandler( ev );
			}
		);
	}
);

/**
 * Anchor Interceptor
 * © Copyright 2017-2018, Tyler Seabury, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@gmail.com
 * @authorURL https://github.com/TJSeabury/
 * @version 1.1.0
 */
class AnchorInterceptor
{
	constructor( headerQueryString, targets = [] )
	{
		this.header = (
			function( hqs )
			{
				let header = document.querySelector( hqs );
				if ( undefined !== header || null !== header )
				{
					return header;
				}
			}
		)( headerQueryString );
		this.headerOffset = this.header.offsetHeight;
		this.targets = targets;
	}

	setTarget( anchorTarget )
	{
		sessionStorage.setItem( 'anchorTarget', anchorTarget );
	}

	getTarget()
	{
		return sessionStorage.getItem( 'anchorTarget' );
	}
	removeTarget()
	{
		if ( sessionStorage.getItem( 'anchorTarget' ) )
		{
			sessionStorage.removeItem( 'anchorTarget' );
		}
	}

	checkForTarget()
	{
		if ( 
			null !== sessionStorage.getItem( 'anchorTarget' ) &&
			'' !== sessionStorage.getItem( 'anchorTarget' )
		)
		{
			return true;
		}
		return false;
	}

	getLinkFromTarget( target ) {
		while ( target.localName !== 'a' ) {
			if ( ! target.localName )
			{
				return false;
			}
			target = target.parentNode;
		} 
		return target;
	}

	getStripURL( url )
	{
		return url.substring( 0, url.indexOf( '#' ) );
	}

	getTargetID( link )
	{
		return link.href.substring( link.href.indexOf( '#' ) + 1 );
	}

	doNavigate( url )
	{
		window.location.href = url;
	}

	doAnimate( id )
	{
		const anchorTarget = document.getElementById( id );
		if ( undefined === anchorTarget )
		{
			return;
		}
		const deltaY = this.getScrollAmount( anchorTarget ) - this.headerOffset;
		if ( 0 === deltaY )
		{
			this.removeTarget();
			return;
		}
		jQuery("html, body").animate(
			{ scrollTop: deltaY + 'px' },
			999
		);
		this.removeTarget();
		return false;
	}

	getScrollAmount( t )
	{
		let windowOffset = t.getBoundingClientRect().top;
		let elementOffset = window.scrollY + windowOffset;
		return elementOffset;
	}
	
	hasIntersectingClass( A, B )
	{
		for ( let a of A )
		{
			for ( let b of B )
			{
				if ( a === b )
				{
					return true;
				}
			}
		}
		return false;
	}

	clickHandler( event )
	{
		const link = this.getLinkFromTarget( event.target );
		if ( ! link )
		{
			return;
		}
		if ( this.targets.length > 0 && ! this.hasIntersectingClass( Array.from( link.classList ), this.targets ) )
		{
			return;
		}
		event.preventDefault();
		const url = link.href;
		const cleanURL = this.getStripURL( link.href );
		const cleanLocatation = this.getStripURL( window.location.href );
		const id = this.getTargetID( link );
		if ( -1 === url.indexOf('#') )
		{
			this.doNavigate( url );
		}
		else if ( cleanURL === cleanLocatation )
		{
			this.doAnimate( id );	
		}
		else
		{
			this.setTarget( id );
			this.doNavigate( cleanURL );
		}
	}
}