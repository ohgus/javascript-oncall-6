import InputView from '../view/InputView.js';

import { validateDay } from '../util/validator/day.js';
import { validateMonth } from '../util/validator/month.js';
import { tryInput } from '../util/tryInput.js';
import {
  validateWeekday,
  validateWeekend,
} from '../util/validator/workOrder.js';

class Controller {
  async play() {
    const [month, day] = await tryInput(() => this.#readMonthDay());
    const [weekdayOrder, weekendOrder] = await tryInput(() =>
      this.#readOrders(),
    );
  }

  async #readMonthDay() {
    const monthDayInput = await InputView.readMontDay();
    const [month, day] = monthDayInput.split(',');

    validateMonth(Number(month));
    validateDay(day);

    return [Number(month), day];
  }

  async #readOrders() {
    const weekdayOrderInput = await InputView.readWeekday();
    const weekdayOrder = weekdayOrderInput.split(',');
    validateWeekday(weekdayOrder);

    const weekendOrderInput = await InputView.readWeekend();
    const weekendOrder = weekendOrderInput.split(',');
    validateWeekend(weekendOrder, weekdayOrder);

    return [weekdayOrder, weekendOrder];
  }
}

export default Controller;
