/*
* Anchor Interceptor
*/
(
    function( $ )
    {
		'use strict';
        window.addEventListener(
            'load',
            () =>
            {
				// Interceptor constructor must be called with a css selector string 
				// that targets the header and/or nav to be used when calculating 
				// scroll offsets; e.g., '.mk-header.header-style-1'.
                let interceptor = new AnchorInterceptor( '.mk-header' );
				if ( true === interceptor.checkForTarget() )
				{
					interceptor.doAnimate( interceptor.getTarget() );
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

        class AnchorInterceptor
        {
            constructor( headerQueryString )
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
			
			getStripURL( link )
			{
				let url = link.href;
				url = url.substring( 0, url.indexOf( '#' ) );
				return url;
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
				$("html, body").animate(
					{ scrollTop: deltaY + 'px' },
					500
				);
				this.removeTarget();
			}
			
			getScrollAmount( t )
			{
				let windowOffset = t.getBoundingClientRect().top;
				let elementOffset = window.scrollY + windowOffset;
				return elementOffset;
			}
            
            clickHandler( event )
            {
				const link = this.getLinkFromTarget( event.target );
				if ( ! link )
				{
					return;
				}
				event.preventDefault();
				const url = link.href;
				const cleanURL = this.getStripURL( link );
				const id = this.getTargetID( link );
				if ( -1 === url.indexOf('#') )
				{
					this.doNavigate( url );
				}
				else if ( window.location.href === cleanURL )
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

    }
)( jQuery );