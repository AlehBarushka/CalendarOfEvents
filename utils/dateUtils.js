/**
 * @description The function checks the validity of the time.
 * @param {string} time - time in format '15:00:00'.
 * @returns {(boolean|Error)} returns true if the time format is correct, or returns an error if otherwise.
 * @example
 * // returns true
 * timeValidator('14:00:00')
 * // returns Error
 * timeValidator('35:00:00')
 **/
export const timeValidator = (time) => {
  const isValid = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/.test(
    time
  );

  if (isValid) {
    return true;
  } else {
    throw new Error('Invalid time format');
  }
};

/**
 * @description The function sets time and parses the reminder date.
 * @param {string} time - time of reminder in format '15:00:00'.
 * @returns {Number} returns the date in milliseconds.
 **/
export const setTime = (time) => {
  const DAY_IN_MILLISECONDS = 86400000;

  const currentDate = new Date();
  const currentParsedDate = Date.now();

  const arrOfSettedTime = time.split(':');

  const settedHoursNumber = parseInt(arrOfSettedTime[0]);
  const settedMinutesNumber = parseInt(arrOfSettedTime[1]);
  const settedSecondsNumber = parseInt(arrOfSettedTime[2]);

  const settedParsedDate = currentDate.setHours(
    settedHoursNumber,
    settedMinutesNumber,
    settedSecondsNumber
  );

  const isTimeUp = settedParsedDate <= currentParsedDate;
  const timeForTheNextDay = settedParsedDate + DAY_IN_MILLISECONDS;

  return isTimeUp ? timeForTheNextDay : settedParsedDate;
};

