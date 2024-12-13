import { ERROR_MESSAGE } from '../../constant/error.js';

export const isEmpty = (input) => {
  if (input === '') {
    throw new Error(ERROR_MESSAGE.empty);
  }
};
