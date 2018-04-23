(Tabs = () => {
    
    const bindAll = () => {
        let menuElements = document.querySelectorAll('[data-tab]');
        for (let i = 0; i < menuElements.length; i++) {
            menuElements[i].addEventListener('click', change, false);  
        }
    }

    const clear = () => {
        let menuElements = document.querySelectorAll('[data-tab]');
        for (let i = 0; i < menuElements.length; i++) {
            menuElements[i].classList.remove('active');
            let id = menuElements[i].getAttribute('data-tab');
            document.getElementById(id).classList.remove('active');
        }
    }

    const change = (e) => {
        clear();
        e.target.classList.add('active');
        let id = e.currentTarget.getAttribute('data-tab');
        document.getElementById(id).classList.add('active');
    }

    bindAll();
})();