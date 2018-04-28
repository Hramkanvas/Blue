(function () {
    let templateTT = `
    <style>
    
    .ordersComponent {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
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
    
    .ordersTableHeader {
        width: 100%;
        background: #d6d6d6;
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
    
    .btn {
        padding: 10px 20px;
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
    
    .statistics {
        margin: 40px 0px;
        background: #e7e6e6;
        width: 100%;
        min-height: 70px;
        text-align: center;
        padding: 15px 0px;
        border-radius: var(--border-radius-component);
        border: var(--border-component);
    }
    
    .ordersResult {
        display: flex;
        padding-top: 20px;
        justify-content: center;
    }
    
    .ordersResult td {
        padding: 0px 70px;
    }
    
    .ordersResult tr:nth-child(odd) {
        background: #afafaf59;
    }
    
    input:focus, select:focus {
        outline: none;
    }
    
    .searchIcon {
        width:auto !important
    }
    
    </style>
   
    <div id="orders" class="tabcontent">
        <div class="ordersComponent">
            <div class="toolbar">
        
                <div class="searchBox">
                    <img class="searchIcon" src=""></img>
                    <input placeholder="Введите пользователя" list="name">
        
                    <datalist id="name">
                        <option value="admin"></option>
                        <option value="lol"></option>
                        <option value="asdas"></option>
                    </datalist>
                </div>
        
                <select>
                    <option selected disabled>День недели</option>
                    <option value="1">Понедельник</option>
                    <option value="2">Вторник</option>
                    <option value="3">Среда</option>
                    <option value="4">Четверг</option>
                    <option value="5">Пятница</option>
                    <option value="6">Суббота</option>
                </select>
            </div>
        
        
        
            <table class="ordersTable">
        
                <tr class="ordersTableHeader">
                    <th>Имя</th>
                    <th>Заказ</th>
                    <th>ЕЩЕ</th>
                </tr>
        
                <tr class="ordersTable">
                    <td>Павел</td>
                    <td>Котлета</td>
                    <td>ЕЩЕ</td>
                </tr>
        
                <tr class="ordersTable">
                    <td>НеПавел</td>
                    <td>НеКотлета</td>
                    <td>ЕЩЕ</td>
                </tr>
                <tr class="ordersTable">
                    <td class="table-name">Павлуша</td>
                    <td>НеКотлета</td>
                    <td>ЕЩЕ</td>
                </tr>
            </table>
        
            <div class="statistics">
                <h3>Итоговый заказ</h3>
                <table class="ordersResult">
                    <tr class="ordersResult-row">
                        <td>Котлет</td>
                        <td>56</td>
                    </tr>
                    <tr class="ordersResult-row">
                        <td>Пюрешки</td>
                        <td>2</td>
                    </tr>
                    <tr class="ordersResult-row">
                        <td>Суп</td>
                        <td>1</td>
        
                    </tr>
                </table>
            </div>
        
            <button class="btn btn-submit-orders">
                Заказать!
            </button>
        </div>
    </div>
    `;

    class AdminTableClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = templateTT;
            this.textField = this.shadowRoot.getElementById('valueText');
            this.value = 0;

        }
        static get observedAttributes() { return ['clicked']; }

        attributeChangedCallback(name, oldValue, newValue) {
            this.value++;
            this.textField.innerText = this.value;
        }
    }

    customElements.define('admin-table-component', AdminTableClass);
})();