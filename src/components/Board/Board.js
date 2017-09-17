import React from 'react';
import PropTypes from 'prop-types';

const checkForWinner = (board, player) => {

  // cheecks if there's a winner by row
  for (var i = 0; i < board.length; i++) {
    if (board[i].every(cell => cell === player))
      return true
  }

  // checks if there's a winner by column
  for (var i = 0; i < board.length; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] === player)
      return true
  }

  // checks if there's a winner by diagonal
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === player)
    return true
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === player)
    return true

  return false
}

export const getGameStatus = board => {

  if (checkForWinner(board, 'X')) {
    return 'X';
  } else if (checkForWinner(board, 'O')) {
    return 'O';
  }

  if (board.every(row => row.every(col => col)))
    return 'TIE'
};

class Board extends React.Component {
  constructor() {
    super();
    this.state = {board: [['', '', ''], ['', '', ''], ['', '', '']], currentPlayer: 'X'};
  }

  cellClicked(rowI, cellI) {
    const board = this.state.board.map((row, rowIndex) =>
      rowIndex !== rowI ? row : row.map((cell, cellIndex) => cellI !== cellIndex ? cell : this.state.currentPlayer));

    if (getGameStatus(board)) {
      this.props.onGameOver({winner: this.state.currentPlayer});
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer: nextPlayer});
  }

  render() {
    return (<div>
      <table>
        <tbody>
          {this.state.board.map((row, rowIndex) =>
            <tr key={rowIndex}>{row.map((cell, cellIndex) =>
              <td data-hook="cell" onClick={() => this.cellClicked(rowIndex, cellIndex)} key={cellIndex}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>);
  }
}

Board.propTypes = {
  onGameOver: PropTypes.func.isRequired
};

export default Board;
