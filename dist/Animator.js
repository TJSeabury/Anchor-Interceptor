export class Animator {
    constructor(frameRate) {
        this.easings = {
            quadIn: (timeIndex) => {
                return timeIndex ** 2;
            },
            circIn: (timeIndex) => {
                return 1 - Math.sin(Math.acos(timeIndex));
            },
            quadOut: this.makeEaseOut((timeIndex) => {
                return timeIndex ** 2;
            }),
            circOut: this.makeEaseOut((timeIndex) => {
                return 1 - Math.sin(Math.acos(timeIndex));
            }),
            quadInOut: this.makeEaseInOut((timeIndex) => {
                return timeIndex ** 2;
            }),
            circInOut: this.makeEaseInOut((timeIndex) => {
                return 1 - Math.sin(Math.acos(timeIndex));
            }),
            linear: (timeIndex) => {
                return timeIndex;
            },
        };
        this.frameRate = frameRate;
    }
    animate(config) {
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
                if (true === config.loop)
                    this.animate(config);
            }
        };
        requestAnimationFrame(render);
    }
    makeEaseOut(timing) {
        return function (timeIndex) {
            return 1 - timing(1 - timeIndex);
        };
    }
    makeEaseInOut(timing) {
        return function (timeIndex) {
            if (timeIndex < 0.5) {
                return timing(2 * timeIndex) / 2;
            }
            else {
                return (2 - timing(2 * (1 - timeIndex))) / 2;
            }
        };
    }
}
//# sourceMappingURL=Animator.js.map