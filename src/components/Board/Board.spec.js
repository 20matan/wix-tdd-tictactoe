import React from 'react'
import {expect} from 'chai';
import {mount} from 'enzyme';
import Board, {getGameStatus} from './Board';


const clickCellAt = index => wrapper.find('[data-hook="cell"]').at(index).simulate('click');
const getCellTextAt = index => wrapper.find('[data-hook="cell"]').at(index).text();
const getTurnText = () => wrapper.find('[data-hook="current-player"]').text()


let wrapper;
const render = () => mount(
  <Board />, {attachTo: document.createElement('div')}
);


describe('cellClicked', () => {

  afterEach(() => wrapper.detach());

  it('will not allow to click a non-empty cell', () => {
    wrapper = render();
    clickCellAt(0);
    expect(getCellTextAt(0)).to.eq('X');
    clickCellAt(0);
    expect(getCellTextAt(0)).to.eq('X');
  })
})

describe('turns', () => {

  afterEach(() => wrapper.detach());

  it('should start with user X turn', () => {
    wrapper = render();
    expect(getTurnText()).to.equal('X')
  });

  it('should show O turn after X played', () => {
    wrapper = render();
    expect(getTurnText()).to.equal('X')
    clickCellAt(0);
    expect(getTurnText()).to.equal('O')
  });
});

describe('getGameStatus', () => {
  it('"X" should win for first row', () => {
    const borad = [['X', 'X', 'X'], ['', '', ''], ['', '', '']];
    expect(getGameStatus(borad)).to.equal('X');
  });

  it('"X" should win for second row', () => {
    const borad = [['', '', ''], ['X', 'X', 'X'], ['', '', '']];
    expect(getGameStatus(borad)).to.equal('X');
  });

  it('"X" should win for third row', () => {
    const borad = [['', '', ''], ['', '', ''], ['X', 'X', 'X']];
    expect(getGameStatus(borad)).to.equal('X');
  });

  it('"O" should win for first column', () => {
    const borad = [['O', '', ''], ['O', '', ''], ['O', '', '']];
    expect(getGameStatus(borad)).to.equal('O');
  });

  it('"O should win for second column"', () => {
    const board = [['','O',''], ['','O', ''], ['','O','']];
    expect(getGameStatus(board)).to.equal('O');
  })

  it('"O should win for third column"', () => {
    const board = [['','','O'], ['','', 'O'], ['','','O']];
    expect(getGameStatus(board)).to.equal('O');
  })

  it('"O should win for diagonal"', () => {
    const board = [['O','',''], ['','O', ''], ['','','O']];
    expect(getGameStatus(board)).to.equal('O');
  })

  it('"O should win for second diagonal"', () => {
    const board = [['','','O'], ['','O', ''], ['O','','']];
    expect(getGameStatus(board)).to.equal('O');
  })

  it('it should be tied', () => {
    const board = [['X','O','X'], ['O','X', 'X'], ['O','X','O']];
    expect(getGameStatus(board)).to.equal('TIE');
  })

  it('it should return undefined', () => {
    const board = [['','O','X'], ['O','X', 'X'], ['O','X','O']];
    expect(getGameStatus(board)).to.equal(undefined);
  })
});
