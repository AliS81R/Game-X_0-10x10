let area = document.getElementById('area');
let currentPlayer = document.getElementById('curPlyr');

let player = "x";
let stat = {
    'x': 0,
    'o': 0,
    'd': 0
}

for(let i = 1; i <= 100; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

let cell = document.querySelectorAll('.cell');

let winIndex = [];
let subArr = [];

function getWinHorizontal(koefficient){
  for(let i = 1; i < cell.length + 1; i++){
    subArr.push(i);
    if(i%koefficient === 0){
    winIndex.push(subArr)
    subArr = [];
    }
  }
}

getWinHorizontal(10);

function getWinVertical(koefficient, step){
  let j = 1;
  while(j < Math.sqrt(cell.length) + 1){
    let k = 0;
    subArr.push(j);
    while(k < step){
      let last = subArr[subArr.length - 1]; 
      subArr.push(last+=koefficient);
      k++;
    }
    winIndex.push(subArr);
    subArr = [];
    j++;
  }
}

getWinVertical(10,9)

function getWinFirstDiagonal(koefficient, step, first){
  let m = first;
  let n = 0;
  subArr.push(m);
  //subArr = [1]
  while(n< step){
    let last = subArr[subArr.length - 1]; 
    subArr.push(last+=koefficient);
    n++;
  }
  winIndex.push(subArr);
  subArr = [];
}

getWinFirstDiagonal(11, 9, 1)
getWinFirstDiagonal(9, 9, 10)

for (let i = 0; i< cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}

function cellClick() {

    let data = [];
    
    if(!this.innerHTML) {
        this.innerHTML = player;
    }else {
        alert("Ячейка занята");
        return;
    }

    for(let i in cell){
        if(cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if(checkWin(data)) {
        stat[player] += 1;
        restart("Выграл: " + player);
    }else {
        let draw = true;
        for(let i in cell) {
            if(cell[i].innerHTML == '') draw = false;
        }
        if(draw) {
            stat.d += 1;
            restart("Ничья");
        }
    }

    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin(data) {
    for(let i in winIndex) {
        let win = true;
        for(let j in winIndex[i]) {
            let id = winIndex[i][j];
            let ind = data.indexOf(id);

            if(ind == -1) {
                win = false
            }
        }

        if(win) return true;
    }
    return false;
}

function restart(text) {
    
    alert(text);
    for(let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    updateStat();
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    document.getElementById('sD').innerHTML = stat.d;
}