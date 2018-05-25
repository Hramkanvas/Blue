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
        }

        clickUpload(e) {
            queries.uploadMenu(this.currentFile).then(res => {
                this.dragNDropeZone.textContent = 'Для загрузки меню, перетащите сюда файл.';
                this.btUpload.style.visibility = 'hidden';
                pieError.showError(res.message);
            });
        }

        dragOverEvent(e) {
            e.preventDefault();
        }

        dragEnterEvent(e) {
            this.dragNDropeZone.textContent = 'Отпустите мышку.';
        }

        dragLeaveEvent(e) {
            if (this.currentFileName !== undefined) {
                this.dragNDropeZone.textContent = `Вы загрузили файл ${this.currentFileName} Для загрузки другого меню, перетащите файл сюда.`;
            }
            else {
                this.dragNDropeZone.textContent = 'Для загрузки меню, перетащите файл сюда.';
            }

        }

        saveFile() {
            this.currentFile = this.fileReader.result;
            if (this.btUpload.style.visibility === 'hidden') {
                this.btUpload.style.visibility = 'visible';
            }
        }

        dropEvent(e) {
            e.preventDefault();
            this.currentFileName = e.dataTransfer.files[0].name;
            this.dragNDropeZone.textContent = `Вы загрузили файл ${this.currentFileName} Для загрузки другого меню, перетащите файл сюда.`;
            this.currentFile = e.dataTransfer.files[0];
            if (this.btUpload.style.visibility === 'hidden') {
                this.btUpload.style.visibility = 'visible';
            }
        }

        connectedCallback() {
            this.btUpload.addEventListener('click', (e) => { this.clickUpload(e) });
            this.dragNDropeZone.addEventListener('dragenter', (e) => { this.dragEnterEvent(e) });
            this.dragNDropeZone.addEventListener('dragleave', (e) => { this.dragLeaveEvent(e) });
            this.dragNDropeZone.addEventListener('drop', (e) => { this.dropEvent(e) });
            this.dragNDropeZone.addEventListener('dragover', (e) => { this.dragOverEvent(e) });
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