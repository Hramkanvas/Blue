import { queries } from "../../queries.js";

export let pieMakeOrder = (function () {

    let template = `
    <style>
    button {
        display: flex;
        margin: 0 auto;
        border: none;
        color: white;
        font-size: 16px;
        outline: none;
        cursor: pointer;
        background: #3d8af7;
        padding: 5px 10px;
    }
    button:hover {
        background: #72bb53;
    }

    .btn {
        padding: 10px 20px;
        margin-bottom:20px;
        font-size: 25px;
    }
    
    .btn:hover {
        background: #4c94f8;  
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        cursor:pointer;
    }
    
    .btn:active {
        background: #3787f8;  
    }
    </style>
    <button class="btn btn-submit-orders" id = "btMakeOrder"> Заказать! </button>
    `;

    class MakeOrder extends HTMLElement {
        constructor() {
            super();
            queries.isMakingOrdersForToday().then(orderIsMaking=> {
                 if (orderIsMaking === true){
                    this.attachShadow({mode: 'open'}).innerHTML = template;
                    this.btMakeOrder = this.shadowRoot.getElementById("btMakeOrder");
                    this.makeOrderClick = this.makeOrderClick.bind(this);
                    this.btMakeOrder.addEventListener("click", this.makeOrderClick);
                }
            }).catch(error => {
            });
        }

        makeOrderClick(){
            queries.confirmDayOrder().then(ok =>{
                console.log("OK");
            }).catch(error => {
            });
        }

        disconnectedCallback() {
            this.btMakeOrder.removeEventListener("click", this.makeOrderClick);
        }
    }

    customElements.define('pie-make-order', MakeOrder);
}());