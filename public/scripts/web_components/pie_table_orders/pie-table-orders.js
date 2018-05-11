export let pieTableOrders = (function () {
    let statisticsDay = {
        personalStatistics: [ //example of how to organize json, which comes from the server on the getStatistics request
            {
                name: 'Someone1',
                listOfOrders: 'ListOfSomeone1Orders',
                smthElse: 'smth1'
            },
            {
                name: 'Someone2',
                listOfOrders: 'ListOfSomeone2Orders',
                smthElse: 'smth2'
            },
            {
                name: 'Someone3',
                listOfOrders: 'ListOfSomeone3Orders',
                smthElse: 'smth3'
            }
        ],
        generalStatistics: [
            {
                foodName: 'Pies',
                quantity: 45
            },
            {
                foodName: 'Puddings',
                quantity: 34
            },
            {
                foodName: 'Cookies',
                quantity: 57
            },
            {
                foodName: 'Chocolates',
                quantity: 12
            },
        ]
    };
    let template = `
        <style>
        html {
            height: 100%
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        a {
            color: var(--grey-gark);
            text-decoration: none;
        }
        
        h1, h2, h3, h4, h5, h6, th {
            color: var(--grey-dark)
        }
        
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
        
        input {
            width: 100%;
            display: block;
            border: none;
            outline: none;
            padding: 10px;
            margin-bottom: 20px;
            background-color: white;
        }
        
        label {
            color: var(--grey-dark);
            font-size: 14px;
        }
        
        .toolbar {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin:10px 0 10px 0;
        }
        
        .toolbar select {
            color: #757575;
            width: 24%;
            border: 2px solid #efefef;
        }
        
        .searchBox {
            width: 50%;
            height: 40px;
            font-size: 20px;
            border: 2px solid #efefef;
            display: flex;
        }
        
        .searchBox input {
            height: 100%;
            width: 100%;
            border:none;
            user-select: none;
        }
    .ordersTableHeader {
        width: 100%;
        background: #d6d6d6;
    }
    .ordersTable {
        border: var(--border-component);
        padding: 0px;
        width: 100%;
    }

    .ordersTableHeader > th, .ordersTable > td {
        padding-left: 15px;
    }


    .ordersTable tbody tr:nth-child(odd) {
        background: var(--white-grey);
    }

    .ordersTable tbody tr{
        height: 40px;
    }

    </style>
        
    <div class="toolbar">
            <div class="searchBox">
                <input placeholder="введите пользователя" id="inputZone" list="name">
                <datalist id="name">
                </datalist>
            </div>
        </div>
        <table id="ordersTable" class="ordersTable">
    </table>
    `;

    class TableOrdersClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.getPerson = this.getPerson.bind(this);
            this.nameList = this.shadowRoot.getElementById('name');
            this.inputZone = this.shadowRoot.getElementById('inputZone');
            this.ordersTable = this.shadowRoot.getElementById('ordersTable');
        }

        connectedCallback() {
            this.inputZone.addEventListener('', this.getPerson)//??? ????? ?????????? ??????? getPerson, ??? ?????????? ??????? ???? ??? ????? ?????, ????? ?????? ?????????? ???????
            let template1 = ``;
            let template2 = ``;
            statisticsDay.personalStatistics.forEach(function (item) {
                template1 += `
                    <option value=${item.name}></option>
                `;
                template2 += `
                <tr class="ordersTableHeader">
                    <th>${item.name}</th>
                    <th>${item.listOfOrders}</th>
                    <th>${item.smthElse}</th>
                </tr>
                `;
            }.bind(this))
            this.nameList.innerHTML = template1;
            this.ordersTable.innerHTML = template2;
        }

        disconnectedCallback() {
            this.inputZone.removeEventListener('', getPerson);//??? ??????? ???? ????-?? ??????????? ?????
        }
        getPerson(event) {
            let iNeedThisPerson = statisticsDay.personalStatistics.find(item => item.name === input.value);// ??? ??? ??? ??? ???????
            let template2 = `
                <tr class="ordersTableHeader">
                    <th>${iNeedThisPerson.name}</th>
                    <th>${iNeedThisPerson.listOfOrders}</th>
                    <th>${iNeedThisPerson.smthElse}</th>
                </tr>
                `
            this.ordersTable.innerHTML = template2;
        }

    }

    customElements.define('pie-table-orders', TableOrdersClass);
}());