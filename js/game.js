const board = document.querySelector('.grid');
let squares = [];
const result = document.querySelector('.result');

let game = true;

function createBoard(){
    if(game){
        for(let i = 0; i < 16; i++){
            const sqr = document.createElement('div')
            sqr.classList = 'square'
            sqr.innerHTML = parseInt(0)
            board.appendChild(sqr)
        }
    
        squares = board.children;

    } else {
        for(let i = 0; i < 16; i++)
            squares[i].innerHTML = parseInt(0)
    }

    generate2()
    generate2()
}

createBoard()

function generate2(){

    const ind = Math.floor(Math.random() * board.childElementCount)

    if(board.children[ind].innerHTML == 0){
        board.children[ind].innerHTML = parseInt(2)
        checkGameOver()
    }
    else
        generate2()
}

function alignRight(){
    for(let i = 0; i < 13; i += 4){
        
        let row = [parseInt(squares[i].innerHTML), parseInt(squares[i + 1].innerHTML), parseInt(squares[i + 2].innerHTML), parseInt(squares[i + 3].innerHTML)]

        let nonZeroArr = row.filter(n => n)
        let zeroArr = Array(4 - nonZeroArr.length).fill(0)
        let newRow = zeroArr.concat(nonZeroArr)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]

    }

}

function alignLeft(){
    for(let i = 0; i < 13; i += 4){
        
        let row = [parseInt(squares[i].innerHTML), parseInt(squares[i + 1].innerHTML), parseInt(squares[i + 2].innerHTML), parseInt(squares[i + 3].innerHTML)]

        let nonZeroArr = row.filter(n => n)
        let zeroArr = Array(4 - nonZeroArr.length).fill(0)
        let newRow = nonZeroArr.concat(zeroArr)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]

    }

}

function alignDown(){
    for(let i = 0; i < 4; i++){
        
        let col = [parseInt(squares[i].innerHTML), parseInt(squares[i + 4].innerHTML), parseInt(squares[i + 8].innerHTML), parseInt(squares[i + 12].innerHTML)]

        let nonZeroCol = col.filter(n => n)
        let zeroCol = Array(4 - nonZeroCol.length).fill(0)
        let newCol = zeroCol.concat(nonZeroCol)

        squares[i].innerHTML = newCol[0]
        squares[i + 4].innerHTML = newCol[1]
        squares[i + 8].innerHTML = newCol[2]
        squares[i + 12].innerHTML = newCol[3]

    }

}

function alignTop(){
    for(let i = 0; i < 4; i++){
        
        let col = [parseInt(squares[i].innerHTML), parseInt(squares[i + 4].innerHTML), parseInt(squares[i + 8].innerHTML), parseInt(squares[i + 12].innerHTML)]

        let nonZeroCol = col.filter(n => n)
        let zeroCol = Array(4 - nonZeroCol.length).fill(0)
        let newCol = nonZeroCol.concat(zeroCol)

        squares[i].innerHTML = newCol[0]
        squares[i + 4].innerHTML = newCol[1]
        squares[i + 8].innerHTML = newCol[2]
        squares[i + 12].innerHTML = newCol[3]

    }

}

function combineRow(){
    for(let i = 0; i < 15; i++)
        if(squares[i].innerHTML === squares[i + 1].innerHTML){
            let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)

            squares[i].innerHTML = total;
            squares[i + 1].innerHTML = 0
        }
    
    checkWin()
}

function combineCol(){
    for(let i = 0; i < 12; i++)
        if(squares[i].innerHTML === squares[i + 4].innerHTML){
            let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML)

            squares[i].innerHTML = total;
            squares[i + 4].innerHTML = 0
        }
    
    checkWin()
}

function keyPressed(evt){
    if(evt.key == 'ArrowRight'){
        alignRight()
        combineRow()
        alignRight() 
        generate2()
    } else if(evt.key == 'ArrowLeft'){
        alignLeft()
        combineRow()
        alignLeft()
        generate2()
    } else if(evt.key == 'ArrowUp'){
        alignTop()
        combineCol()
        alignTop()
        generate2()
    } else if(evt.key == 'ArrowDown'){
        alignDown()
        combineCol()
        alignDown()
        generate2()
    }

}

function checkWin(){
    for(let i = 0; i < squares.length; i++)
        if(squares[i].innerHTML == 2048){
            result.style.color = 'lightgreen';
            result.children[0].innerHTML = 'You Win!!';
            document.removeEventListener('keydown', keyPressed)
            document.removeEventListener('touchstart', startTouch)
            document.removeEventListener('touchmove', moveTouch)
            game = false;
        }
}

function checkGameOver(){
    let c = 0;
    for(let i = 0; i < 16; i++)
        if(squares[i].innerHTML != 0)
            c += 1

    if(c == 16){
        result.style.color = 'red';
        result.children[0].innerHTML = 'You Lose!';
        document.removeEventListener('keydown', keyPressed)
        document.removeEventListener('touchstart', startTouch)
        document.removeEventListener('touchmove', moveTouch)
        game = false
    }
}

function reset(){
    createBoard()
    game = true
    result.style.color = 'grey';
    result.children[0].innerHTML = 'Make a Sum of 2048';
    document.addEventListener('keydown', keyPressed)
    document.addEventListener('touchstart', startTouch, false);
    document.addEventListener('touchmove', moveTouch, false);
}

function play(){
    if(!game){
        reset()
    }
    else
        alert('Game is Not Completed!')
}

let x1 = null;
let y1 = null;

function startTouch(e){
    x1 = e.touches[0].clientX;
    y1 = e.touches[0].clientY;
}

function moveTouch(e){

    if(x1 === null || y1 === null)
        return

    let x2 = e.touches[0].clientX;
    let y2 = e.touches[0].clientY;

    let diffX = x1 - x2;
    let diffY = y1 - y2;

    if(Math.abs(diffX) > Math.abs(diffY)){

        if(diffX > 0){
            alignLeft()
            combineRow()
            alignLeft()
            generate2()
        }
        else{
            alignRight()
            combineRow()
            alignRight() 
            generate2()
        }
            
    } else {
        if(diffY > 0){
            alignTop()
            combineCol()
            alignTop()
            generate2()
        }
        else{
            alignDown()
            combineCol()
            alignDown()
            generate2()
        }
    }

    x1 = null;
    y1 = null;
}

// CSS Part

const ins = document.querySelector('.ins');
const sb = document.querySelector('.side-bar');

function toggleSide(){

    if(ins.style.visibility === 'hidden'){
        ins.style.visibility = 'visible';
        sb.innerHTML = 'Hide Instructions'
        document.removeEventListener('keydown', keyPressed)
        document.removeEventListener('touchstart', startTouch)
        document.removeEventListener('touchmove', moveTouch)
    } else {
        ins.style.visibility = 'hidden';
        sb.innerHTML = 'Show Instructions'
        if(game){
            document.addEventListener('keydown', keyPressed)
            document.addEventListener('touchstart', startTouch, false);
            document.addEventListener('touchmove', moveTouch, false);
        }
    }
}