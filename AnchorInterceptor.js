import { Animator } from './Animator';
import { intersect } from './Utils';

/**
 * Anchor Interceptor
 * © Copyright 2017-2018, Tyler Seabury, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@protonomail.com, tylerseabury@gmail.com
 * @authorURL https://github.com/TJSeabury/
 * @version 1.2.0
 */
export class AnchorInterceptor {

    targetClassname = 'js-smooth-scroll';

    /**
     * Interceptor constructor may be called with a css selector string 
     * that targets the header or nav that is used when calculating 
     * scroll offsets; e.g., '.mk-header.header-style-1'; an array of
     * classes must also be provided for interception targets. If an empty
     * targets array is provided all click events on anchors will be intercepted.
     * ( Quite obviously, that can lead to undesireble conflicting behavior, but one 
     * may do that if they wished. )
     * Usage example: 
     * 
     * const interceptor = new AnchorInterceptor(
     *      false,
     *      [
     *          'smoothScrollThis',
     *          'js-smooth-scroll'
     *      ]
     * );
     *
     */
    constructor( headerQueryString, targets = [this.targetClassname] ) {
        this.a = window.a || ( window.a = new Animator( 20 ) );

        this.header = (
            function ( hqs ) {
                if ( !hqs ) return false;
                let header = document.querySelector( hqs );
                if ( undefined !== header || null !== header ) {
                    return header;
                }
            }
        )( headerQueryString );

        this.headerOffset = this.header ? this.header.offsetHeight : 0;

        this.targets = targets;

        for ( const t of this.targets ) {
            const links = Array.from( document.querySelectorAll( t ) );
            for ( const l of links ) {
                if ( l.localName !== 'a' ) {
                    const a = l.querySelector( 'a' );
                    if ( !a.classList.contains( this.targetClassname ) ) {
                        a.classList.add( this.targetClassname );
                    }
                    l.classList.remove( t );
                } else {
                    if ( !l.classList.contains( this.targetClassname ) ) {
                        l.classList.add( this.targetClassname );
                    }
                }
            }
        }

        if ( true === this.checkForTarget() ) {
            window.addEventListener(
                'load',
                () => {
                    this.doAnimate( this.getTarget() );
                }
            );
        }
        window.addEventListener(
            'click',
            ev => {
                this.clickHandler( ev );
            }
        );

    }

    setTarget ( anchorTarget ) {
        sessionStorage.setItem( 'anchorTarget', anchorTarget );
    }

    getTarget () {
        return sessionStorage.getItem( 'anchorTarget' );
    }
    removeTarget () {
        if ( sessionStorage.getItem( 'anchorTarget' ) ) {
            sessionStorage.removeItem( 'anchorTarget' );
        }
    }

    checkForTarget () {
        if ( null !== sessionStorage.getItem( 'anchorTarget' ) &&
            '' !== sessionStorage.getItem( 'anchorTarget' ) ) {
            return true;
        }
        return false;
    }

    getLinkFromTarget ( target ) {
        while ( target.localName !== 'a' ) {
            if ( !target.localName ) {
                return false;
            }
            target = target.parentNode;
        }
        return target;
    }

    getStripURL ( url ) {
        const strippedURL = url.substring( 0, url.indexOf( '#' ) ) || url;
        return (
            strippedURL.charAt( strippedURL.length - 1 ) === '/' ?
                strippedURL :
                strippedURL + '/'
        );
    }

    getTargetID ( link ) {
        const target = link.href.substring( link.href.indexOf( '#' ) + 1 );
        // We actually need to test for several cases here to account
        // for hash and hashbang routing in SPAs.
        if ( '/' === target[0] ) return -1;
        else if ( '!' === target[0] ) return -1;
        return target;
    }

    doNavigate ( url ) {
        window.location.href = url;
    }

    doAnimate ( id ) {
        const anchorTarget = document.getElementById( id );
        if ( undefined === anchorTarget ) {
            return;
        }
        let deltaY = this.getScrollAmount( anchorTarget ) - this.headerOffset;
        if ( 0 === deltaY ) {
            this.removeTarget();
            return;
        }
        this.a.animate( {
            duration: 1000,
            easing: this.a.easings.quadInOut,
            draw: p => {
                this.headerOffset = this.header ? this.header.offsetHeight : 0;
                deltaY = this.getScrollAmount( anchorTarget ) - this.headerOffset;
                document.documentElement.scrollTop += deltaY * p;
                document.body.scrollTop += deltaY * p;
            }
        } );
        this.removeTarget();
        return false;
    }

    getScrollAmount ( t ) {
        return t.getBoundingClientRect().top;
    }

    hasIntersectingClass ( A, B ) {
        if ( intersect( A, B ).length > 0 ) return true;
        return false;
    }

    clickHandler ( event ) {
        // Most click events will exit here.
        const link = this.getLinkFromTarget( event.target );
        if ( !link ) {
            return;
        }
        // Exit if the link is not a valid target for interception.
        if ( this.targets.length > 0
            && !this.hasIntersectingClass(
                Array.from( link.classList ),
                [this.targetClassname] )
        ) {
            return;
        }
        // Handle a real link click.
        event.preventDefault();
        const url = link.href;
        const cleanURL = this.getStripURL( link.href );
        const cleanLocatation = this.getStripURL( window.location.href );
        const id = this.getTargetID( link );
        if ( -1 === id ) {
            console.log( url );
            this.doNavigate( url );
        }
        else if ( cleanURL === cleanLocatation ) {
            this.doAnimate( id );
        }
        else {
            this.setTarget( id );
            this.doNavigate( cleanURL );
        }
    }
}