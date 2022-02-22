/**
 * Animator
 * © Copyright 2017-2019, Tyler Seabury, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@protonomail.com, tylerseabury@gmail.com
 * @authorURL https://github.com/TJSeabury/
 * @version 1.2.0
 */
export class Animator {
    frameRate: number;
    easings = {
        quadIn: (timeIndex: number) => {
            return timeIndex ** 2;
        },
        circIn: (timeIndex: number) => {
            return 1 - Math.sin(Math.acos(timeIndex));
        },
        quadOut: this.makeEaseOut(
            (timeIndex: number) => {
                return timeIndex ** 2;
            }
        ),
        circOut: this.makeEaseOut(
            (timeIndex: number) => {
                return 1 - Math.sin(Math.acos(timeIndex));
            }
        ),
        quadInOut: this.makeEaseInOut(
            (timeIndex: number) => {
                return timeIndex ** 2;
            }
        ),
        circInOut: this.makeEaseInOut(
            (timeIndex: number) => {
                return 1 - Math.sin(Math.acos(timeIndex));
            }
        ),
        linear: (timeIndex: number) => {
            return timeIndex;
        },
    };
    constructor(frameRate: number) {
        this.frameRate = frameRate;
    }

    animate(config: {
        easing: (x: number) => number,
        draw: (t: number) => void,
        duration: number,
        loop: boolean
    }): void {
        const startTime = performance.now();
        const endTime = startTime + config.duration;
        const interFrameTime = 1000 / this.frameRate;
        let timeNow = startTime;
        let timeLast = timeNow;
        let deltaTime = timeNow - timeLast;
        let timeIndex = timeNow - startTime;
        const render = () => {
            if (deltaTime >= interFrameTime) {
                timeLast = timeNow;
                let timeFraction = timeIndex / config.duration;
                try {
                    config.draw(timeFraction);
                }
                catch (err) {
                    console.error('Animation failed with error: ', err);
                }
            }
            timeNow = performance.now();
            deltaTime = timeNow - timeLast;
            timeIndex = timeNow - startTime;
            if (timeNow < endTime) {
                requestAnimationFrame(render);
            }
            else {
                config.draw(1);
                if (true === config.loop) this.animate(config);
            }
        };
        requestAnimationFrame(render);
    }

    makeEaseOut(timing: (x: number) => number) {
        return function (timeIndex: number): number {
            return 1 - timing(1 - timeIndex);
        };
    }

    makeEaseInOut(timing: (x: number) => number) {
        return function (timeIndex: number): number {
            if (timeIndex < 0.5) {
                return timing(2 * timeIndex) / 2;
            }
            else {
                return (2 - timing(2 * (1 - timeIndex))) / 2;
            }
        };
    }

}