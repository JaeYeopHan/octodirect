const enum KEY {
  ENTER = 13,
  UP = 38,
  DOWN = 40,
}

export const KeyUtils = {
  isCorrectUpKey: (keyCode: number, index: number) => {
    return keyCode === KEY.UP && index > 0;
  },

  isCorrectDownKey: (keyCode: number, index: number, maxIndex: number) => {
    return keyCode === KEY.DOWN && index < maxIndex;
  },

  isCorrectEnterKey: (keyCode: number, value: string) => {
    return keyCode === KEY.ENTER && value !== '';
  },
};
