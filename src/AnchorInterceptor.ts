import { Animator } from './Animator';
import Utils from './Utils';

declare global {
    interface Window {
        a: Animator;
    }
}

/**
 * Anchor Interceptor
 * © Copyright 2017-2018, Tyler Seabury, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@protonomail.com, tylerseabury@gmail.com
 * @authorURL https://github.com/TJSeabury/
 * @version 1.2.0
 */
export class AnchorInterceptor {

    static targetClassname = 'js-smooth-scroll';

    headerOffset: number;
    targets: string[];
    a: Animator;
    header: HTMLElement;

    constructor(headerQueryString: string, targets = [AnchorInterceptor.targetClassname]) {
        this.a = window.a || (window.a = new Animator(20));

        this.header = (
            function (hqs) {
                if (!hqs) return null;
                let header = document.querySelector(hqs);
                if (undefined !== header || null !== header) {
                    return header as HTMLElement;
                } else {
                    return null;
                }
            }
        )(headerQueryString);

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
                } else {
                    if (!l.classList.contains(AnchorInterceptor.targetClassname)) {
                        l.classList.add(AnchorInterceptor.targetClassname);
                    }
                }
            }
        }

        if (true === this.checkForTarget()) {
            window.addEventListener(
                'load',
                () => {
                    this.doAnimate(this.getTarget());
                }
            );
        }
        window.addEventListener(
            'click',
            ev => {
                this.clickHandler(ev);
            }
        );

    }

    setTarget(anchorTarget: string): void {
        window.sessionStorage.setItem('anchorTarget', anchorTarget);
    }

    getTarget(): string {
        return window.sessionStorage.getItem('anchorTarget');
    }
    removeTarget(): boolean {
        if (window.sessionStorage.getItem('anchorTarget')) {
            window.sessionStorage.removeItem('anchorTarget');
            return true;
        }
        return false;
    }

    checkForTarget(): boolean {
        if (null !== window.sessionStorage.getItem('anchorTarget') &&
            '' !== window.sessionStorage.getItem('anchorTarget')) {
            return true;
        }
        return false;
    }

    getLinkFromTarget(target: HTMLElement): HTMLAnchorElement {
        if (null === target) return null;
        while (false === target instanceof HTMLAnchorElement) {
            target = target.parentElement;
            if (null === target) {
                return null;
            }
        }
        return <HTMLAnchorElement>target;
    }

    getStripURL(url: string): string {
        const strippedURL = url.substring(0, url.indexOf('#')) || url;
        return (
            strippedURL.charAt(strippedURL.length - 1) === '/' ?
                strippedURL :
                strippedURL + '/'
        );
    }

    getTargetID(link: HTMLAnchorElement): string | null {
        const target = link.href.substring(link.href.indexOf('#') + 1);
        // We actually need to test for several cases here to account
        // for hash and hashbang routing in SPAs.
        if ('/' === target[0]) return null;
        else if ('!' === target[0]) return null;
        return target;
    }

    doNavigate(url: string): void {
        window.location.href = url;
    }

    doAnimate(id: string): void {
        const anchorTarget = document.getElementById(id);
        if (undefined === anchorTarget) {
            return;
        }
        let deltaY: number = this.getScrollAmount(anchorTarget) - this.headerOffset;
        if (0 === deltaY) {
            this.removeTarget();
            return;
        }
        this.a.animate({
            duration: 1000,
            easing: this.a.easings.quadInOut,
            draw: (p: number) => {
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

    getScrollAmount(t: HTMLElement): number {
        return t.getBoundingClientRect().top;
    }

    hasIntersectingClass(A: Array<String>, B: Array<String>): Boolean {
        if (Utils.intersect(A, B).length > 0) return true;
        return false;
    }

    clickHandler(event: Event) {
        // Most click events will exit here.
        const link = this.getLinkFromTarget(event.target as HTMLElement);
        if (null === link) {
            return;
        }
        // Exit if the link is not a valid target for interception.
        if (this.targets.length > 0
            && !this.hasIntersectingClass(
                Array.from(link.classList),
                [AnchorInterceptor.targetClassname])
        ) {
            return;
        }
        // Handle a real link click.
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