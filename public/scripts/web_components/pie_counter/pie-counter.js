export let pieCounter = (function () {

    let template = `
    
        <link rel="stylesheet" type="text/css" href="../styles/font-awesome.css">

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
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.calculate = this.calculate.bind(this);
            this.remove = this.shadowRoot.getElementById("remove");
            this.add = this.shadowRoot.getElementById("add");
            this.count = this.shadowRoot.getElementById("count");
            this.render = this.render.bind(this);
        }

        connectedCallback() {
            this.remove.addEventListener("click", this.calculate);
            this.add.addEventListener("click", this.calculate);
        }

        disconnectedCallback() {
            this.remove.addEventListener("click", this.calculate);
            this.add.addEventListener("click", this.calculate);        
        }

        calculate(e) {
            
            if (e.path[1].id === "remove") {
                if (this.counter <= 0) {
                    this.counter = 0;
                    this.render(this.counter);
                }
                else{
                    this.counter--;
                    this.render(this.counter);
                }                
            }
            else if (e.path[1].id === "add") {
                this.counter++;
                this.render(this.counter);
            }
        }

        render(counter) {
            this.count.innerHTML = counter;
        }
    }

    customElements.define('count-product', CountProduct);

})();