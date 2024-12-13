import { Console } from '@woowacourse/mission-utils';

import { INPUT_MESSAGE } from '../constant/input.js';

const InputView = {
  async readMontDay() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.month_day);

    return input;
  },

  async readWeekday() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.weekday);

    return input;
  },

  async readWeekend() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.weekend);

    return input;
  },
};

export default InputView;
