import { MONTH } from '../constant/month.js';
import { DAYS } from '../constant/day.js';

class Schedule {
  #schedule;
  #holidays;

  constructor(month, day) {
    this.#schedule = [];
    this.#holidays = this.#getHolidays(month);
    this.#createSchedule(month, day);
  }

  getSchedule() {
    return this.#schedule;
  }

  #createSchedule(month, day) {
    let date = 1;
    let dayIndex = DAYS.indexOf(day);

    while (date <= MONTH[month].end) {
      const dayInfo = this.#createDay(dayIndex, date);
      this.#schedule.push(dayInfo);

      date += 1;
      dayIndex = (dayIndex + 1) % 7;
    }
  }

  #createDay(dayIndex, date) {
    const isHoliday = this.#holidays.includes(date);
    const isWeekend = dayIndex > 4;
    const day = DAYS[dayIndex];

    return { date, day, isWeekend, isHoliday, worker: '' };
  }

  #getHolidays(month) {
    const holidays = MONTH[month].holiday;

    if (holidays === null) return [];

    return holidays;
  }
}

export default Schedule;
