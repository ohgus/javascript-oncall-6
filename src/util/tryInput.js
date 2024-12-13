import OutputView from '../view/OutputView.js';

export const tryInput = async (inputFn) => {
  try {
    return await inputFn();
  } catch (e) {
    OutputView.printError(e.message);

    return await tryInput(() => inputFn());
  }
};
