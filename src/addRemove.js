import {
  myList,
  taskDesc,
  list,
  navList,
} from './listUtils.js';

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

export default addTask;
