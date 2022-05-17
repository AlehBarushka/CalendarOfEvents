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
 * @description The function gets milliseconds from the string time value.
 * @param {string} time - time of recurring event in format '15:00:00'.
 * @returns {Number} returns the set time in milliseconds.
 **/
export const getTimeInMillisecond = (time) => {
  const [hours, minutes, seconds] = time.split(':');

  const timeInMillisecond = new Date().setHours(hours, minutes, seconds);

  return timeInMillisecond;
};
