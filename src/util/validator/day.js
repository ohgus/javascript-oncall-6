import { DAYS } from '../../constant/day.js';
import { ERROR_MESSAGE } from '../../constant/error.js';
import { isEmpty } from './empty.js';

export const validateDay = (day) => {
  isEmpty(day);
  isValidDay(day);
};

const isValidDay = (day) => {
  if (!DAYS.includes(day)) {
    throw new Error(ERROR_MESSAGE.invalid_day);
  }
};
