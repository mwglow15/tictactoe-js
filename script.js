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

  return {getSpot, addSign, reset, getAvailableTiles}
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
    computerMove()
  }

  const checkEnd = () => {

  }

  const computerMove = () => {
    const empty = Gameboard.getAvailableTiles()
    let idx = Math.floor(Math.random() * empty.length)
    let num = empty[idx]
    Gameboard.addSign(num, computer)
  }

  return {changeSign, makeMove}
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