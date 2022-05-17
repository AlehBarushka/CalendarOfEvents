/**
 * @typedef {Object} ReminderTime
 * @property {Number} ReminderTime.hours - number of hours.
 * @property {Number} ReminderTime.minutes - number of minutes.
 */

import { MILLISECONDS_IN_MINUTE, MINUTES_IN_HOUR } from '../constants/index.js';

/**
 * @description The function converts the time and date into milliseconds.
 * @param {String} date - date in format '2022-04-06'.
 * @param {String} time - time in format '12:00:00'.
 * @returns {Number} returns the date in milliseconds since January 1, 1970, 00:00:00 UTC.
 * @example
 * //returns 1660035600000
 * dateParser('2022-04-06', '18:24:00')
 *
 */
export const dateParser = (date, time) => {
  const eventDate = date + 'T' + time;

  const parsedDate = Date.parse(eventDate);

  return parsedDate;
};

/**
 * @description The function check whether the passed value is a number and whether it is greater than or equal to zero.
 * @param {Number} value - the value to be checked.
 * @returns {Boolean} returns true if the value satisfies the conditions or returns false if otherwise.
 * @example
 * //returns true
 * isGreaterThanOrEqualToZero(12)
 * //returns false
 * isGreaterThanOrEqualToZero([1])
 */
const isGreaterThanOrEqualToZero = (value) => {
  const isNumber = Number.isInteger(value);

  const isGreaterThanOrEqualToZero = value >= 0;

  return isNumber && isGreaterThanOrEqualToZero;
};

/**
 * @description The function checks the validity of the reminder time object.
 * @param {ReminderTime} reminderTime - object of the reminder time.
 * @returns {(Boolean|Error)} returns true if the object is valid, or returns an error if otherwise.
 * @example
 * //returns Error
 * reminderTimeValidator({hours: 12})
 * //returns true
 * reminderTimeValidator({minutes: 10, hours: 1})
 * //returns Error
 * reminderTimeValidator({minutes: '10', hours: -1})
 */
export const reminderTimeValidator = (reminderTime) => {
  if (!reminderTime?.minutes || !reminderTime.hours) {
    throw new Error(
      'Reminder time object have to contain the minutes and hours fields'
    );
  }

  if (
    isGreaterThanOrEqualToZero(reminderTime.minutes) &&
    isGreaterThanOrEqualToZero(reminderTime.hours)
  ) {
    return true;
  } else {
    throw new Error(
      'Invalid reminder time. Hours and minutes have to be numbers greater than or equal to zero'
    );
  }
};

/**
 * @description The function checks the validity of the time.
 * @param {string} time - time in format '15:00:00'.
 * @returns {(boolean|Error)} returns true if the time format is correct, or returns an error if otherwise.
 * @example
 * // returns true
 * timeValidator('14:00:00')
 * // returns Error
 * timeValidator('35:00:00')
 */

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
 * @description The function converts the transmitted minutes and hours into milliseconds.
 * @param {ReminderTime} reminderTime - object of the reminder time.
 * @returns {Number} returns minutes and hours in milliseconds.
 * @example
 * //returns 4200000
 * reminderTimeConvertor({minutes: 10, hours: 1})
 */
export const reminderTimeConvertor = ({ hours, minutes }) => {
  const hoursInMilliseconds = hours * MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;
  const minutesInMilliseconds = minutes * MILLISECONDS_IN_MINUTE;

  const timeInMilliseconds = hoursInMilliseconds + minutesInMilliseconds;

  return timeInMilliseconds;
};

/**
 * @description The function gets milliseconds from the string time value.
 * @param {string} time - time of recurring event in format '15:00:00'.
 * @returns {Number} returns the set time in milliseconds.
 */
export const getTimeInMillisecond = (time) => {
  const [hours, minutes, seconds] = time.split(':');

  const timeInMillisecond = new Date().setHours(hours, minutes, seconds);

  return timeInMillisecond;
};
