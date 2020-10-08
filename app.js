
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInp = document.querySelector('#task');


loadEventListeners();


function loadEventListeners(){
  document.addEventListener('DOMContentLoaded', loadTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
}

//load from local storage 
function loadTasks()  {
  let tasks;
  if (!localStorage.getItem('tasks')){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.forEach(function(task) {
  
    const li = document.createElement('li');
 
    li.className = 'collection-item';
    
    li.appendChild(document.createTextNode(task));
    
    const link = document.createElement('a');
    
    link.className = 'delete-item secondary-content';
   
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    
    li.appendChild(link);
    
    taskList.appendChild(li);
      });
}

function addTask(e){
  if(!taskInp.value){
   alert("Add your task"); 
  } else{

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInp.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  
  storeTaskInLocalStorage(taskInp.value);
  
  taskInp.value = '';

  e.preventDefault();
  }
  }
//save in local storage
  function storeTaskInLocalStorage(task){
    let tasks;
    if (!localStorage.getItem('tasks')){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

      tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(tasks));
  }



function removeTask(e) { 
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
//remove from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (!localStorage.getItem('tasks')){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  if(confirm('Are you sure?')){
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
    clearTasksFromLocalStorage();
  }

  function clearTasksFromLocalStorage(){
    localStorage.clear();
  }
}