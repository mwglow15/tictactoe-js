const gameboard = document.querySelector(".gameboard")

const Gameboard = () => {
  let board = new Array(9)

  return {board}
}

const Player = (symbol) => {
  const playerSymbol = symbol

  const getSymbol = () => playerSymbol

  const setSymbol = (sign) => {
    playerSymbol = sign
  }

  return {getSymbol, setSymbol}
}

const gameController = (() => {
  

})

const displayController = (() => {

})