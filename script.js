const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const progressBar = document.getElementById('progress-bar');
const darkMode = document.querySelector('.dark-mode');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    darkMode.textContent = body.classList.contains('dark-mode')? '☀️' : '🌙';
    localStorage.setItem('darkMode',  body.classList.contains('dark-mode') )
}
darkMode.addEventListener('click', toggleDarkMode);
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkMode.textContent = '☀️'
}

function addTask() {
    if (inputBox.value === '') {
        alert('You must add some task');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = 'x';
        li.appendChild(span)
    }
     inputBox.value = "";
    saveData()
    updateProgress()
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagNames === 'LI') {
        e.target.classList.toggle('checked');
        saveData()
        updateProgress()
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData()
        updateProgress()
    }
 },false )


function updateProgress() {
    let tasks = document.querySelectorAll('ul li');
    let completed = document.querySelectorAll('ul li.checked');
    let progress = (completed.length / tasks.length) * 100;
    progressBar.value = tasks.length > 0 ? progress : 0;
}

 function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

 function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
    updateProgress()
}


showTask()