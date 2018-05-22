import {templates} from "../templates/templates.js";

export let pieArrows = (function () {
    let template = templates.pieArrowTemplate;

    class Arrows extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.week = 1;
            this.leftArrow = this.shadowRoot.getElementById('leftArrow');
            this.rightArrow = this.shadowRoot.getElementById('rightArrow');
            this.clickLeft = this.clickLeft.bind(this);
            this.clickRight = this.clickRight.bind(this);
            this.changeWeek = this.changeWeek.bind(this);
        }

        changeWeek() {
            const event = new CustomEvent('clickArrow', {
                detail: {
                    week: this.week
                }
            });
            this.dispatchEvent(event);
        }

        clickRight() {
            if (this.week === 0) {
                this.leftArrow.style.visibility = 'visible';
            }
            this.week++;
            if (this.week === 2) {
                this.rightArrow.style.visibility = 'hidden';
            }
            this.changeWeek();
        }

        clickLeft() {
            if (this.week === 2) {
                this.rightArrow.style.visibility = 'visible';
            }
            this.week--;
            if (this.week === 0) {
                this.leftArrow.style.visibility = 'hidden';
            }
            this.changeWeek();
        }

        connectedCallback() {
            this.leftArrow.addEventListener('click', this.clickLeft);
            this.rightArrow.addEventListener('click', this.clickRight);
        }
    }

    customElements.define('pie-arrows', Arrows);

})();