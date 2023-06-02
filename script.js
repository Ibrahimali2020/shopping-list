const ul = document.querySelector('ul');
const btnSubmit = document.querySelector('button[type="submit"]')
const btnClearAll = document.querySelector('.btn-clear');
const li = document.querySelector('li')
const filter = document.getElementById('filter');
let isEditMode = false;


// Dispaly Items from local storage
function onLoad() {
  let itemsFromStorage =getItemsFromStorage() 
  itemsFromStorage.forEach(item => {
    addItemsToDom(item)
  })
  hiddenClass()
}


// hiddenClass
function hiddenClass() {
  if (ul.children.length > 0) {
    document.getElementById('clear').classList.remove('hidden')
    document.getElementById('filter').classList.remove('hidden')
  } else {
    document.getElementById('clear').classList.add('hidden')
    document.getElementById('filter').classList.add('hidden')
  }
}


// Add items to the list
function onAddItemSubmit(e) {
  let input = document.getElementById('item-input').value;
  e.preventDefault();
  if (input === '' ) {
    alert('Please fill in all fields')
    return;
  } 
  // check for edit mode
  if (isEditMode) {
    const itemToEdit = document.querySelector('.edit-mode')

    removeItemsFromStorage(itemToEdit.textContent)
    removeItemFromDom(itemToEdit)
    itemToEdit.classList.remove('edit-mode')
    btnSubmit.style.backgroundColor = '#333';
    btnSubmit.innerHTML ='<i class="fa-solid fa-plus"></i> Add Item'
    isEditMode = false
  }

  // Add items to DOM
  addItemsToDom(input)
    // Add items to local storage
  addItemsToStorage(input)   
    // alert(`${input} is added successfully`)
    document.getElementById('item-input').value = '';
    hiddenClass()
}


// Remove items form the list
function onItemClick(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
    removeItemFromDom(e.target.parentElement.parentElement);  
    //  remove items from  Storage
    removeItemsFromStorage(e.target.parentElement.parentElement.textContent); 
    } 
  } else if (e.target.tagName === 'LI') {
    editMode(e.target)
  }
  hiddenClass()
}

 //  remove items from  Dom
function removeItemFromDom(item) {
  item.remove();
}

    //  remove items from  Storage
function removeItemsFromStorage(item) {
  let itemsFromStorage =getItemsFromStorage()
  let = itemTobeRemoved = item;
  const index = itemsFromStorage.indexOf(itemTobeRemoved);
  const newStorage = itemsFromStorage.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}



function editMode(item) {
  isEditMode = true;
  let input = document.getElementById('item-input');
  listItems = document.querySelectorAll('li')
  listItems.forEach(i => {
    i.classList.remove('edit-mode')
  })
  input.value = item.textContent;
  item.classList.add('edit-mode')
  btnSubmit.style.backgroundColor = 'green';
  btnSubmit.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'

}


// clear all items with clear button
function onClear() {
  const listItems = document.querySelectorAll('li')
  listItems.forEach(item => item.remove())
  localStorage.clear();
  hiddenClass();
}


// Add items to the DOM
function addItemsToDom(item) {
  const text = document.createTextNode(item)
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  const btnRemove = document.createElement('button');
  btnRemove.className = 'remove-item btn-link text-red';
  const i = document.createElement('i');
  i.className = 'fa-solid fa-xmark';
  li.appendChild(text)
  btnRemove.appendChild(i);
  li.appendChild(btnRemove);
  ul.appendChild(li);
}

// Add items to local storage
function addItemsToStorage(item) {
  let itemsFromStorage =getItemsFromStorage() 
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage) ); 
}

// Get items from Storage
function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

// filter items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll('li')
  listItems.forEach(item => {
    const itemName = item.textContent.toLowerCase()
    if (itemName.includes(text)) {
      // console.log(item.textContent);
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })  
}



btnSubmit.addEventListener('click', onAddItemSubmit);
btnClearAll.addEventListener('click', onClear)
ul.addEventListener('click', onItemClick)
filter.addEventListener('input', filterItems)
window.addEventListener('DOMContentLoaded', onLoad)

hiddenClass();
