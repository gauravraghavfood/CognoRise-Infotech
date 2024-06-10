document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = { id: Date.now(), text: taskText };
            tasks.push(task);
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskId = e.target.parentElement.dataset.id;
            tasks = tasks.filter(task => task.id != taskId);
            saveTasks();
            e.target.parentElement.remove();
        } else if (e.target.classList.contains('edit-btn')) {
            const taskElement = e.target.parentElement;
            const taskId = taskElement.dataset.id;
            const taskTextElement = taskElement.querySelector('.task-text');
            const newTaskText = prompt('Edit task', taskTextElement.textContent);
            if (newTaskText) {
                taskTextElement.textContent = newTaskText;
                tasks = tasks.map(task => task.id == taskId ? { ...task, text: newTaskText } : task);
                saveTasks();
            }
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
