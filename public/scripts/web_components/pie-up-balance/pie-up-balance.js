import { queries } from "../../queries.js";

export let pieUpBalance = (function () {
    let templateT = `
        <style>
        .upBalanceBlock {
            display: flex;
            flex-direction: column;
            width: 550px;
            padding: 30px 80px;
            background-color: var(--white-grey);
            margin: 0px auto;
            border-radius: var(--border-radius-component);
            border: var(--border-component);
        }

        button:hover {
            background: #72bb53;
        }

        .upBalanceBlock > div {
            padding-bottom: 30px;
        }

        .info p {
            font-size: 20px;
        }
        
        .worker {
            float:left;
        }
        
        .balance{
            float:right;
        }

        .balance div, .worker div{
            display: inline-block;
        }
        
        .bottomStuff p {
            margin: 0;
            color: #444444;
            font-size: 100%;
            font-weight: bold;
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
        </style>
        <div id="upbalance" class="tabcontent">
        
        <div class="upBalanceBlock">
            <div id = "info" class="info">
                <div class="worker">
                    <div>
                        <p><b>Сотрудник: </b></p>
                    </div>
                    <div>
                        <p id = "workerName"> Иванов </p>
                    </div>  
                </div>
                <div class="balance">
                    <div>
                        <p><b>Баланс:</b></p>
                    </div>
                    <div>
                        <p id = "balance">4455555</p>
                    </div>
                </div>
            </div>
            <form>
                <label for="username">Сотрудник:
                    <input type="text" id="username" list="character">
                </label>
                <datalist id="character">
                   
                </datalist>
                <label for="balance" list="character"> Сумма:
                    <input id = "balanceInput" type="number" min = "0"> </label>
            </form>
            <button id = "btUpBalance" >Пополнить</button>
        </div>
    </div>`;


    class UpBalanceClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = templateT;
            this.dataList = this.shadowRoot.getElementById('character');
            this.buttonUpBalance = this.shadowRoot.getElementById('btUpBalance');
            this.userInput = this.shadowRoot.getElementById('username');
            this.balanceInput = this.shadowRoot.getElementById('balanceInput');
            this.infoBlock = this.shadowRoot.getElementById('info');
            this.textWorkerName = this.shadowRoot.getElementById('workerName');
            this.textBalance = this.shadowRoot.getElementById('balance');
            this.infoBlock.style.visibility = 'hidden';

            this.clickUpBalanceEvent = this.clickUpBalanceEvent.bind(this);
            this.changeCurrentUserEvent = this.changeCurrentUserEvent.bind(this);
            this.loadUsers = this.loadUsers.bind(this);
            this.updateUserInfo = this.updateUserInfo.bind(this);
            this.saveUsers = this.saveUsers.bind(this);

            this.currentUser = {}; 

            queries.getUsers().then(this.saveUsers, function(reason) {
                
            });
          
        }

        saveUsers(users){
            this.users = users;
            this.loadUsers();
        }

        updateUserInfo() {
            this.textBalance.textContent = this.currentUser.balance;
            this.textWorkerName.textContent = this.currentUser.FIO;
        }

        changeCurrentUserEvent(event) {
            this.currentUser = {};
            this.currentUser.FIO = event.target.value;
            this.currentUser = this.users.find(user => user.FIO === this.currentUser.FIO);
            if (this.currentUser !== undefined) {
                if (this.infoBlock.style.visibility === 'hidden') {
                    this.infoBlock.style.visibility = 'visible';
                }
                this.updateUserInfo(this.currentUser);
            } else {
                if (this.infoBlock.style.visibility === 'visible') {
                    this.infoBlock.style.visibility = 'hidden';
                }
            }
        }

        clickUpBalanceEvent(event) {
            if (this.currentUser !== undefined) {
                if (this.balanceInput.value.match(/^([0-9]+\.?[0-9]*)$/)) {
                    var inputBalance = Number(this.balanceInput.value);
                    queries.upBalance(this.currentUser.username, inputBalance).then(function (value) {
                        this.currentUser = value;
                        this.updateUserInfo();
                        var index = this.users.findIndex(x => x.FIO === this.currentUser.FIO);
                        this.users[index] = value;
                    }.bind(this), function (reason) {
                        //компонент с ошибкой
                        alert("Problems.");
                    });
                } else {
                    //компонент с ошибкой
                    alert("неправильный ввод. Должен выводиться компонент с ошибкой, но его пока нет");
                }
            }
            else {
                alert("Пользователь не выбран");
            }

        }

        loadUsers() {
            this.users.forEach(user => {
                var option = document.createElement("option");
                option.text = user.FIO;
                this.dataList.appendChild(option);
            });
        }

        connectedCallback() {
            this.buttonUpBalance.addEventListener('click', this.clickUpBalanceEvent);
            this.userInput.addEventListener('input', this.changeCurrentUserEvent);
        }

        disconnectedCallback() {
            this.buttonUpBalance.removeEventListener('click', this.clickUpBalanceEvent);
            this.userInput.removeEventListener('input', this.changeCurrentUserEvent);
        }
    }
    customElements.define('pie-up-balance', UpBalanceClass);
}());