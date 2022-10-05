let play = document.querySelector('#play'),
    wrapper = document.querySelector('.wrapper'),
    overlay = document.querySelector('.overlay'),
    next = document.querySelector('.finish__btn'),
    finishTitle = document.querySelector('.finish__title'),
    table = document.createElement('table');

table.classList.add('table');
let columns = 3;

play.addEventListener('click', function() {
    startGame(columns);
});

next.addEventListener('click', function() {
    overlay.style.display = 'none';
    startGame(++columns);
});


function startGame(n) {
    wrapper.innerHTML = '';
    checkCells(createTable(table, makeArray(n, arrRU)));
    wrapper.appendChild(table);
    addTimer();
}

function createTable(table, arr) {
    table.textContent = '';
	let cells = [];
    for (let subArr of arr) {
        let tr = document.createElement('tr');
        for (let elem of subArr) {
            let td = document.createElement('td');
            td.innerHTML = elem;
            tr.appendChild(td);
            cells.push(td);
        }
        table.appendChild(tr);
    }
    return cells;
}

function checkCells(cells) {
	for (let cell of cells) {
        cell.addEventListener('click', openCell);
	}
}

let k = 1;
function openCell() {
    this.classList.add('active');
    this.dataset.test = k;
    this.removeEventListener('click', openCell);
    k++;
    if (this.dataset.test == 2) {
        compareCells();
        k = 1;
    }
}

function compareCells() { 
    let cell1 = document.querySelector('[data-test="1"]');
    let cell2 = document.querySelector('[data-test="2"]');

    if (cell1.textContent != cell2.textContent) {
        setTimeout(closeCells, 500, cell1,cell2);
        cell1.addEventListener('click', openCell);
        cell2.addEventListener('click', openCell);
    } else {
        setTimeout(completeLevel, 500);
    }
    cell1.removeAttribute("data-test");
    cell2.removeAttribute("data-test");
}

function closeCells(elem1, elem2) {
    elem1.classList.remove('active');
    elem2.classList.remove('active');
}

function completeLevel() {
    let openCells = document.querySelectorAll('.active');
    let cells = document.querySelectorAll('td');
    if (openCells.length == cells.length) {
        finishTitle.textContent = 'Well done!';
        next.textContent = 'Next level';
        stopTimer();
        showResults();
    }
}

function showResults() {
    wrapper.innerHTML = '';
    overlay.style.display = 'block';
    addResult();
    if (columns == 5) {
        stopGame ();
    }
}

function stopGame () {
    next.textContent = 'Play again';
    finishTitle.textContent = 'The game is over';
    columns = 2;
}



//To populate an array

let arrRU = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];

function makeArray(n, arr) {
    let length = (n * (n+1))/2;
    let gameArr = shuffle(doubleArr(length, pickElems(length, arr)));
    gameArr = splitArray(gameArr, n);
    return gameArr;
}

function splitArray(arr, n) {
    let result = [];
    while (arr.length > 0) {
        result.push(arr.splice(0, n));
    }
    return result;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickIndx(length, arr) {
let indexes = [];
while(indexes.length < length) { 
    let random = getRandomInt(0, arr.length-1);
    if (!indexes.includes(random)) {
        indexes.push(random);
    }  
}
return indexes;
}

function pickElems(length, arr) {
    let elems = [];
    let nums = pickIndx(length, arr);
    for (let elem of nums) {
        elems.push(arr[elem]);
    }
    return elems;
}

function doubleArr(length, arr){
    let dblArr = pickElems(length, arr);
    return dblArr.concat(arr);
}

function shuffle(arr) {
    let result = [];
    while (arr.length > 0) {
        let random = getRandomInt(0, arr.length-1);
        let elem = arr.splice(random, 1)[0];
        result.push(elem);
    }
    return result;
}


//timer

let timer = document.createElement('p');
timer.classList.add('timer');
let sec;
let min;

function setTimer() {
    sec = addZero(0);
    min = addZero(0);
    timer.innerHTML = min + ':' + sec;
}

let timerId;
function addTimer() {
    wrapper.insertBefore(timer, table);
    setTimer();
    timerId = setInterval(function() {
        timer.innerHTML = min + ':' + addZero(++sec);
        if (sec == 59) {
            sec = -1;
            min = addZero(++min);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

function addZero (num) {
    if (num >= 0 && num <= 9) {
        num = '0' + num;
        return num;
    } else {
        return num;
    }
}

function addResult() {
    let userTime = document.querySelector('#result');
    saveResult(userTime);
}

function saveResult(elem) {
    elem.textContent = min + ':' + sec;
    setTimer();
}
