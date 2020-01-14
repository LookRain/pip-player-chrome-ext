export const stateMachine = {
  idle: {
    PLAY: 'attemptingToPlay',
  },
  attemptingToPlay: {
    SUCCESS: 'playing',
    FAIL: 'error',
  },
  playing: {
    QUIT: 'idle',
  },
  error: {
    PLAY: 'attemptingToPlay',
  },
};

export type Commands =
  | 'play'
  | 'original-player-play'
  | 'play-next'
  | 'mute'
  | {continuous: boolean}
  | {multiVideo: boolean};
