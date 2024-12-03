import {
  MONTH_END,
  DAY,
  DAY_INDEX,
  HOLIDAY,
  WEEKEND,
} from '../constant/month.js';

import calculateIndex from '../util/indexCalculator.js';

class Calendar {
  #holiday;
  #calendar;

  constructor(month, startDay) {
    this.#holiday = HOLIDAY[month];
    this.#calendar = this.#createCalendar(month, startDay);
  }

  getCalendar() {
    return this.#calendar;
  }

  #createCalendar(month, startDay) {
    const endDate = this.#getEndDate(month);
    const calendar = [];
    let date = 1;
    let dayIndex = DAY_INDEX[startDay];

    while (date <= endDate) {
      const dayInfo = this.#createDayInfo(date, dayIndex);
      calendar.push(dayInfo);
      date += 1;
      dayIndex = (dayIndex + 1) % 7;
    }

    return calendar;
  }

  #createDayInfo(date, dayIndex) {
    return {
      date,
      day: DAY[dayIndex],
      isHoliday: this.#isHoliday(date),
      isWeekend: this.#isWeekend(DAY[dayIndex]),
      worker: '',
    };
  }

  #getEndDate(month) {
    if (month === 2) return 28;

    if (MONTH_END.thirty_one.includes(month)) return 31;

    return 30;
  }

  #isHoliday(date) {
    if (this.#holiday === null) return false;

    return this.#holiday.includes(date);
  }

  #isWeekend(day) {
    return WEEKEND.includes(day);
  }

  setSchedule(weekOrder, weekendOrder) {
    let weekdayIndex = 0;
    let weekendIndex = 0;
    let lastWorker = '';
    let weekdayNeedWork = '';
    let weekendNeedWork = '';

    this.#calendar.forEach((dayInfo) => {
      if (dayInfo.isHoliday || dayInfo.isWeekend) {
        this.#scheduleProcess(
          dayInfo,
          weekendNeedWork,
          lastWorker,
          weekendOrder,
          weekendIndex,
        );

        const { index, worked, needWork } = this.#updateIndices(
          weekendOrder,
          weekendIndex,
          lastWorker,
          weekendNeedWork,
        );

        weekendIndex = index;
        lastWorker = worked;
        weekendNeedWork = needWork;
      } else {
        this.#scheduleProcess(
          dayInfo,
          weekdayNeedWork,
          lastWorker,
          weekOrder,
          weekdayIndex,
        );
        const { index, worked, needWork } = this.#updateIndices(
          weekOrder,
          weekdayIndex,
          lastWorker,
          weekdayNeedWork,
        );

        weekdayIndex = index;
        lastWorker = worked;
        weekdayNeedWork = needWork;
      }
    });
  }

  #scheduleProcess(dayInfo, needWork, lastWorker, order, index) {
    if (needWork !== '') {
      dayInfo.worker = needWork;
      return;
    }

    if (lastWorker === order[index]) {
      dayInfo.worker = order[(index + 1) % order.length];
      return;
    }

    dayInfo.worker = order[index];
  }

  #updateIndices(order, index, lastWorker, needWork) {
    let worked = '';

    if (needWork !== '') {
      worked = needWork;
      needWork = '';
      return { index, worked, needWork };
    }

    if (lastWorker === order[index]) {
      needWork = order[index];
      worked = order[(index + 1) % order.length];
      index = calculateIndex.worked(order, index);
      return { index, worked, needWork };
    }

    worked = order[index];
    index = calculateIndex.normal(order, index);
    return { index, worked, needWork };
  }
}

export default Calendar;
