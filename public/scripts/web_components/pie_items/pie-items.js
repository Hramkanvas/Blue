export let pieItems = (function () {

    let menu = {
        'id': 1,
        'fromDate': "20.02.2018",
        'menuInfo': {
            "mon": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                },
                "egg": {
                    weight: 12,
                    count: 1
                }
            },
            "wen": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                },
                "egg": {
                    weight: 12,
                    count: 1
                }
            },
            "tr": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                },
                "egg": {
                    weight: 12,
                    count: 1
                }
            },
            "th": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                },
                "egg": {
                    weight: 12,
                    count: 1
                }
            },
            "fr": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                },
                "egg": {
                    weight: 12,
                    count: 1
                }
            },
            "sb": {
                "bread": {
                    weight: 2,
                    count: 1
                },
                "soup": {
                    weight: 22,
                    count: 1
                },
                "egg": {
                    weight: 12,
                    count: 1
                }
            }
        }
    };


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
            this.addItems(menu);
        }

        addItems(menu) {
            for (let day in menu.menuInfo){
                let item = document.createElement('pie-menu-item');
                item.setAttribute("data-day", day);
                this.place.appendChild(item);
            }
        }

    }
    customElements.define('pie-items', Items);

})();
