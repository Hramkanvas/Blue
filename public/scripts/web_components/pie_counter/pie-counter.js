export let counter = (function () {

    let template = `

        <link rel="stylesheet" type="text/css" href="styles/font-awesome.css">
        <style>
            .countProducts {
                user-select: none;
            }
            .remove, .add {
                cursor:pointer;
            }
        </style>

        <div class="countProducts">
            <span class="remove" id="remove">
                <i class="fa fa-minus"></i>
            </span>

            <span class="count" id="count">0</span>

            <span class="add" id="add">
                <i class="fa fa-plus"></i>
            </span>
        </div>
    `;

    class CountProduct extends HTMLElement {
        constructor() {
            super();
            this.counter = 0;
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.calculate = this.calculate.bind(this);
            this.remove = this.shadowRoot.getElementById("remove");
            this.add = this.shadowRoot.getElementById("add");
            this.count = this.shadowRoot.getElementById("count");
            this.render = this.render.bind(this);
            this.productPrice = 0;
        }

        connectedCallback() {
            this.remove.addEventListener("click", this.calculate);
            this.add.addEventListener("click", this.calculate);
        }

        disconnectedCallback() {
            this.remove.addEventListener("click", this.calculate);
            this.add.addEventListener("click", this.calculate);
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

        render(counter, prevCounter) {
            prevCounter = +prevCounter;
            let price = this.productPrice.innerText || 1;
            console.log(prevCounter);

            let priceChange = 0;
            if (counter === 0 || prevCounter === 0) {
                this.productPrice.innerHTML = price;
                priceChange = counter === 0 && prevCounter === 0 ? 0 : (counter > prevCounter ? +this.productPrice.innerHTML : -this.productPrice.innerHTML);
            }
            else if (counter === 1 && prevCounter === 2) {
                this.productPrice.innerHTML = (price / 2).toString();
                priceChange = -this.productPrice.innerHTML;
            }
            else {
                this.productPrice.innerHTML = (counter * (price / prevCounter)).toString();
                priceChange = counter > prevCounter ? +this.productPrice.innerHTML / counter : -this.productPrice.innerHTML / counter;
            }
            this.count.innerHTML = counter;

            let counterEvent = new CustomEvent("counter", {detail: {priceChange: priceChange}, bubbles: true});
            this.dispatchEvent(counterEvent);
        }
    }

    customElements.define('pie-counter', CountProduct);

})();
