const form = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const modal = document.querySelector('.modal');
const clearBtn = document.querySelector('#clear-list');
const addButton = document.querySelector('#addButton');


let listItems = [];
let id = 0;

addButton.addEventListener('click', addNewItem);
clearBtn.addEventListener('click', removeAll);

function renderNewLayout() {
    itemList.innerHTML = '';

    if (listItems.length !== 0) {
        for (let i = 0; i < listItems.length; i++) {
            createLayout(listItems[i])
        }
    } else {
        const emptyList = `<p class="bg-warning">Não há itens na sua lista</p>`;

        itemList.innerHTML = emptyList
    }
}
renderNewLayout()

function createLayout(listItems) {
    
    const mainDiv = document.createElement('div');
    const h5 = document.createElement('h5');
    const div = document.createElement('div');
    const checkA = document.createElement('a');
    const delA = document.createElement('a');

    mainDiv.className = "item my-3";
    h5.className = "item-name";
    div.className = "item-icons";
    checkA.className = "complete-item mx-2 item-icon"
    delA.className = "delete-item mx-2 item-icon"

    checkA.addEventListener('click', () => console.log('botao check ta funcionando'));
    delA.addEventListener('click', removeItem);
    checkA.id = "checkItem";
    delA.id = 'deleteItem';
    
    mainDiv.dataset.id = listItems.id;
    h5.innerHTML = listItems.nome;
    checkA.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    delA.innerHTML = '<i class="far fa-times-circle"></i>'

    mainDiv.appendChild(h5);
    mainDiv.appendChild(div);
    div.appendChild(checkA);
    div.appendChild(delA);

    itemList.appendChild(mainDiv);
}

function removeItem(evento) {
    const clickedButton = evento.target;
    const transition = clickedButton.parentElement;
    const firstDiv = transition.parentElement;
    const clickedItem = firstDiv.parentElement;
    const idClickedItem = clickedItem.dataset.id;
    console.log(idClickedItem)

    const removedItem = listItems.find((item) => item.id == idClickedItem);

    const positionRemoved = listItems.indexOf(removedItem);

    listItems.splice(positionRemoved, 1);

    renderNewLayout();
}



function removeAll() {
    listItems = [];
    renderNewLayout();
    console.log(listItems)
}

function addNewItem() {
    const newItem = itemInput.value;
    if (newItem == '') {
        alert('insira alguma coisa')
        // i want to show a modal here
    } else {
        const newItemList = {
            id: id,
            nome: newItem
        }
        id++;
        listItems.push(newItemList)
        console.log(listItems)

        itemInput.value = '';
        renderNewLayout();
    }
}
