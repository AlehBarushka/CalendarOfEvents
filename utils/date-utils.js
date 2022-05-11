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
 * @description The function set the time and parse the set date of the recurring event.
 * @param {string} time - time of recurring event in format '15:00:00'.
 * @returns {Number} returns the set date in milliseconds.
 **/
export const setTime = (time) => {
  const currentDate = new Date();

  const arrOfSettedTime = time.split(':');

  const settedHoursNumber = parseInt(arrOfSettedTime[0]);
  const settedMinutesNumber = parseInt(arrOfSettedTime[1]);
  const settedSecondsNumber = parseInt(arrOfSettedTime[2]);

  const settedParsedDate = currentDate.setHours(
    settedHoursNumber,
    settedMinutesNumber,
    settedSecondsNumber
  );

  return settedParsedDate;
};
