/**
 * Animator
 * © Copyright 2017-2019, Tyler Seabury, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@protonomail.com, tylerseabury@gmail.com
 * @authorURL https://github.com/TJSeabury/
 * @version 1.2.0
 */
export class Animator {
    constructor( frameRate ) {
        this.frameRate = frameRate;
        this.easings = {};
        this.easings.quadIn = ( timeIndex ) => {
            return timeIndex ** 2;
        };
        this.easings.circIn = ( timeIndex ) => {
            return 1 - Math.sin( Math.acos( timeIndex ) );
        };
        this.easings.quadOut = this.makeEaseOut(
            ( timeIndex ) => {
                return timeIndex ** 2;
            }
        );
        this.easings.circOut = this.makeEaseOut(
            ( timeIndex ) => {
                return 1 - Math.sin( Math.acos( timeIndex ) );
            }
        );
        this.easings.quadInOut = this.makeEaseInOut(
            ( timeIndex ) => {
                return timeIndex ** 2;
            }
        );
        this.easings.circInOut = this.makeEaseInOut(
            ( timeIndex ) => {
                return 1 - Math.sin( Math.acos( timeIndex ) );
            }
        );
        this.easings.linear = ( timeIndex ) => {
            return timeIndex;
        };

    }

    animate ( { easing, draw, duration }, loop = false ) {
        const startTime = performance.now();
        const endTime = startTime + duration;
        const interFrameTime = 1000 / this.frameRate;
        let timeNow = startTime;
        let timeLast = timeNow;
        let deltaTime = timeNow - timeLast;
        let timeIndex = timeNow - startTime;
        const render = () => {
            if ( deltaTime >= interFrameTime ) {
                timeLast = timeNow;
                let timeFraction = timeIndex / duration;
                try {
                    draw( timeFraction, easing( timeFraction ) );
                }
                catch ( err ) {
                    console.error( 'Animation failed with error: ', err );
                }
            }
            timeNow = performance.now();
            deltaTime = timeNow - timeLast;
            timeIndex = timeNow - startTime;
            if ( timeNow < endTime ) {
                requestAnimationFrame( render );
            }
            else {
                draw( 1, easing( 1 ) );
                if ( true === loop ) this.animate( { easing, draw, duration }, loop );
            }
        };
        requestAnimationFrame( render );
    }

    makeEaseOut ( timing ) {
        return function ( timeIndex, x ) {
            return 1 - timing( 1 - timeIndex, x );
        };
    }

    makeEaseInOut ( timing ) {
        return function ( timeIndex ) {
            if ( timeIndex < 0.5 ) {
                return timing( 2 * timeIndex ) / 2;
            }
            else {
                return ( 2 - timing( 2 * ( 1 - timeIndex ) ) ) / 2;
            }
        };
    }

}