import {
  MONTH_END,
  DAY,
  DAY_INDEX,
  HOLIDAY,
  WEEKEND,
} from '../constant/month.js';

class Calendar {
  #month;
  #holiday;
  #calendar;

  constructor(month, startDay) {
    this.#month = month;
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
    let weekOrderIndex = 0;
    let weekendOrderIndex = 0;
    let lastWorker = '';
    let weekNeedToWork = '';
    let weekendNeedToWork = '';

    this.#calendar.forEach((dayInfo) => {
      if (dayInfo.isHoliday || dayInfo.isWeekend) {
        if (weekendNeedToWork !== '') {
          dayInfo.worker = weekendNeedToWork;
          lastWorker = weekendNeedToWork;
          weekendNeedToWork = '';
          return;
        }

        if (weekendOrder[weekendOrderIndex] === lastWorker) {
          dayInfo.worker =
            weekendOrder[(weekendOrderIndex + 1) % weekendOrder.length];
          weekendNeedToWork = weekendOrder[weekendOrderIndex];
          lastWorker =
            weekendOrder[(weekendOrderIndex + 1) % weekendOrder.length];
          weekendOrderIndex = (weekendOrderIndex + 2) % weekendOrder.length;
          return;
        }

        dayInfo.worker = weekendOrder[weekendOrderIndex];
        lastWorker = weekendOrder[weekendOrderIndex];
        weekendOrderIndex = (weekendOrderIndex + 1) % weekendOrder.length;
        return;
      }

      if (weekNeedToWork !== '') {
        dayInfo.worker = weekNeedToWork;
        lastWorker = weekNeedToWork;
        weekNeedToWork = '';
        return;
      }

      if (lastWorker === weekOrder[weekOrderIndex]) {
        dayInfo.worker = weekOrder[(weekOrderIndex + 1) % weekOrder.length];
        weekNeedToWork = weekOrder[weekOrderIndex];
        lastWorker = weekOrder[(weekOrderIndex + 1) % weekOrder.length];
        weekOrderIndex = (weekOrderIndex + 2) % weekOrder.length;
        return;
      }

      dayInfo.worker = weekOrder[weekOrderIndex];
      lastWorker = weekOrder[weekOrderIndex];
      weekOrderIndex = (weekOrderIndex + 1) % weekOrder.length;
    });
  }
}

export default Calendar;
