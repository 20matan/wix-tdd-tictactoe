import React from 'react'
import {expect} from 'chai';
import {mount} from 'enzyme';
import Board, {getGameStatus} from './Board';


describe('cellClicked', () => {
  const clickCellAt = index => wrapper.find('[data-hook="cell"]').at(index).simulate('click');
  const getCellTextAt = index => wrapper.find('[data-hook="cell"]').at(index).text();

  afterEach(() => wrapper.detach());

  let wrapper;
  const render = () => mount(
    <Board />, {attachTo: document.createElement('div')}
  );

  it('should change first click to X', () => {
    wrapper = render();
    clickCellAt(0);
    expect(getCellTextAt(0)).to.eq('X');
    clickCellAt(0);
    expect(getCellTextAt(0)).to.eq('X');
  })
})

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
