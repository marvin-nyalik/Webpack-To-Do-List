/* eslint-disable import/no-cycle */

import './style.css';
import { addTask, removeTask } from './addRemove.js';
// eslint-disable-next-line import/no-mutable-exports
export let myList = [];
if (localStorage.getItem('tasks')) {
  myList = JSON.parse(localStorage.getItem('tasks'));
}
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

// Add to the task list
export const taskDesc = document.getElementById('desc');
taskDesc.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

const publish = document.getElementById('publish');
publish.addEventListener('click', addTask);

const handleCheckboxChange = (event) => {
  const checkbox = event.target;
  const listItem = checkbox.closest('li');

  if (checkbox.checked) {
    listItem.style.textDecoration = 'line-through';
    listItem.style.color = 'lightgray';
  } else {
    listItem.style.textDecoration = 'none';
  }
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

export const navList = document.getElementById('list');

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
            // toggleTask(item.index); // Show only the to-do-more icon
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

(list());

const clearChecked = document.getElementById('footer');

const clearCompleted = () => {
  const completed = document.getElementsByClassName('check');
  const completedItems = [];
  const completedItemsIds = [];

  // Collect the completed list items
  for (let i = 0; i < completed.length; i += 1) {
    const checkbox = completed[i];
    if (checkbox.checked) {
      const listItem = checkbox.closest('li');
      completedItems.push(listItem);
      completedItemsIds.push(i + 1);
    }
  }
  // Remove the completed list items from the DOM
  completedItems.forEach((item) => {
    item.remove();
  });

  completedItemsIds.forEach((item) => {
    myList.splice(item - 1, 1);
  });
};

clearChecked.addEventListener('click', clearCompleted);
