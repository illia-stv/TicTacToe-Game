import { createActor } from 'xstate';
import ticTacToeMachine from '../../app/machines/ticTacToeMachine';

describe('ticTacToeMachine', () => {
  it('should start in the idle state', (done) => {
    const actor = createActor(ticTacToeMachine);
    actor.subscribe(snapshot => {
      if (snapshot.value === 'idle') {
        expect(snapshot.value).toBe('idle');
        done();
      }
    });
    actor.start();
  });

  it('should transition to playing state on START', (done) => {
    const actor = createActor(ticTacToeMachine);
    actor.subscribe(snapshot => {
      if (snapshot.value === 'playing') {
        expect(snapshot.value).toBe('playing');
        done();
      }
    });
    actor.start();
    actor.send({ type: 'START' });
  });

  it('should allow a valid move', (done) => {
    const actor = createActor(ticTacToeMachine);
    actor.subscribe(snapshot => {
      if (snapshot.context.board[0] === 'X') {
        expect(snapshot.context.board[0]).toBe('X');
        expect(snapshot.value).toBe('playing');
        done();
      }
    });
    actor.start();
    actor.send({ type: 'START' });
    actor.send({ type: 'MAKE_MOVE', index: 0 });
  });

  it('should transition to won state if a player wins', (done) => {
    const actor = createActor(ticTacToeMachine);
    actor.subscribe(snapshot => {
      if (snapshot.value === 'won') {
        expect(snapshot.value).toBe('won');
        done();
      }
    });
    actor.start();
    actor.send({ type: 'START' });
    actor.send({ type: 'MAKE_MOVE', index: 0 });
    actor.send({ type: 'MAKE_MOVE', index: 1 });
    actor.send({ type: 'MAKE_MOVE', index: 3 });
    actor.send({ type: 'MAKE_MOVE', index: 4 });
    actor.send({ type: 'MAKE_MOVE', index: 6 });
  });

  it('should transition to draw state if the game is a draw', (done) => {
    const actor = createActor(ticTacToeMachine);
    actor.subscribe(snapshot => {
      if (snapshot.value === 'draw') {
        expect(snapshot.value).toBe('draw');
        done();
      }
    });
    actor.start();
    actor.send({ type: 'START' });
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    moves.forEach(index => actor.send({ type: 'MAKE_MOVE', index }));
  });

  it('should reset the game on RESET', (done) => {
    const actor = createActor(ticTacToeMachine);
    actor.subscribe(snapshot => {
      if (snapshot.value === 'idle') {
        expect(snapshot.context.board).toEqual(Array(9).fill(null));
        expect(snapshot.value).toBe('idle');
        done();
      }
    });
    actor.start();
    actor.send({ type: 'START' });
    actor.send({ type: 'MAKE_MOVE', index: 0 });
    actor.send('RESET');
  });
});

