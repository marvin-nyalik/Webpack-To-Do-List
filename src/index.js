import './style.css';

const list = () => {
  const navList = document.getElementById('list');
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

  myList.forEach((item) => {
    const listItem = `
             <li>
                <div class="to-do-item">
                    <input type="checkbox" id="demoCheckbox" name="checkbox" value="1">
                    <p>${item.description}</p>
                </div>
                <i class='bx bx-dots-vertical-rounded to-do-more'> </i>
            </li>
    `;

    navList.innerHTML += listItem;
  });
};

(list());

export default list;
