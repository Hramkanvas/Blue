import { queries } from "../../queries.js";
import {pieError} from "../pie_error/pie-error.js";
import {templates} from "../templates/templates.js";
export let pieUpBalance = (function () {
    let templateT = templates.pieUpBalanceTemplate;
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
            this.clickUpBalanceEvent = this.clickUpBalanceEvent.bind(this);
            this.changeCurrentUserEvent = this.changeCurrentUserEvent.bind(this);
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
            const fio = event.target.value;
            this.currentUser = this.users.find(user => user.FIO === fio);
            if (this.currentUser !== undefined) {
                this.updateUserInfo(this.currentUser);
            } else {
                this.textBalance.textContent = '';
                this.textWorkerName.textContent = '';
            }
        }

        clickUpBalanceEvent(event) {
            if (this.currentUser !== undefined) {
                if (this.balanceInput.value.match(/^([0-9]+\.?[0-9]*)$/)) {
                    let inputBalance = Number(this.balanceInput.value);
                    queries.upBalance(this.currentUser.username, inputBalance).then((value)=>{
                        this.currentUser = value;
                        this.updateUserInfo();
                        let index = this.users.findIndex(x => x.FIO === this.currentUser.FIO);
                        this.users[index] = value;
                        this.balanceInput.value = '';
                        pieError.showError("Баланс пополнен");
                    }, (reason) => {
                        pieError.showError(reason);
                    });
                } else {
                    pieError.showError("Неправильный ввод");
                }
            } else {
                pieError.showError("Пользователь не выбран");
            }
        }

        loadUsers() {
            this.users.forEach(user => {
                let option = document.createElement("option");
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