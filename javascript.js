function NewTaskButton() {
    const taskList = document.getElementById('TaskList');
    const pressableButton = document.getElementById('exampleTask');
    const exampleHTML = document.getElementById('exampleTask').innerHTML
    const newTaskDiv = document.createElement('div');
    newTaskDiv.innerHTML = exampleHTML
    newTaskDiv.classList.add('task')
    let taskCount = "task_" + String(taskList.childElementCount - 2);
    newTaskDiv.setAttribute('ID',taskCount);
    newTaskDiv.children

    taskList.insertBefore(newTaskDiv,pressableButton);
}