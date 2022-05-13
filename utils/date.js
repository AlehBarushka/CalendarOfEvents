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
 * @description The function check whether the passed value is a number and whether it is greater than zero.
 * @param {Number} value - the value to be checked.
 * @returns {Boolean} returns true if the value satisfies the conditions or returns false if otherwise.
 * @example
 * //returns true
 * isValid(12)
 * //returns false
 * isValid([1])
 * //returns false
 * isValid('1')
 */
const isValid = (value) => {
  const isNumber = Number.isInteger(value);

  const isGreaterThanZero = value >= 0;

  return isNumber && isGreaterThanZero ? true : false;
};

/**
 * @description The function checks the validity of the reminder time object.
 * @param {ReminderTime} reminderTime - object of the reminder time.
 * @returns {(Boolean|Error)} returns true if the object is valid, or returns an error if otherwise.
 * @example
 * //returns true
 * reminderTimeValidator({hours: 12})
 * //returns true
 * reminderTimeValidator({minutes: 10, hours: -1})
 * //returns Error
 * reminderTimeValidator({minutes: '10', hours: -1})
 */
export const reminderTimeValidator = (reminderTime) => {
  const { minutes, hours } = reminderTime;

  if (isValid(minutes) || isValid(hours)) {
    return true;
  } else {
    throw new Error('Invalid reminder time');
  }
};

/**
 * @description The function converts the transmitted minutes and hours into milliseconds.
 * @param {ReminderTime} reminderTime - object of the reminder time.
 * @returns {Number} returns minutes and hours in milliseconds.
 * @example
 * //returns 3600000
 * reminderTimeValidator({hours: 1})
 * //returns 600000
 * reminderTimeValidator({minutes: 10})
 * //returns 4200000
 * reminderTimeValidator({minutes: 10, hours: 1})
 */
export const reminderTimeConvertor = (reminderTime) => {
  let { hours, minutes } = reminderTime;

  if (!hours || !isValid(hours)) {
    hours = 0;
  }

  if (!minutes || !isValid(minutes)) {
    minutes = 0;
  }

  const timeInMilliseconds =
    hours * MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE +
    minutes * MILLISECONDS_IN_MINUTE;

  return timeInMilliseconds;
};
