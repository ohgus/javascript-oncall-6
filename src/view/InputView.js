import { Console } from '@woowacourse/mission-utils';

import { INPUT_MESSAGE } from '../constant/input.js';

const InputView = {
  async readMontDay() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.month_day);

    return input;
  },
};

export default InputView;
