import InputView from '../view/InputView.js';

import { validateDay } from '../util/validator/day.js';
import { validateMonth } from '../util/validator/month.js';
import { tryInput } from '../util/tryInput.js';
import {
  validateWeekday,
  validateWeekend,
} from '../util/validator/workOrder.js';
import Schedule from '../model/Schedule.js';

class Controller {
  #schedule;

  async play() {
    const [month, day] = await tryInput(() => this.#readMonthDay());
    this.#setSchedule(month, day);

    const [weekdayOrder, weekendOrder] = await tryInput(() =>
      this.#readOrders(),
    );
  }

  #setSchedule(month, day) {
    this.#schedule = new Schedule(month, day);
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
