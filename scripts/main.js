document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let editMode = false;
    let editedItem = null;

    // Функція для збереження списку завдань у localStorage
    function saveTodoList() {
        localStorage.setItem('todos', todoList.innerHTML);
    }

    // Функція для відновлення списку завдань з localStorage
    function loadTodoList() {
        const todos = localStorage.getItem('todos');
        if (todos) {
            todoList.innerHTML = todos;
        }
        // Відновлення стану прапорця
        const checkboxes = document.querySelectorAll('.todo-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.closest('.todo-item').querySelector('span').style.textDecoration = 'line-through';
            }
        });
    }

    // Відновлення списку при завантаженні сторінки
    loadTodoList();

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            if (editMode) {
                // Оновлення існуючого завдання
                editedItem.querySelector('span').textContent = todoText;
                editedItem = null;
                editMode = false;
            } else {
                // Додавання нового завдання
                const todoItem = document.createElement('li');
                todoItem.classList.add('todo-item', 'd-flex', 'justify-content-between', 'align-items-center');
                todoItem.innerHTML = `
          <input type="checkbox" class="form-check-input" id="completed">
          <span>${todoText}</span>
          <div class="button-container">
            <button class="btn btn-sm btn-primary ml-2">Редагувати</button>
            <button class="btn btn-sm btn-danger ml-2">Видалити</button>
          </div>
        `;
                todoList.appendChild(todoItem);
            }
            todoInput.value = '';
            // Збереження списку після додавання або оновлення завдання
            saveTodoList();
        }
    });

    todoList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const todoItem = target.closest('li');
            if (target.textContent === 'Видалити') {
                todoItem.remove();
            } else if (target.textContent === 'Редагувати') {
                todoInput.value = todoItem.querySelector('span').textContent;
                editedItem = todoItem;
                editMode = true;
            }
            // Збереження списку після видалення або редагування завдання
            saveTodoList();
        } else if (target.tagName === 'INPUT') {
            const todoItem = target.closest('li');
            const todoText = todoItem.querySelector('span');
            if (target.checked) {
                todoText.style.textDecoration = 'line-through';
            } else {
                todoText.style.textDecoration = 'none';
            }
            // Збереження списку після позначення завдання як виконане або не виконане
            saveTodoList();
        }
    });
});
