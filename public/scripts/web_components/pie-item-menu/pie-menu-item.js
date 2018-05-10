export let pieMenuItem = (function () {

    let menu = {
        id: 1,
        fromDate: "20.02.2018",
        menuInfo: {
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
                padding: 5px 10px;
            }

            .itemFunc {
                display: flex;
                padding-bottom: 15px;
                justify-content: space-between;
                align-items: center;
            }

            .itemFunc h5 {
                text-align: left;
                font-size: 30px;
                font-weight: 600;
                margin: 10px 20px;
            }

            .item {
                position: relative;
                min-width: 350px;
                max-width: 450px;
                min-height: 450px;
                text-align: center;
                background: #f7f6f6;
                border-radius: var(--border-radius-component);
                border: var(--border-component);
                padding: 20px;
                box-shadow: 4px 6px 8px 0px #0000004a;
            }

            .itemFuncButtons i {
                font-size: 27px;
                margin: 0px 2px;
            }

            .countProducts, .remove, .add {
                margin: 0px 5px;
            }

            .price {
                position: absolute;
                padding: 20px;
                background: var(--white-grey);
                font-size: 20px;
                font-weight: bold;
                width: 100%;
                right: 0;
                bottom: 0;
            }

            .price.edit {
                bottom: 70px;
                padding: 10px;
            }

            .newMenu {
                padding: 10px 20px;
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
                    <h5>Пт</h5>
                </div>
            
                <div class="itemMenu">
                    <table>
                        <caption>Меню на день:</caption>
                        <tbody>
                            <tr>
                                <th>Продукт</th>
                                <th>Цена</th>
                            </tr>

                            <tr>
                                <td>Мясо</td>
                                <td><b>56</b> руб.</td>
                            </tr>

                            <tr>
                                <td>Картошка</td>
                                <td><b>56</b> руб.</td>
                            </tr>
                            <tr>
                                <td>Мясо</td>
                                <td><b>56</b> руб.</td>
                            </tr>
                            <tr>
                                <td>Картошка</td>
                                <td><b>56</b> руб.</td>
                            </tr>
                            <tr>
                                <td>Мясо</td>
                                <td><b>56</b> руб.</td>
                            </tr>
                            <tr>
                                <td>Картошка</td>
                                <td><b>56</b> руб.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    `;

    class MenuItem extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template; /* tmpl.content.cloneNode(true) */
            this.buttonMake = this.shadowRoot.getElementById("makeOrder");
        }

    }

    customElements.define('menu-item', MenuItem);

})();