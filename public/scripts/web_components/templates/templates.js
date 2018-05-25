export let templates = (function () {
    return {
        pieArrowTemplate: `
        <link rel="stylesheet" type="text/css" href="../../../styles/font-awesome.css">
        <style>
            
            i:hover {
                cursor: pointer;
                color: black
            }

            .items {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                grid-gap: 50px 30px;
            }

            .leftArrow, .rightArrow {
                position: fixed;
                top: 50%;
                font-size: 40px;
                color: #d6d6d6;
            }
            
            .leftArrow i, .rightArrow i {
                padding: 15px;
            }

            .leftArrow {
                left: 2%;
            }

            .rightArrow {
                right: 2%;
            }

        </style>

        <div class="items">
            
            <div class="leftArrow" id="leftArrow">
                <span>
                    <i class="fa fa-arrow-left"></i>
                </span>
            </div>

            <div class="rightArrow" id="rightArrow">
                <span>
                    <i class="fa fa-arrow-right"></i>
                </span>
            </div>

            <div>
                <menu-item></menu-item>
            </div>

        </div>
    `,
        pieAuthorizationTemplate: `
    <style>
    
     p {
        font-size: 16px;
    }
      
    h1, h2, h3, h4, h5, h6, th {
        color: grey
    }
    
    body {
        display: flex;
        width: 100%;
        margin: 0 auto;
        min-width: 320px;
        flex-direction: column;             
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #7a7a7a;
    }
    
    .authorizationBlock {
        --fon: red;
        background: #ebebeb;
        border-radius: 3px;
        border: 1px solid #7a7a7a1a;
        padding: 30px;
        width: 460px;
        height: max-content;
        margin: 10% auto;
    }
    
    .bottomStuff h3 {
        font-size: 25px;
        text-align: center;
        margin-bottom: 25px;
        margin-top: 0px;
    }
    
    .bottomStuff p {
        margin: 0;
        color: #444444;
        font-size: 100%;
        font-weight: bold;
    }
    
    button:hover {
        background: #72bb53;
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
    
    input {
        width: 100%;
        display: block;
        border: none;
        outline: none;
        padding: 10px 0px;
        margin-bottom: 20px;
        background-color: white;
    }
    
    label {
        color: grey;
        font-size: 14px;
    }

    .Error{
        box-shadow: 0px 0px 15px darkred;
        transition: all 0.7s;        
    }
    
    </style>
    
    <div class="authorizationBlock" id="authorizationBlock">
        <div class="bottomStuff">
            <h3>Авторизация</h3>
        </div>
        <form name="authorize" id="authorizeForm">
            <label for="username" >Имя:</label>
            <input name="login" type="text" id="username" required>
            <label for="password">Пароль:</label>
            <input name="password" type="password" id="password" required>
            <button type="submit">Войти</button>
        </form>
    </div>
    `,
        pieCounterTemplate: `

        <link rel="stylesheet" type="text/css" href="../../../styles/font-awesome.css">
        <style>
            .countProducts {
                user-select: none;
            }
            .remove, .add {
                cursor:pointer;
            }
        </style>

        <div class="countProducts">
            <span class="remove" id="remove">
                <i class="fa fa-minus"></i>
            </span>

            <span class="count" id="count">0</span>

            <span class="add" id="add">
                <i class="fa fa-plus"></i>
            </span>
        </div>
    `,
        pieDragNDropTemplate: `
        <style>
        button:hover {
            background: #72bb53;
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

        #dropZone {      
            text-align: center;
            width: 50%;
            padding: 25px 0;
            margin: 0 auto;
            margin-bottom: 10px;
            background: #f9f9f9;
            border: dashed 2px #e6e6e6;
            border-radius: 2.5px;
        }

        #drag {
            margin-top: 30px;
        }
        
        #dropZone:hover {
            background: #f2f2f2;
            border-color: #d9d9d9;
        }
        </style>
        <div id = "drag">
            <div id="dropZone">
                Для загрузки меню, перетащите файл сюда.
            </div>
        </div>
        <button id = "btUpload"> Загрузить файл </button>
        `,
        pieErrorTemplate: `
        <style>
         #error {
            width:100%;
            height:100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index:9999;
            background-color: rgba(0, 0, 0, 0.46);
        }

        #errorBlock {
            padding: 35px 15px;
            margin-left: 0 auto;
            width: 400px;
            background-color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border-radius: var(--border-radius-component);
            border: var(--border-component);
        }

        #messageText {
            margin-bottom:10px;
            text-align:center;
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
            margin-top: 15px;
        }

        button:hover {
            background: #72bb53;
        }
        </style>
        <div id = "error">
           <div id = "errorBlock">
                <div id = "messageText">
                    Это текст для сообщения.
                </div>
                <button id = "closeMessage" > OK </button>
           </div>    
        </div>
        `,
        pieFooterTemplate: `
        <style>
            .bottom-content {
                display: flex;
                flex-basis: 100%;
                justify-content: center;
                background: #eaeaea;
            }
        </style>
        <div class = "bottom-content">
        <p>Exadel</p>
        </div>
    `,
        pieGeneralInfoTemplate: `
        <style>
            .generalInfo {
                margin: 20px 0px;
                display: flex;
                justify-content: space-between;
            }

            .generalInfo p {
                font-size: 24px;
                font-weight: bold;
            }
        </style>

        <div class="generalInfo">
                <div class="timeShedule" id = "week"> </div>
                <div class="countMoney" id = "moneyForWeek"> </div>
        </div>`,
        pieHeaderStyleTemplate:
            `
        <style> 
        a {
            text-decoration: none;
        }
        
        .header-content {
            position: relative;
            top: 0px;
            display: flex;
            background-color: #f7f7f7;
            z-index: 2;
            align-items: center;
            justify-content: space-around;
            color: var(--grey-dark);
            box-shadow: rgba(165, 164, 164, 0.45) 0px 2px 4px;
            padding: 10px 0px;
        }

        .logo {
            padding: 0px 5px;
            width: 110px;
            margin-right: auto;
            margin-left: 50px;
        }

        .logo img {
            width: 100%;
        }

        .userInfo {
            font-size: 25px;
        }

        .userInfo span {
            margin: 0px 20px;
        }

        .userInfoName {
            padding-right: 120px;
        }

        .userInfoButton:hover{
            background: #3d8af7;
            color:white;
        }

        .userInfoButton {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;    
            padding: 0px 15px;
            display: flex;
            margin-right: 0px !important;
            cursor: pointer;
            align-items: center;
        }

        

        </style>`,
        /*
        `<div class="header-content">
            <div class="logo">
                <img src="img/logoExadel.png" alt="logoExadel">
            </div>
            <div class="userInfo">
            <span class="userInfoBalans" id = "balance"> </span>
                <span class="userInfoName">
                    ${userInfo.FIO}
                </span>
                <span class="userInfoButton">
                    <a>Выход</a>
                </span>
            </div>
        </div>
    `,*/
        pieItemsTemplate: `
        <style>
            .items {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                grid-gap: 50px 30px;
            }
        </style>
        <pie-wait id = "waiting"></pie-wait>
        <div class="items">
        </div>
    `,
        pieMakeOrderTemplate:
            `
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
    `,
        pieMenuGeneralTemplate:
            `
    <style>
    html {
	height: 100%
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .tabContent {
        display: none;
    }
    .tabContent.active{
        display: block;
    }
    </style>
    
    <div id="menu" class="tabContent">
        <pie-drag-and-drop></pie-drag-and-drop>
        <pie-general-info></pie-general-info>
        <pie-items></pie-items>
    </div>
    `,
        pieMenuItemTemplate: `

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
                min-height: 450px;
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
    `/*,
        pieMenuItemAdminTemplate: `
                        <div class="itemFunc">
                            <h5>${this.dayName}</h5>
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
                    `*/
        ,
        pieOrdersGeneralComponentTemplate: `
    <style>
    html {
	height: 100%
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .tabContent {
        display: none;
    }
    
    .tabContent.active{
        display: block;
    }
    
    </style>
    
    <div id="menu" class="tabContent">
        <pie-table-orders></pie-table-orders>
        <pie-statistics-day></pie-statistics-day>
        <pie-make-order></pie-make-order>
    </div>
    `,
        pieShowMainPartTemplate: `
        <pie-general-info id = "info"></pie-general-info>
        <pie-arrows id = "arrows"></pie-arrows>
        <pie-items></pie-items>
    `,
        pieStatisticsDayComponentTemplate:
            `
    <style>
    html {
	height: 100%
    }
    
    * {
        font-weight:normal;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    h3 {
        display: block;
        font-size: 1.17em;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    
    table {
        padding: 0px 20px 30px 20px;
        text-align: left;
        width: 100%;
    }
    
    th {
        font-weight:normal;
        padding-bottom: 20px;
        font-size: 18px;
        padding-top: 10px;
    }
    
    tr {
        font-weight:100;
        width: 100%;
    }
    
    td {
        font-weight:normal;
        font-size: 18px;
        padding-right: 35px;
        padding-bottom: 3px;
    }
    p {
        font-size: 16px;
    }
      
    h1, h2, h3, h4, h5, h6, th {
        color: grey
    }
    
    .statistics {
        margin: 40px 0px;
        width: 100%;
        min-height: 70px;
        text-align: center;
        padding: 15px 0px;
    }
    
    .ordersResult {
        display: flex;
        padding-top: 20px;
        justify-content: center;
    }
    
    .ordersResult td {
        padding: 0px 70px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #7a7a7a;  
    }
    
    .ordersResult tr:nth-child(odd) {
        background: #F3F8FF;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: white;  
    }
    
    </style>
    
    <div class="statistics">
        <h3>Итоговый заказ: </h3>
        <table id="generalStatisticsTable" class="ordersResult"> </table>
        <h3 id = "total">Итого: </h3>
    </div>
    `,
        pieTableOrdersTemplate:
            `
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
            text-decoration: none;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: var(--grey-dark)
        }
        
        table {
            padding: 0px 20px 30px 20px;
            text-align: left;
            width: 100%;
        }
        
        th {
            font-weight:normal;
            text-align:center;
            border: 0.5px solid #e0e0eb;
            padding-bottom: 10px;
            font-size: 18px;
            padding-top: 10px;
        }
        
        tr {
            background-color:white;
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
            margin:auto;
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
        padding: 0px;
        margin: auto;
        width: 80%;
    }

    .ordersTableHeader > th, .ordersTable > td {
        padding-left: 15px;
    }
    
    .ordersTable tbody tr:nth-child(odd) {
        background: #F3F8FF;
    }


    .ordersTable tbody tr{
        height: 40px;
    }

    .headerTable th{
        background-color:#3d8af7;
        color:white;
        text-align:center;
    }

    .firstColumn{
        width:25%;
    }

    </style>
        
    <div class="toolbar">
            <div class="searchBox">
                <input placeholder="Поиск пользователей" id="inputZone" list="name">
                <datalist id="name">
                </datalist>
            </div>
        </div>
        <table  class="ordersTable">
        <tbody id="ordersTable">
        <tr class="ordersTableHeader headerTable" id = "header">
            <th class = "firstColumn">Имя</th>
            <th>Заказ</th>
            <th>Сумма заказа</th>
        </tr>
        </tbody>
    </table>
    `,
        pieTabsTemplate: `
		<style>
p {
    font-size: 16px;
}

h1, h2, h3, h4, h5, h6, th {
    color: grey
}

a {
    padding: 0px 40px; 
color: var(--grey-dark);
text-decoration: none;
}

.tabMenu {
    font-size: 24px;
    text-align: center;
    background-color: #f9f9f9; 
    border-radius: var(--border-radius-component);
    border: var(--border-component);
    display: grid;
    margin: 25px 0px;
    grid-template-columns: 33% 33% 34%
}

.tabMenu div {
    padding: 10px 0px;
}

.tabMenuItem.active {
    color: #3d8af7;
}

body {
    display: flex;
    width: 100%;
    margin: 0 auto;
    min-width: 320px;
    flex-direction: column;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #7a7a7a;
}

.tabMenu div:hover, .tabMenu div:hover .tabMenuItem.active{
    background: #3d8af7;
    color:white;
}
</style>

<div class="tabMenu">
    <div><a href="#" id="menuRef"        class="tabMenuItem active">Меню</a> </div>
    <div><a href="#" id="upBalanceRef"   class="tabMenuItem">Пополнить баланс</a> </div>
    <div><a href="#" id="ordersRef"      class="tabMenuItem">Заказы</a> </div>
</div>
<pie-menu-general tabstate="activeTab" id="pieMenuGeneral"></pie-menu-general>
<pie-upbalance-general tabstate="nonactiveTab" id="pieUpBalance"></pie-upbalance-general>
<pie-orders-general tabstate="nonactiveTab" id="pieStatisticsDay"></pie-orders-general>
`,
        pieUpBalanceTemplate:
            `
        <style>
        .upBalanceBlock {
            display: flex;
            flex-direction: column;
            width: 550px;
            padding: 30px 80px;
            background-color: #f9f9f9;
            margin: 0px auto;
            border-radius: var(--border-radius-component);
            border: 1px solid #d9d9d9;
        }

        button:hover {
            background: #72bb53;
        }

        .upBalanceBlock > div {
            padding-bottom: 30px;
        }
        .info{
            transition: 0.5s;
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
                        <p id = "workerName"> </p>
                    </div>  
                </div>
                <div class="balance">
                    <div>
                        <p><b>Баланс:</b></p>
                    </div>
                    <div>
                        <p id = "balance"></p>
                    </div>
                </div>
            </div>
            <form id="upBalance">
                <label for="username">Сотрудник:
                    <input type="text" id="username" list="character">
                </label>
                <datalist id="character">
                   
                </datalist>
                <label for="balance" list="character"> Сумма:
                    <input id = "balanceInput" type="number" min = "0"> 
                </label>
                    <button type="submit" id = "btUpBalance">Пополнить</button>
            </form>
        </div>
    </div>`,
        pieUpBalanceGeneralComponentTemplate: `
    <style>
    html {
	height: 100%
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .tabContent {
        display: none;
    }
    
    .tabContent.active{
        display: block;
    }
    
    </style>
    
    <div id="menu" class="tabContent">
        <pie-up-balance></pie-up-balance>
    </div>
    `,

    pieWaitingTemplate : `
    <style>
            .loader,
        .loader:before,
        .loader:after {
        border-radius: 50%;
        }
        .loader {
        color: #ffffff;
        font-size: 11px;
        text-indent: -99999em;
        margin: 5px auto;
        position: relative;
        width: 10em;
        height: 10em;
        box-shadow: inset 0 0 0 1em;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        }
        .loader:before,
        .loader:after {
        position: absolute;
        content: '';
        }
        .loader:before {
        width: 5.2em;
        height: 10.2em;
        background: #3d8af7;
        border-radius: 10.2em 0 0 10.2em;
        top: -0.1em;
        left: -0.1em;
        -webkit-transform-origin: 5.2em 5.1em;
        transform-origin: 5.2em 5.1em;
        -webkit-animation: load2 2s infinite ease 1.5s;
        animation: load2 2s infinite ease 1.5s;
        }
        .loader:after {
        width: 5.2em;
        height: 10.2em;
        background: #3d8af7;
        border-radius: 0 10.2em 10.2em 0;
        top: -0.1em;
        left: 5.1em;
        -webkit-transform-origin: 0px 5.1em;
        transform-origin: 0px 5.1em;
        -webkit-animation: load2 2s infinite ease;
        animation: load2 2s infinite ease;
        }
        @-webkit-keyframes load2 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        }
        @keyframes load2 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        }
    </style>
    <div class="loader"></div>
    `
    }
})();