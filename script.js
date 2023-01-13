const Gameboard = (() => {
  let board = new Array(9)

  const getSpot = (num) => board[num]

  const addSign = (num, player) => {
    const tile = document.querySelector(`.gameboard div:nth-child(${num + 1}) p`)
    tile.textContent = player.getSymbol()
    board[num] = player.getSymbol()
  }

  const reset = () => {
    board = new Array(9)
  }

  return {board, getSpot, addSign, reset}
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

  const changeSign = (button) => {
    
  }

  const makeMove = (i) => {
    Gameboard.addSign(i, player)
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
      board[i].addEventListener('click', gameController.makeMove.bind(this, i))
    }

    x.addEventListener('click', () => gameController.changeSign.bind(this))
    o.addEventListener('click', () => gameController.changeSign.bind(this))
    restart.addEventListener('click', () => reset)
  })()

  return {reset}
})()