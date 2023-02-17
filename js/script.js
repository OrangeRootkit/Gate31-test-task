const URL_API = 'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7'
const grid = document.querySelector('.grid');
const input = document.querySelector('.input');
const numders = document.querySelector('.numbers');
const button = document.querySelector('.button');
const storageKey = ',.?qh7fAi6!GHdYn';
const storageKeyforBar = 'ZJy0ZRJ7';
const adress = new URL(window.location.href);
let newData = [];

const getData = async () => {
    const resp = await (fetch(URL_API))
    const data = await(resp.json());
    return data;
};

const data = await getData();

console.log(localStorage[storageKey] == undefined)

if (localStorage[storageKey] == undefined) {
    newData = [...data]
    newData.forEach((el)=>el.checkbox='');
} else {
    newData = JSON.parse(localStorage.getItem(storageKey));
};

console.log(newData)

const save = () => localStorage.setItem(storageKey, JSON.stringify(newData));

const createCard = (obj) => {
    const card = document.createElement('div');
    card.className = "card";
    card.id = obj.id;
    card.innerHTML = 
    `<h3 id=${obj.id} class="card__header">${obj.title}</h3>
    <p class="card__text">${obj.body}</p>`
    const checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    card.appendChild(checkbox);
    obj.checkbox == ''? checkbox.checked = false : (checkbox.checked = true, checkbox.parentElement.style.backgroundColor = '#719450', checkbox.parentElement.style.color = '#FFFFFF');
    return card
}

const renderGrid = () => {
    grid.innerHTML='';
    for (let el of newData) {
        grid.append(createCard(el));
    }
    
}

const countEl = () => {
    let counter = newData.filter(el=>el.checkbox == "checked").length
    numders.innerText = `numbs = ${counter}`
}

const filterByInput = () => {
    console.log('load from api')
    if (localStorage[storageKeyforBar] == undefined) {
        input.value == '';
    } else {
        console.log('load from storage')
        let str = JSON.parse(localStorage.getItem(storageKeyforBar));
        input.value  = str.substr(str.lastIndexOf('=')+1, str.length);
    };

    grid.innerHTML = '';
    console.log(newData)
    newData.filter((el)=>el.title.includes(input.value.toLowerCase().trim())).forEach((el)=>grid.append(createCard(el)));
    console.log('done')
    countEl()
    // save()
}
filterByInput()


const urlState = () => {
    if (input.value !='') {
        adress.searchParams.set('filter', input.value);
        history.replaceState('', '', adress);
        localStorage.removeItem(storageKeyforBar);
        localStorage.setItem(storageKeyforBar, JSON.stringify(adress));
    } else {
        adress.searchParams.delete('filter');
        history.pushState('', '', adress);
        localStorage.removeItem(storageKeyforBar);
    }
}

button.addEventListener('click', filterByInput);

input.addEventListener('input',()=> {
    urlState()
    console.log(input.value)
    if (input.value == ''){
        renderGrid();
    } 
});


grid.addEventListener('click', (e)=> {
    let elem = e.target;
    newData.forEach((el)=> {
        if (el.id == elem.parentElement.id && el.checkbox == '') {
            el.checkbox = 'checked';
            renderGrid();
        } else if (el.id == elem.parentElement.id && el.checkbox == 'checked') {
            el.checkbox = '';
            renderGrid();
        };
    });
    save()
    countEl()
});