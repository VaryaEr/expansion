chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){     
        if(window.location.href.indexOf('https://www.biozol.de') != -1){
            keys = keys = ['Biozol Catalog Number:', 'Article Name:', 'Manufacturer:'];
    result = [];
    str = '';
    formatConvert = function (items) {
        array = typeof items != 'object' ? JSON.parse(items) : items;
        str = '';
        for (let i = 0; i < array.length; i++) {
            line = '';
            for (let index in array[i]) {
                line += array[i][index];
            }
            if((i + 1) % 4 != 0 ){
                str += line + ';';
            } else if((i + 1) % 4 == 0 ){
                str += line + '\r\n';
            }
        }

        return str;
    };
    elements = document.querySelectorAll('td');
    myStorage = window.localStorage;
    data = myStorage.getItem('data');
    if (data === null) {
        localStorage.setItem('data', JSON.stringify([]));
    }
    data = JSON.parse(myStorage.getItem('data'));
    keys.forEach(function (key) {
        let insertKey = key;
        let val = Array.from(elements).filter(e => (key === e.textContent))[0].nextElementSibling.textContent;
        if (typeof data === '') {
            data = [];
        }
        data.push({ [insertKey]: val });
    });
    Array.prototype.insert = function ( index, item ) {
        this.splice( index, 0, item );
    };
            data.insert(data.length - 1,{ 'url': window.location.href });

    
    
    localStorage.setItem('data', JSON.stringify(data));

    a = document.createElement('a');
    a.textContent = 'Скачать';
    divEl = document.getElementsByClassName("product-description")[0];
    parent = divEl.parentNode;
    parent.insertBefore(a, divEl);
    str = formatConvert(myStorage.getItem('data'));
    file = new Blob([str], {
        type: 'text/plain'
    });
    a.href = URL.createObjectURL(file);
    a.download = 'Данные';
    a.addEventListener("click", () => { localStorage.removeItem('data'); });
        }


    return true
});