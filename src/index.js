import './style.css';

const myList = [
  {
    description: 'Take out trash',
    completed: false,
    index: 1,
  },
  {
    description: 'Make breakfast',
    completed: true,
    index: 2,
  },
  {
    description: 'Code CSS',
    completed: false,
    index: 3,
  },
  {
    description: 'Learn React',
    completed: true,
    index: 4,
  },
];

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

const list = () => {
  const navList = document.getElementById('list');

  myList.forEach((item) => {
    const listItem = `
      <li>
        <div class="to-do-item">
          <input class="check" id="check${item.index}" type="checkbox" name="checkbox${item.index}" value="1">
          <p>${item.description}</p>
        </div>
        <i class='bx bx-dots-vertical-rounded to-do-more'> </i>
      </li>
    `;

    navList.innerHTML += listItem;
  });

  const checkboxes = document.getElementsByClassName('check');
  for (let i = 0; i < checkboxes.length; i += 1) {
    checkboxes[i].addEventListener('change', handleCheckboxChange);
  }
};

list();

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
