import { queries } from "../../queries.js";
import {pieError} from "../pie_error/pie-error.js";
import {templates} from "../templates/templates.js";

export let pieDragAndDrop = (function () {
    let templateT = templates.pieDragNDropTemplate;
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
            this.clickUpload = this.clickUpload.bind(this);
            this.dragEnterEvent = this.dragEnterEvent.bind(this);
            this.dragLeaveEvent = this.dragLeaveEvent.bind(this);    
            this.dragOverEvent = this.dragOverEvent.bind(this);
            this.dropEvent = this.dropEvent.bind(this);  
        }

        clickUpload(event){
            queries.uploadMenu(this.currentFile).then(res =>{
                this.dragNDropeZone.textContent = 'Для загрузки меню, перетащите файл сюда.'; 
                this.btUpload.style.visibility = 'hidden';
                pieError.showError(res.message);
            });
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
            event.preventDefault();
            this.currentFileName = event.dataTransfer.files[0].name;
            this.dragNDropeZone.textContent = 'Вы загрузили файл "' + this.currentFileName + '". Для загрузки другого меню, перетащите файл сюда.';
            this.currentFile =  event.dataTransfer.files[0];
            if (this.btUpload.style.visibility === 'hidden'){
                this.btUpload.style.visibility = 'visible';
            }
        }

        connectedCallback() {
            this.btUpload.addEventListener('click', this.clickUpload);
            this.dragNDropeZone.addEventListener('dragenter', this.dragEnterEvent);
            this.dragNDropeZone.addEventListener('dragleave', this.dragLeaveEvent);
            this.dragNDropeZone.addEventListener('drop', this.dropEvent);
            this.dragNDropeZone.addEventListener('dragover', this.dragOverEvent);
        }

        disconnectedCallback() {
            this.btUpload.removeEventListener('click', this.clickUpload);
            this.dragNDropeZone.removeEventListener('dragenter', this.dragEnterEvent);
            this.dragNDropeZone.removeEventListener('dragleave', this.dragLeaveEvent);
            this.dragNDropeZone.removeEventListener('drop', this.dropEvent);
            this.dragNDropeZone.removeEventListener('dragover', this.dragOverEvent);
        }
    }
    customElements.define('pie-drag-and-drop', DragAndDropClass);
}());