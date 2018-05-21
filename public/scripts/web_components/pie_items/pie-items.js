import {queries} from "../../queries.js";
export var menu = undefined;
export let pieItems = (function () {

    let userInfo =  JSON.parse(localStorage.getItem("user"));
    let template1 = `
        <style>
            .items {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                grid-gap: 50px 30px;
            }
        </style>
        <div class="items">
        </div>
    `;

    class Items extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template1;
            this.addItems = this.addItems.bind(this);
            this.place = this.shadowRoot.querySelector(".items");
        }

        connectedCallback() {
            this.menu = undefined;
            if (userInfo.type === 'admin'){
                queries.getMenu(1).then(res =>{
                    menu = res;
                    this.addItems(menu);
                });
            } else {
                queries.getMainPageUser(userInfo.username, 1).then(res =>{
                    menu = res[1];
                    console.log(res);
                    this.addItems(menu);
                });
            }
        }

        addItems(menu) {
            for (let day in menu.menuInfo){
                let item = document.createElement('pie-menu-item');
                item.setAttribute("data-day", day);
                item.setAttribute("data-holder", "admin");
                if (userInfo.type === 'admin'){
                    item.setAttribute("data-state", "admin");
                } else {
                    item.setAttribute("data-state", "clear");
                }
                
                this.place.appendChild(item);
            }
        }
    }

    customElements.define('pie-items', Items);

})();