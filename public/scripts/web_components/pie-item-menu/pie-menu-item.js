(function () {

    let menu = {
        'id': 1,
        'fromDate': "20.02.2018",
        'menuInfo': {
            "пн": {
                "хлеб": {
                    weight: 2,
                    count: 1
                },
                "суп": {
                    weight: 22,
                    count: 1
                },
                "бутерброд": {
                    weight: 12,
                    count: 1
                }
            },
            "вт": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                }
            },
            "Ср": {
                "bread": {
                    weight: 2,
                    count: 1
                }
            },
            "Чт": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                }
            },
            "пт": {
                
                "soup": {
                    weight: 22,
                    count: 1
                },
                "egg": {
                    weight: 12,
                    count: 1
                }
            },
            "сб": {
                "bread": {
                    weight: 2,
                    count: 1
                }
            }
        }
    };


    let template = `
    
        <style>
            
            table {
                padding: 0px 20px 30px 20px;
                text-align: left;
                width: 100%;
            }

            th {
                padding-bottom: 20px;
                font-size: 18px;
                padding-top: 10px;
            }

            tr {
                width: 100%;
            }

            td {
                font-size: 18px;
                padding-right: 35px;
                padding-bottom: 3px;
                max-width: 95px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            b {
                color: var(--grey-black);
            }

            i:hover {
                cursor: pointer;
                color: black;
            }

            button {
                display: flex;
                margin: 0 auto;
                border: none;
                color: white;
                font-size: 16px;
                outline: none;
                cursor: pointer;
                background: #3d8af7;
                padding: 10px 20px;
            }

            .itemFunc {
                display: flex;
                padding-bottom: 15px;
                justify-content: space-between;
                align-items: center;
            }

            .itemFunc h5 {
                text-transform: capitalize;
                text-align: left;
                font-size: 30px;
                font-weight: 600;
                margin: 10px 20px;
            }

            .item {
                position: relative;
                top:0px;
                max-width: 450px;
                min-height: 400px;
                text-align: center;
                background: #f7f6f6;
                border-radius: var(--border-radius-component);
                border: var(--border-component);
                padding: 20px;
                box-shadow: 4px 6px 8px 0px #0000004a;
                transition: top 0.4s;
            }
            
            .item:active {
                top: -10px;
            }
            
            .item:hover {
                top: -10px;
            }

            .itemFuncButtons i {
                font-size: 27px;
                margin: 0px 2px;
            }

            .countProducts, .remove, .add {
                margin: 0px 5px;
            }

            .price {
                color: var(--grey-black);
                position: absolute;
                padding: 20px 0px;
                background: var(--white-grey);
                font-size: 20px;
                font-weight: bold;
                width: 100%;
                right: 0;
                bottom: 0;
            }

            .price.edit {
                bottom: 70px;
                padding: 10px 0px;
            }


            .orderButton {
                padding: 10px 20px;
                position: absolute;
                left: 50%;
                bottom: 5%;
                transform: translate(-50%);
            }

            .orderButton.edit {
                padding: 5px 10px;
            }

            .pastMenu {
                border-top: 3px solid black;
            }

            .editMenu {
                box-shadow: 4px 5px 6px 1px #1464f685;
                border-top: 3px solid #1464f6;
            }

            .editMenu td {
                padding-right: 20px;
            }

            .countProducts {
                display: flex;
            }

            .addMenu {
                position: absolute;
                top: 88%;
                width: 100%;
                left: 0;
            }

            button:hover {
                background: #72bb53;
            }

            .futureMenu {
                box-shadow: 4px 5px 6px 1px #72bb537a;
                border-top: 3px solid #72bb53;
            }

            .item caption {
                font-size: 15px;
            }

        </style>
        
        <div class="item">
                <div class="itemFunc">
                    <h5></h5>
                </div>
            
                <div class="itemMenu">
                    <table>
                        <caption>Меню на день:</caption>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
    `;

    class MenuItem extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template; 
            this.renderTable = this.renderTable.bind(this);
            this.itemState = this.itemState.bind(this);
            this.day = this.shadowRoot.querySelector(".itemFunc");
            this.place = this.shadowRoot.querySelector("tbody");
            
            this.sendOrder = this.shadowRoot.getElementById("sendOrder");
            

            this.item = this.shadowRoot.querySelector(".item");
            this.table = ``;
            this.dayMenu = ``;
        }

        connectedCallback() {
            
            this.shadowRoot.querySelector(".item").addEventListener("counter", function (e) {
                let priceChange = e.detail.priceChange;
                let pastPrice = +this.shadowRoot.getElementById("price").innerText;

                let place = this.shadowRoot.getElementById("price");
                place.innerHTML = `${pastPrice + priceChange}`

            }.bind(this))
            
            this.makeOrder = this.shadowRoot.getElementById("makeOrder");
            this.makeOrder.addEventListener("click", (e) => {
                this.setAttribute("data-state", "editMenu")
            })
        }

        static get observedAttributes() {
            return ['data-day', 'data-state'];
        }

        attributeChangedCallback(attrName, oldVal, newVal){
            switch (attrName) {
                case 'data-day':
                    return this.renderTable(newVal);
                
                case 'data-state':
                    return this.itemState(newVal);;
            }
        }
        
        renderTable (attr) {
            
            this.dayMenu = attr;
            this.day.innerHTML = `<h5>${attr}</h5>`;

            let index = Object.keys(menu.menuInfo[attr]);
            this.table = ``;

            for (let i = 0; i < index.length; i++) {
                
                let food = Object.keys(menu.menuInfo[attr]);
                let price = menu.menuInfo[attr][food[i]].weight;
                
                this.table += `<tr><td>${food[i]}</td><td><b>${price}</b> руб.</td></tr>`                
            }
        }
        
        itemState(attr) {
                        
            let itemState = this.shadowRoot.querySelector(".item");
            
            switch (attr) {
                case "pastMenu":
                    this.item.innerHTML = `
                        <div class="itemFunc">
                            <h5>${this.dayMenu}</h5>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Оформленный заказ:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <div class="price">
                            Итого: 56 руб.
                        </div>`
                    itemState.classList.add(attr);
                break;

                case "futureMenu":
                    this.item.innerHTML = `
                    <link rel="stylesheet" type="text/css" href="styles/font-awesome.css">
                        <div class="itemFunc">
                            <h5>${this.dayMenu}</h5>
                            <div class="itemFuncButtons">
                                <span>
                                    <i class="fa fa-pencil"></i>                           
                                </span>
                            
                                <span>
                                    <i class="fa fa-trash"></i>                  
                                </span>
                            </div>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Оформленный заказ:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <div class="price">
                            Итого: 56 руб.
                        </div>
                    `;
                    itemState.classList.add(attr);                            
                    itemState.appendChild(total);
                    this.day.appendChild(link);
                    this.day.appendChild(buttons);
                break;

                case "clear":
                
                    this.item.innerHTML = `
                    <link rel="stylesheet" type="text/css" href="styles/font-awesome.css">
                        <div class="itemFunc">
                            <h5>${this.dayMenu}</h5>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Меню на день:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <button class="orderButton" id="makeOrder">
                            Сформировать заказ
                        </button>
                    `;
                    itemState.classList.remove("editMenu", "futureMenu", "pastMenu");
                    
                break;

                case "editMenu":

                    this.item.innerHTML = `
                    <link rel="stylesheet" type="text/css" href="styles/font-awesome.css">
                        <div class="itemFunc">
                            <h5>${this.dayMenu}</h5>
                            <div class="itemFuncButtons">                   
                                <span>
                                    <i class="fa fa-trash"></i>                  
                                </span>
                            </div>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Меню на день:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th><th>Кол-во</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <div class="price edit">Итого: <b id="price">0</b> руб.</div>
                        <button class="orderButton edit" id="sendOrder">Заказать</button>
                    `;
                    itemState.classList.add(attr);

                    let trs = this.shadowRoot.querySelectorAll("tr~tr");                    
                    trs.forEach(item => {
                        let td = document.createElement("td");
                        let counter = document.createElement("count-product");
                        td.appendChild(counter);                       
                        item.appendChild(td);
                    });

                break;

                default:
                    alert('ошибка :(');

            };
            
        }

    }

    customElements.define('item-menu', MenuItem);

})();