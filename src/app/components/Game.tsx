'use client';
import { useMachine } from '@xstate/react';
import { createActor } from 'xstate';
import ticTacToeMachine from '../machines/ticTacToeMachine';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
`;

const Status = styled.div`
  margin-bottom: 10px;
  font-size: 24px;
  background: linear-gradient(45deg, #ff6b6b, #f06595);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  width: 300px;
  height: 300px;

  @media (max-width: 600px) {
    width: 90vw;
    height: 90vw;
  }
`;

const Square = styled.button`
  width: 100%;
  height: 100%;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #999;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #2575fc, #6a11cb);
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    font-size: 16px;
    padding: 8px 16px;
  }
`;

const TicTacToe = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  const { board, isXNext } = state.context;

  const handleClick = (index: number) => {
    send({ type: 'MAKE_MOVE', index });
  };

  const won = state.matches('won');
  const draw = state.matches('draw');
  const status = won
    ? `Winner: ${isXNext ? 'O' : 'X'}`
    : draw
    ? 'Draw'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (index: number) => (
    <Square onClick={() => handleClick(index)} key={ index }>
      {board[index]}
    </Square>
  );

  const handleStart = () => {
    send({ type: 'START' });
  };

  const handleReset = () => {
    send({ type: 'RESET' });
  };

  return (
    <GameContainer>
      <Status>{status}</Status>
      <Board>
        {board.map((_, index) => renderSquare(index))}
      </Board>
      {state.matches('idle') && <Button onClick={handleStart}>Start&nbsp;Game</Button>}
      {(state.matches('won') || state.matches('draw')) && <Button onClick={handleReset}>Reset&nbsp;Game</Button>}
    </GameContainer>
  );
};

export default TicTacToe;
