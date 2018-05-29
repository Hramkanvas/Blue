import {templates} from "../templates/templates.js";

export let counter = (function () {

    let template = templates.pieCounterTemplate;

    class CountProduct extends HTMLElement {
        constructor() {
            super();
            this.counter = 0;
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.remove = this.shadowRoot.getElementById("remove");
            this.add = this.shadowRoot.getElementById("add");
            this.count = this.shadowRoot.getElementById("count");
            this.productPrice = 0;
        }

        connectedCallback() {
            this.remove.addEventListener("click", (e) => { this.calculate(e) });
            this.add.addEventListener("click", (e) => { this.calculate(e) });
        }

        disconnectedCallback() {
            this.remove.addEventListener("click", (e) => { this.calculate(e) });
            this.add.addEventListener("click", (e) => { this.calculate(e) });
        }

        static get observedAttributes() {
            return ['count'];
        }

        attributeChangedCallback(attrName, oldVal, newVal) {
            if (oldVal === null)
                this.counter = newVal;
            this.count.innerText = this.counter;
        }

        calculate(e) {
            this.productPrice = this.parentElement.parentElement.children[1].children[0];
            let prevCounter = this.counter;

            if (e.path[1].id === "remove") {
                if (this.counter <= 0) {
                    this.counter = 0;
                    this.render(this.counter, prevCounter);
                }
                else {
                    this.counter--;
                    this.render(this.counter, prevCounter);
                }
            }
            else if (e.path[1].id === "add") {
                this.counter++;
                this.render(this.counter, prevCounter);
            }

            this.setAttribute("count", this.counter);
        }
        cutStuff(item){
            return +Number.parseFloat(item).toFixed(2);
        }
        render(counter, prevCounter) {
            prevCounter = +prevCounter;
            let price = +this.productPrice.innerText || 1;
            let priceChange = 0;

            if (counter === 0 || prevCounter === 0) {
                this.productPrice.innerHTML = this.cutStuff(price);
                priceChange = counter === 0 && prevCounter === 0 ? 0 : (counter > prevCounter ? +this.productPrice.innerHTML : -this.productPrice.innerHTML);
            }

            else if (counter === 1 && prevCounter === 2) {
                this.productPrice.innerHTML = (this.cutStuff(price / 2)).toString();
                priceChange = -this.productPrice.innerHTML;
            }

            else {
                this.productPrice.innerHTML = (this.cutStuff(counter * (price / prevCounter))).toString();
                priceChange = counter > prevCounter ? +this.productPrice.innerHTML / counter : -this.productPrice.innerHTML / counter;
            }

            this.count.innerHTML = counter;

            priceChange = this.cutStuff(priceChange);
            let counterEvent = new CustomEvent("counter", { detail: { priceChange: priceChange }, bubbles: true });
            this.dispatchEvent(counterEvent);

        }
    }

    customElements.define('pie-counter', CountProduct);

})();
