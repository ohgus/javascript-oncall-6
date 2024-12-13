import InputView from '../view/InputView.js';

import { validateDay } from '../util/validator/day.js';
import { validateMonth } from '../util/validator/month.js';
import { tryInput } from '../util/tryInput.js';

class Controller {
  async play() {
    const [month, day] = await tryInput(() => this.#readMonthDay());
  }

  async #readMonthDay() {
    const monthDayInput = await InputView.readMontDay();
    const [month, day] = monthDayInput.split(',');

    validateMonth(Number(month));
    validateDay(day);

    return [Number(month), day];
  }
}

export default Controller;
