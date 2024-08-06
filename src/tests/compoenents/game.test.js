import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TicTacToe from '../../app/components/Game';
import '@testing-library/jest-dom'

describe('TicTacToe Component', () => {
  it('renders the start game button', () => {
    render(<TicTacToe />);
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('starts the game when the start button is clicked', () => {
    render(<TicTacToe />);
    fireEvent.click(screen.getByText('Start Game'));
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
  });

  it('renders X in a square after clicking', () => {
    render(<TicTacToe />);
    fireEvent.click(screen.getByText('Start Game'));
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
  });

  it('renders O in a square after two clicks', () => {
    render(<TicTacToe />);
    fireEvent.click(screen.getByText('Start Game'));
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
  });

  it('declares a winner when a player wins', () => {
    render(<TicTacToe />);
    fireEvent.click(screen.getByText('Start Game'));
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[6]);
    expect(screen.getByText('Winner: X')).toBeInTheDocument();
  });

  it('declares a draw when the game is a draw', () => {
    render(<TicTacToe />);
    fireEvent.click(screen.getByText('Start Game'));
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    const squares = screen.getAllByRole('button');
    moves.forEach(index => fireEvent.click(squares[index]));
    expect(screen.getByText('Draw')).toBeInTheDocument();
  });

  it('resets the game when the reset button is clicked', () => {
    render(<TicTacToe />);
    fireEvent.click(screen.getByText('Start Game'));
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[6]);
    fireEvent.click(screen.getByText('Reset Game'));
    squares.forEach(square => expect(square).toHaveTextContent(''));
  });
});