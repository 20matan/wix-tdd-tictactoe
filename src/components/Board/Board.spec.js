import {expect} from 'chai';
import {getGameStatus} from './Board';

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
