import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import App from './App';

let wrapper;
const render = () => mount(
  <App/>, {attachTo: document.createElement('div')}
);
const clickCellAt = index => wrapper.find('[data-hook="cell"]').at(index).simulate('click');
const clickRestartGame = index => wrapper.find('[data-hook="restart-game"]').simulate('click');
const getCellTextAt = index => wrapper.find('[data-hook="cell"]').at(index).text();
const getTurnText = index => wrapper.find('[data-hook="current-player"]').text();
const getWinnerMessage = () => wrapper.find('[data-hook="winner-message"]').text();
const getWinsOfPlayer = player => wrapper.find(`[data-hook="${player}-wins"]]`).text();
const getXWins = () => getWinsOfPlayer('X');
const getOWins = () => getWinsOfPlayer('O');

describe('App', () => {

  afterEach(() => wrapper.detach());

  it('should have "O" after second user clicks', () => {
    wrapper = render();
    clickCellAt(0);
    expect(getCellTextAt(0)).to.eq('X');
    clickCellAt(1);
    expect(getCellTextAt(1)).to.eq('O');
  });

  it('Player "O" should win the game', () => {
    wrapper = render();
    clickCellAt(3);
    clickCellAt(0);
    clickCellAt(4);
    clickCellAt(1);
    clickCellAt(6);
    clickCellAt(2);
    expect(getWinnerMessage()).to.eq('O wins!');
  });

  it('should show Its a tie message', () => {
    wrapper = render()
    clickCellAt(0)
    clickCellAt(1)
    clickCellAt(2)
    clickCellAt(3)
    clickCellAt(4)
    clickCellAt(6)
    clickCellAt(5)
    clickCellAt(8)
    clickCellAt(7)
    expect(getWinnerMessage()).to.eq("it's a tie")
  });

  it('should show 0 wins for X', () => {
    wrapper = render()
    expect(getXWins()).to.eq('0');
  });

  it('should show 1 wins for X', () => {
    wrapper = render()

    // Win scenario
    clickCellAt(8);
    clickCellAt(3);
    clickCellAt(0);
    clickCellAt(4);
    clickCellAt(1);
    clickCellAt(6);
    clickCellAt(2);

    expect(getXWins()).to.eq('1');
  });

  it('should start a new game', () => {
    wrapper = render()

    expect(getTurnText()).to.eq('X');
    clickCellAt(0);
    expect(getTurnText()).to.eq('O');
    clickRestartGame();
    expect(getTurnText()).to.eq('X');

  })

});
