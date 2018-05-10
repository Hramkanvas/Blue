import { queries } from "../../queries.js";

export let pieDragAndDrop = (function () {
    let templateT = `
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
            background: #eee;
            border: 2px dashed #ccc;
            border-radius: 5px;
        }

        #drag {
            margin-top: 60px;
        }
        
        #dropZone:hover {
            background: #ddd;
            border-color: #aaa;
        }
        </style>
        <div id = "drag">
            <div id="dropZone">
                Для загрузки меню, перетащите файл сюда.
            </div>
        </div>
        <button id = "btUpload"> Загрузить файл </button>
        `;

    class DragAndDropClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = templateT;
            this.dragNDropeZone = this.shadowRoot.getElementById('dropZone');
            this.btUpload = this.shadowRoot.getElementById('btUpload');
            this.btUpload.style.visibility = 'hidden';
            this.photoLoaded = undefined;
            this.currentFileName = undefined;
            this.currentFile = undefined;
            this.fileReader =  new FileReader();

            this.saveFile = this.saveFile.bind(this);
            this.clickUpload = this.clickUpload.bind(this);
            this.dragEnterEvent = this.dragEnterEvent.bind(this);
            this.dragLeaveEvent = this.dragLeaveEvent.bind(this);    
            this.dragOverEvent = this.dragOverEvent.bind(this);
            this.dropEvent = this.dropEvent.bind(this);  
        }

        clickUpload(event){
            //queries.uploadMenu(this.currentFile);
        }

        dragOverEvent(event){
            event.preventDefault();
        }

        dragEnterEvent(event) {
            this.dragNDropeZone.textContent = 'Для загрузки меню, отпустите мышку.'; 
        }

        dragLeaveEvent(event) {
            if(this.currentFileName !== undefined){
                this.dragNDropeZone.textContent = 'Вы загрузили файл "' + this.currentFileName + '". Для загрузки другого меню, перетащите файл сюда.';
            }
            else {
                this.dragNDropeZone.textContent = 'Для загрузки меню, перетащите файл сюда.'; 
            }
                                   
        }

        saveFile(){
            this.currentFile = this.fileReader.result;
            if (this.btUpload.style.visibility === 'hidden'){
                this.btUpload.style.visibility = 'visible';
            }
        }

        dropEvent(event) {
            this.currentFileName = event.dataTransfer.files[0].name;
            this.dragNDropeZone.textContent = 'Вы загрузили файл "' + this.currentFileName + '". Для загрузки другого меню, перетащите файл сюда.';
            this.fileReader.onload = this.saveFile;
            this.fileReader.readAsBinaryString(event.dataTransfer.files[0]);
        }

        connectedCallback() {
            this.btUpload.addEventListener('click', this.clickUpload);
            this.dragNDropeZone.addEventListener('dragenter', this.dragEnterEvent);
            this.dragNDropeZone.addEventListener('dragleave', this.dragLeaveEvent);
            this.dragNDropeZone.addEventListener('drop', this.dropEvent);
            this.dragNDropeZone.addEventListener('dragover', this.dragOverEvent);
        }

        disconnectedCallback() {
            this.btUpload.removeEventListener('click');
            this.dragNDropeZone.removeEventListener('dragenter');
            this.dragNDropeZone.removeEventListener('dragleave');
            this.dragNDropeZone.removeEventListener('drop');
            this.dragNDropeZone.removeEventListener('dragover');
        }
    }
    customElements.define('pie-drag-and-drop', DragAndDropClass);
}());