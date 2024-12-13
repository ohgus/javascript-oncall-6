import { ERROR_MESSAGE } from '../../constant/error.js';

export const validateMonth = (month) => {
  isNaN(month);
  isValidRange(month);
  isInteger(month);
};

const isNaN = (month) => {
  if (Number.isNaN(month)) {
    throw new Error(ERROR_MESSAGE.NaN);
  }
};

const isValidRange = (month) => {
  if (month > 12 || month < 1) {
    throw new Error(ERROR_MESSAGE.month_range);
  }
};

const isInteger = (month) => {
  if (!Number.isInteger(month)) {
    throw new Error(ERROR_MESSAGE.integer);
  }
};
