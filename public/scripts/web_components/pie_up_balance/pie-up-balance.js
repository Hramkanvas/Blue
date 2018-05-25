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
            this.form = this.shadowRoot.getElementById('upBalance');
            this.userInput = this.shadowRoot.getElementById('username');
            this.balanceInput = this.shadowRoot.getElementById('balanceInput');
            this.infoBlock = this.shadowRoot.getElementById('info');
            this.textWorkerName = this.shadowRoot.getElementById('workerName');
            this.textBalance = this.shadowRoot.getElementById('balance');
            this.infoBlock.style.visibility = 'hidden';
            this.saveUsers = this.saveUsers.bind(this);
            this.currentUser = {};
            queries.getUsers().then(this.saveUsers, function (reason) {
            });
        }

        saveUsers(users) {
            this.users = users;
            this.loadUsers();
        }

        updateUserInfo() {
            this.textBalance.textContent = this.currentUser.balance;
            this.textWorkerName.textContent = this.currentUser.FIO;
        }

        changeCurrentUserEvent(e) {
            const fio = e.target.value;
            this.currentUser = this.users.find(user => user.FIO === fio);
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

        clickUpBalanceEvent(e) {
            e.preventDefault();
            if (this.currentUser !== undefined) {
                if (this.balanceInput.value.match(/^([0-9]+\.?[0-9]*)$/)) {
                    let inputBalance = Number(this.balanceInput.value);
                    queries.upBalance(this.currentUser.username, inputBalance).then((value) => {
                        this.currentUser = value;
                        this.updateUserInfo();
                        let index = this.users.findIndex(x => x.FIO === this.currentUser.FIO);
                        this.users[index] = value;
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
            this.form.addEventListener('submit', (e) => { this.clickUpBalanceEvent(e) });
            this.userInput.addEventListener('input', (e) => { this.changeCurrentUserEvent(e) });
        }

        disconnectedCallback() {
            this.form.addEventListener('submit', this.clickUpBalanceEvent);
            this.userInput.removeEventListener('input', this.changeCurrentUserEvent);
        }
    }
    customElements.define('pie-up-balance', UpBalanceClass);
}());