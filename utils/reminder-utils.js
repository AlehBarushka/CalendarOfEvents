import { dateParser, reminderTimeConvertor } from './date-utils.js';

/**
 * @typedef {Object} ReminderTime
 * @property {Number} ReminderTime.hours - number of hours.
 * @property {Number} ReminderTime.minutes - number of minutes.
 */

/**
 * @description The function adds settimeout with a delay for the specified period of time before the event occurs.
 * @param {String} date - date of an existing event in format '2022-04-06'.
 * @param {String} time - time of an existing event in format '12:00:00'.
 * @param {ReminderTime} reminderTime - object of the reminder time.
 * @param {Function} callback - the callback function that will be called before the event occurs.
 * @returns {Number} returns setTimeout ID.
 * @example
 * //returns 2
 * addReminderTimeout('2022-05-06', '12:00:00', {minutes: 10, hours: 1}, () => console.log('Reminder!!!'))
 */
export const addReminderTimeout = (date, time, reminderTime, callback) => {
  const parsedEventDate = dateParser(date, time);
  const remainingTime = parsedEventDate - Date.now();

  const reminderTimeInMilliseconds = reminderTimeConvertor(reminderTime);

  const delay = remainingTime - reminderTimeInMilliseconds;

  const reminderTimerId = setTimeout(callback, delay);
  console.log(delay);

  return reminderTimerId;
};

