URL = 'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7'

const grid = document.querySelector('.grid');
const input = document.querySelector('.input');
const numders = document.querySelector('.numbers');
const button = document.querySelector('.button');

const getData = async () => {
    const resp = await (fetch(URL))
    const data = await(resp.json());
    return data;
};

const data = await getData();

let newData = [...data];
for (let el of newData) {
    el.checkbox = '';
}
console.log('новая', newData);


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
    console.log(card)
    return card
}


const renderGrid = () => {
    grid.innerHTML='';
    for (let el of newData) {
        grid.append(createCard(el));
    }
}
// renderGrid(newData);

const countEl = () => {
    let counter = newData.filter(el=>el.checkbox == "checked").length
    numders.innerText = `numbs = ${counter}`
    return counter;
}

const save = () => {
    localStorage.clear();
    localStorage.setItem('key', JSON.stringify(newData));
}

const load = () => {
    if(localStorage.length != 0) {
    newData = JSON.parse(localStorage.getItem('key'));
    renderGrid(newData);
    countEl(newData);
    }
    renderGrid(newData);
}
console.log('local', localStorage);
load()

save();


grid.addEventListener('click', (e)=> {
    let elem = e.target;

    newData.forEach((el)=> {
        if (el.id == elem.parentElement.id && el.checkbox == '') {
            el.checkbox = 'checked';
            renderGrid(newData);
        } else if (el.id == elem.parentElement.id && el.checkbox == 'checked') {
            el.checkbox = '';
            renderGrid(newData);
        };
    });

    countEl(newData)
    save()
});

button.addEventListener('click', (e)=> {
    grid.innerHTML = '';
    console.log(newData[0].title);
    console.log(input.value)
    newData.filter((el)=>el.title.includes(input.value.toLowerCase().trim())).forEach((el)=>grid.append(createCard(el)))
    countEl(newData)
    save()
    console.log(history)
    console.log(history.location)
    console.log(window.location)
});

input.addEventListener('input',()=> {
    console.log(input.value)
    if (input.value == ''){
        load();
    }
    
} )

console.log('end')

