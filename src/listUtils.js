export const navList = document.getElementById('list');

export const toggleTask = (index) => {
  const taskItem = document.getElementById(`listItem${index}`);
  if (taskItem) {
    const trash = taskItem.querySelector('.bx-trash');
    const more = taskItem.querySelector('.bx-dots-vertical-rounded');

    // Toggle the visibility of 'more' and 'trash' icons
    more.classList.toggle('show');
    more.classList.toggle('none');
    trash.classList.toggle('none');
  }
};

// eslint-disable-next-line import/no-mutable-exports
export let myList = [];

export const removeTask = (event) => {
  const target = event.target.closest('li');
  const value = target.querySelector('p').innerHTML;

  for (let i = 0; i < myList.length; i += 1) {
    if (myList[i].description === value) {
      myList.splice(i, 1);
      for (let j = 0; j < myList.length; j += 1) {
        myList[j].index = j + 1;
      }
      localStorage.setItem('tasks', JSON.stringify(myList));
    }
  }

  // Remove event listeners from the target item
  target.removeEventListener('mouseover', () => toggleTask(target.index));
  target.removeEventListener('mouseout', () => toggleTask(target.index));

  // Remove the item from the DOM
  target.remove();

  // Reindex the list items
  const listItems = navList.querySelectorAll('li');
  listItems.forEach((item, i) => {
    const itemIndex = i + 1;
    item.setAttribute('id', `listItem${itemIndex}`);
    item.querySelector('.check').setAttribute('id', `check${itemIndex}`);
    item.querySelector('p').setAttribute('data-index', itemIndex);
  });
};

const updateListItemDescription = (index, description) => {
  const item = myList.find((task) => task.index === index);
  if (item) {
    item.description = description;
    toggleTask(index); // Hide the to-do-more icon and show the bx-trash icon
    toggleTask(index);
  }
  localStorage.setItem('tasks', JSON.stringify(myList));
};

export const handleCheckboxChange = (event) => {
  const checkbox = event.target;
  const listItem = checkbox.closest('li');
  const key = listItem.querySelector('p').innerHTML;

  for (let i = 0; i < myList.length; i += 1) {
    if (myList[i].description === key) {
      myList[i].completed = true;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(myList));
};

export const taskDesc = document.getElementById('desc');

export const list = () => {
  if (localStorage.getItem('tasks')) {
    myList = JSON.parse(localStorage.getItem('tasks'));
  }
  myList.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('nav-item');
    listItem.setAttribute('id', `listItem${item.index}`);
    listItem.addEventListener('mouseover', () => toggleTask(item.index));
    listItem.addEventListener('mouseout', () => toggleTask(item.index));

    const taskItem = document.createElement('div');
    taskItem.classList.add('to-do-item');

    const checkbox = document.createElement('input');
    checkbox.classList.add('check');
    checkbox.setAttribute('id', `check${item.index}`);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', `checkbox${item.index}`);
    checkbox.setAttribute('value', '1');
    checkbox.addEventListener('change', handleCheckboxChange);

    const description = document.createElement('p');
    description.textContent = item.description;

    // edit item description
    description.addEventListener('click', () => {
      const input = document.createElement('input');
      input.classList.add('edit-description');
      input.value = description.textContent;

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const updatedDescription = input.value.trim();
          if (updatedDescription !== '') {
            description.textContent = updatedDescription;
            updateListItemDescription(item.index, updatedDescription);
            toggleTask(item.index); // Hide bx-trash icon and show to-do-more icon
          }
          taskItem.removeChild(input);
          description.style.display = 'block';
        }
      });

      description.style.display = 'none';
      taskItem.appendChild(input);
      input.focus();
    });

    const moreIcon = document.createElement('i');
    moreIcon.classList.add('bx', 'bx-dots-vertical-rounded', 'to-do-more');

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('bx', 'bx-trash', 'none');
    trashIcon.addEventListener('click', removeTask);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(description);
    listItem.appendChild(taskItem);
    listItem.appendChild(moreIcon);
    listItem.appendChild(trashIcon);
    navList.appendChild(listItem);
  });
};

export const clearCompleted = () => {
  myList = JSON.parse(localStorage.getItem('tasks'));
  const completed = myList.filter((task) => task.completed !== true);
  for (let j = 0; j < completed.length; j += 1) {
    completed[j].index = j + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(completed));
};
