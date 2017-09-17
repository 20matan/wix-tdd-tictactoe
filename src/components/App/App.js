import React from 'react';
import Board from '../Board';
import s from './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {winner: '', wins: {X:0, O:0}};
  }

  _getWinnerText = () => {
    const { winner } = this.state
    if (winner === 'TIE')
      return "it's a tie"
    return `${this.state.winner} wins!`
  }

  _onGameOver = ({winner}) => {
    const wins = {...this.state.wins};
    if (winner !== 'TIE') {
      wins[winner] = wins[winner] + 1;
    }

    this.setState({winner, wins});
  }

  render() {
    return (
      <div data-hook="app" className={s.root}>
        <Board onRestartGame={() => this.setState({winner: ''})} onGameOver={this._onGameOver} winner={this.state.winner}/>
        {this.state.winner && <div data-hook="winner-message">{this._getWinnerText()}</div>}
        <div>X Wins: <div data-hook="X-wins">{this.state.wins['X']}</div></div>
        <div>O Wins: <div data-hook="O-wins">{this.state.wins['O']}</div></div>
      </div>
    );
  }
}

export default App;
