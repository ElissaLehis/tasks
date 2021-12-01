// user input form
const form = document.querySelector('form')
form.addEventListener('submit', addTask)

//task list
const taskList = document.querySelector('ul')
taskList.addEventListener('click', delTask)

//delete button-link
const deleteBtn = document.querySelector('#delete-tasks')
deleteBtn.addEventListener('click', delTasks)

function delTasks() {
    //taskList.innerHTML = ''
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    removeAllStorage()
}
// removeAllStorage
function removeAllStorage(){
    localStorage.removeItem('tasks')
}

//delTask
function delTask(event){
    if (event.target.textContent === 'X'){
        if(confirm('Do you really want to delete this task? ')){
            event.target.parentElement.remove()
            let task = event.target.parentElement.textContent.slice(0, -1)
            removeStorage(task)
        }
    }
}

//removeStorage
function removeStorage(task){
    let tasks
    if (localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (taskFromLS, taskIndex){
        if (taskFromLS === task){
            tasks.splice(taskIndex, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// addTask function
function addTask(event){
    // get task value from input
    const task = document.querySelector('#task').value
    // get element from DOM
    const taskList = document.querySelector('ul')
    // create element to DOM
    const li = document.createElement('li')
    // add CSS class
    li.className = 'collection-item'
    // add text to element
    const text = document.createTextNode(task)
    li.appendChild(text)
    // add li to task
    taskList.appendChild(li)
    // clear form input value
    document.querySelector('#task').value = ''
    event.preventDefault()

    const link = document.createElement('a')
    link.className =' secondary-content'
    link.appendChild(document.createTextNode('X'))
    link.setAttribute('href', 'a')
    li.appendChild(link)

    //get element from DO
    taskList.appendChild(li)
    //save task to localstorage
    taskStorage(task)
    //clear from input value
    document.querySelector('#task').value = ''
    event.preventDefault()
}

function taskStorage(task){
    let tasks
    if (localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
