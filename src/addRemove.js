/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import {
  myList, toggleTask, taskDesc, list, navList,
} from './index.js';

const addTask = () => {
  const { value } = taskDesc;
  if (value !== '') {
    const taskObject = {
      description: value,
      completed: false,
      index: myList.length + 1,
    };
    myList.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(myList));
    taskDesc.value = '';
    navList.innerHTML = '';
    list();
  }
};

const removeTask = (event) => {
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

const updateDesc = (event) => {
  if (event.key === 'Enter') {
    const input = event.target;
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
};

export { addTask, removeTask, updateDesc };
