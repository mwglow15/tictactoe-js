const Gameboard = (() => {
  let board = new Array(9)

  const getSpot = (num) => board[num]

  const addSign = (num, player) => {
    const tile = document.querySelector(`.gameboard div:nth-child(${num + 1}) p`)
    tile.textContent = player.getSymbol()
    board[num] = player.getSymbol()
  }

  const getAvailableTiles = () => {
    const tiles = new Array()
    for (let i=0; i < board.length; i++) {
      if (!board[i]) {
        tiles.push(i)
      }
    }

    return tiles;
  }

  const reset = () => {
    board = new Array(9)
  }

  return {getSpot, addSign, reset, getAvailableTiles, board}
})()

const Player = (symbol) => {
  const playerSymbol = symbol

  const getSymbol = () => playerSymbol

  const setSymbol = (sign) => {
    playerSymbol = sign
  }

  return {getSymbol, setSymbol}
}

const gameController = (() => {
  const player = Player('X')
  const computer = Player('O')
  const board = Array.from(document.querySelectorAll('div.board'))

  const changeSign = (button) => {
    
  }

  const makeMove = (i) => {
    Gameboard.addSign(i, player)
    if (!checkEnd(player.getSymbol())) {
      computerMove()
    }
  }

  const checkEnd = (symbol) => {
    if (checkRows() || checkDiagonals() || checkColumns()) {
      return true
    } else if (Gameboard.getAvailableTiles().length === 0) {
      return true
    } else {
      return false
    }
  }

  const checkRows = () => {
    for (let i=0;i<7;i=i+3) {
      let row = [Gameboard.getSpot(i), Gameboard.getSpot(i+1), Gameboard.getSpot(i+2)]
      if(row[0] === row[1] && row[0] === row[2] && row[0] !== undefined) {
        return true
      }
    }
    return false
  }

  const checkColumns = () => {
    for (let i=0;i<4;i++) {
      let col = [Gameboard.getSpot(i), Gameboard.getSpot(i+3), Gameboard.getSpot(i+6)]
      if(col[0] === col[1] && col[0] === col[2] && col[0] !== undefined) {
        return true
      }
    }
    return false
  }

  const checkDiagonals = () => {
    const diag1 = [Gameboard.getSpot(0), Gameboard.getSpot(4), Gameboard.getSpot(8)]
    const diag2 = [Gameboard.getSpot(2), Gameboard.getSpot(4), Gameboard.getSpot(6)]
    const diags = [diag1, diag2]

    for(let i=0;i<diags.length;i++) {
      let j = diags[i]
      if(j[0] === j[1] && j[0] === j[2] && j[0] !== undefined) {
        return true
      }
    }
  return false
  }

  const computerMove = () => {
    const empty = Gameboard.getAvailableTiles()
    let idx = Math.floor(Math.random() * empty.length)
    let num = empty[idx]
    Gameboard.addSign(num, computer)
  }

  return {changeSign, makeMove, checkColumns, checkDiagonals, checkRows, checkEnd, player, computerMove}
})()

const displayController = (() => {
  const board = Array.from(document.querySelectorAll('div.board'))
  const x = document.querySelector('.x')
  const o = document.querySelector('.o')
  const restart = document.querySelector('.restart')

  const reset = () => {
    board.forEach(tile => {
      const text = tile.childNodes[0]
      text.textContent = ''
      Gameboard.reset()
    })
  }
  const initialize = (() => {
    for (let i=0; i<board.length; i++) {
      board[i].addEventListener('click', gameController.makeMove.bind(this, i), {once: true})
    }

    x.addEventListener('click', () => gameController.changeSign.bind(this))
    o.addEventListener('click', () => gameController.changeSign.bind(this))
    restart.addEventListener('click', () => reset)
  })()

  return {reset}
})()