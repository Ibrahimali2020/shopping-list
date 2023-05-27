const ul = document.querySelector('ul');
const btnSubmit = document.querySelector('button[type="submit"]')
const btnClearAll = document.querySelector('.btn-clear');
const li = document.querySelector('li')

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
function addItems(e) {
  let input = document.getElementById('item-input').value;
  e.preventDefault();
  if (input === '' ) {
    alert('Please fill in all fields')
    return;
  } else {
    const text = document.createTextNode(input)
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
    // alert(`${input} is added successfully`)
    document.getElementById('item-input').value = '';
    hiddenClass()
  }
}
btnSubmit.addEventListener('click', addItems);


// Remove items form the list
ul.addEventListener('click', e => {
  if (e.target.tagName === 'I') {
    e.target.parentElement.parentElement.remove();   
    hiddenClass()
  }
})

// clear all items with clear button
function onClear() {
  const listItems = document.querySelectorAll('li')
  listItems.forEach(item => item.remove())
  hiddenClass();
}
btnClearAll.addEventListener('click', onClear)




const filter = document.getElementById('filter');
filter.addEventListener('input', (e) => {
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
)

// filter.addEventListener('blur', () => {
//   document.getElementById('filter').value = '';
// })

