const gameboard = document.querySelector(".gameboard")

const Gameboard = () => {
  let board = [null,'X',null,'O',null,'O',null,null,null]

  const updateBoard = () => {
    while (gameboard.firstChild) {
      gameboard.removeChild(gameboard.firstChild)
    }
    board.forEach(mark => {
      const tile = document.createElement('div')
      tile.classList.add('tile')
      tile.textContent = mark

      gameboard.appendChild(tile)
    })
  }

  return {board, updateBoard}
}

const game = Gameboard()
game.updateBoard()