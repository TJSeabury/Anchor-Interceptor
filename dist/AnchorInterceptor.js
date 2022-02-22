import { Animator } from './Animator';
import Utils from './Utils';
export class AnchorInterceptor {
    constructor(headerQueryString, targets = [AnchorInterceptor.targetClassname]) {
        this.a = window.a || (window.a = new Animator(20));
        this.header = (function (hqs) {
            if (!hqs)
                return null;
            let header = document.querySelector(hqs);
            if (undefined !== header || null !== header) {
                return header;
            }
            else {
                return null;
            }
        })(headerQueryString);
        this.headerOffset = this.header ? this.header.offsetHeight : 0;
        this.targets = targets;
        for (const t of this.targets) {
            const links = Array.from(document.querySelectorAll(t));
            for (const l of links) {
                if (l.localName !== 'a') {
                    const a = l.querySelector('a');
                    if (!a.classList.contains(AnchorInterceptor.targetClassname)) {
                        a.classList.add(AnchorInterceptor.targetClassname);
                    }
                    l.classList.remove(t);
                }
                else {
                    if (!l.classList.contains(AnchorInterceptor.targetClassname)) {
                        l.classList.add(AnchorInterceptor.targetClassname);
                    }
                }
            }
        }
        if (true === this.checkForTarget()) {
            window.addEventListener('load', () => {
                this.doAnimate(this.getTarget());
            });
        }
        window.addEventListener('click', ev => {
            this.clickHandler(ev);
        });
    }
    setTarget(anchorTarget) {
        sessionStorage.setItem('anchorTarget', anchorTarget);
    }
    getTarget() {
        return sessionStorage.getItem('anchorTarget');
    }
    removeTarget() {
        if (sessionStorage.getItem('anchorTarget')) {
            sessionStorage.removeItem('anchorTarget');
            return true;
        }
        return false;
    }
    checkForTarget() {
        if (null !== sessionStorage.getItem('anchorTarget') &&
            '' !== sessionStorage.getItem('anchorTarget')) {
            return true;
        }
        return false;
    }
    getLinkFromTarget(target) {
        if (null === target)
            return null;
        while (false === target instanceof HTMLAnchorElement) {
            target = target.parentElement;
            if (null === target) {
                return null;
            }
        }
        return target;
    }
    getStripURL(url) {
        const strippedURL = url.substring(0, url.indexOf('#')) || url;
        return (strippedURL.charAt(strippedURL.length - 1) === '/' ?
            strippedURL :
            strippedURL + '/');
    }
    getTargetID(link) {
        const target = link.href.substring(link.href.indexOf('#') + 1);
        if ('/' === target[0])
            return null;
        else if ('!' === target[0])
            return null;
        return target;
    }
    doNavigate(url) {
        window.location.href = url;
    }
    doAnimate(id) {
        const anchorTarget = document.getElementById(id);
        if (undefined === anchorTarget) {
            return;
        }
        let deltaY = this.getScrollAmount(anchorTarget) - this.headerOffset;
        if (0 === deltaY) {
            this.removeTarget();
            return;
        }
        this.a.animate({
            duration: 1000,
            easing: this.a.easings.quadInOut,
            draw: (p) => {
                this.headerOffset = this.header ? this.header.offsetHeight : 0;
                deltaY = this.getScrollAmount(anchorTarget) - this.headerOffset;
                document.documentElement.scrollTop += deltaY * p;
                document.body.scrollTop += deltaY * p;
            },
            loop: false
        });
        this.removeTarget();
        return;
    }
    getScrollAmount(t) {
        return t.getBoundingClientRect().top;
    }
    hasIntersectingClass(A, B) {
        if (Utils.intersect(A, B).length > 0)
            return true;
        return false;
    }
    clickHandler(event) {
        const link = this.getLinkFromTarget(event.target);
        if (null === link) {
            return;
        }
        if (this.targets.length > 0
            && !this.hasIntersectingClass(Array.from(link.classList), [AnchorInterceptor.targetClassname])) {
            return;
        }
        event.preventDefault();
        const url = link.href;
        const cleanURL = this.getStripURL(link.href);
        const cleanLocatation = this.getStripURL(window.location.href);
        const id = this.getTargetID(link);
        if (null === id) {
            console.log(url);
            this.doNavigate(url);
        }
        else if (cleanURL === cleanLocatation) {
            this.doAnimate(id);
        }
        else {
            this.setTarget(id);
            this.doNavigate(cleanURL);
        }
    }
}
AnchorInterceptor.targetClassname = 'js-smooth-scroll';
//# sourceMappingURL=AnchorInterceptor.js.map