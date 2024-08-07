import { createMachine, assign } from 'xstate';

const calculateWinner = (squares: (string | null)[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const ticTacToeMachine = createMachine({
    id: 'ticTacToe',
    initial: 'idle',
    context: {
        board: Array(9).fill(null),
        isXNext: true,
    },
    states: {
        idle: {
            on: {
                START: 'playing',
            },
        },
        playing: {
            on: {
                MAKE_MOVE: [
                    {
                        guard: 'isValidMove',
                        actions: 'makeMove',
                        target: 'checkingWin',
                    }
                ],
            },
        },
        checkingWin: {
            always: [
                {
                    guard: 'hasWinner',
                    target: 'won',
                },
                {
                    guard: 'isDraw',
                    target: 'draw',
                },
                { target: 'playing' },
            ],
        },
        won: {
          on: {
              RESET: {
                  target: 'idle',
                  actions: 'resetGame'
              },
          },
        },
        draw: {
            on: {
                RESET: {
                    target: 'idle',
                    actions: 'resetGame'
                },
            },
        },
        },
}, {
    actions: {
        makeMove: assign({
            board: ({ context, event }) => {
            const newBoard = [...context.board];
            newBoard[event.index] = context.isXNext ? 'X' : 'O';
            return newBoard;
            },
            isXNext: ({ context }) => !context.isXNext,
        }),
        resetGame: assign({
            board: () => Array(9).fill(null),
            isXNext: () => true,
        }),
    },
    guards: {
        isValidMove: ({ context, event }) => { 
            return context.board[event.index] === null
        },
        hasWinner: ({ context }) => !!calculateWinner(context.board),
        isDraw: ({ context }) => context.board.every(Boolean),
    },
});

export default ticTacToeMachine;
