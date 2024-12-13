import { ERROR_MESSAGE } from '../../constant/error.js';
import { isEmpty } from './empty.js';

export const validateWeekday = (weekdayArr) => {
  isValidRange(weekdayArr);
  isDuplicate(weekdayArr);

  weekdayArr.forEach((name) => {
    isEmpty(name);
    isValidNameLength(name);
  });
};

export const validateWeekend = (weekendArr, weekdayArr) => {
  isValidRange(weekendArr);
  isDuplicate(weekendArr);
  isSamePeople(weekdayArr, weekendArr);

  weekendArr.forEach((name) => {
    isEmpty(name);
    isValidNameLength(name);
  });
};

const isDuplicate = (arr) => {
  if (arr.length !== new Set(arr).size) {
    throw new Error(ERROR_MESSAGE.duplicate_person);
  }
};

const isValidRange = (arr) => {
  if (arr.length > 35 || arr.length < 5) {
    throw new Error(ERROR_MESSAGE.order_range);
  }
};

const isValidNameLength = (name) => {
  if (name.length < 2 || name.length > 5) {
    throw new Error(ERROR_MESSAGE.name_length);
  }
};

const isSamePeople = (weekdayArr, weekendArr) => {
  const totalPeople = weekdayArr.concat(weekendArr);
  const totalPeopleCount = new Set(totalPeople).size;

  if (weekendArr.length !== totalPeopleCount) {
    throw new Error(ERROR_MESSAGE.not_same);
  }
};
