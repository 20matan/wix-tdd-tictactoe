import React from 'react';
import Board from '../Board';
import s from './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {winner: ''};
  }

  _getWinnerText = () => {
    const { winner } = this.state
    if (winner === 'TIE')
      return "it's a tie"
    return `${this.state.winner} wins!`
  }

  render() {
    return (
      <div data-hook="app" className={s.root}>
        <Board onGameOver={({winner}) => this.setState({winner})}/>
        {this.state.winner && <div data-hook="winner-message">{this._getWinnerText()}</div>}
      </div>
    );
  }
}

export default App;
