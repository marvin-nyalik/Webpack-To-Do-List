const myList = JSON.parse(localStorage.getItem('tasks'));

export const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const listItem = checkbox.closest('li');
    const key = listItem.querySelector('p').innerHTML;
    
    for(let i = 0; i < myList.length; i += 1){
      if (myList[i].description === key){
        myList[i].completed = true;
      }
    }
};
  
export const clearCompleted = () => {
    myList = JSON.parse(localStorage.getItem('tasks'));
    const completed = myList.filter((task) => task.completed !== true);
    for(let j = 0; j < completed.length; j += 1){
      completed[j].index = j + 1;
    }
    localStorage.setItem('tasks', JSON.stringify(completed));
  };
