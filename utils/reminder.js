import { dateParser, reminderTimeConvertor } from './date.js';

/**
 * @typedef {Object} ReminderTime
 * @property {Number} ReminderTime.hours - number of hours.
 * @property {Number} ReminderTime.minutes - number of minutes.
 */

/**
 * @typedef {Object} TimeoutData
 * @property {Function} TimeoutData.date - date of an existing event in format '2022-04-06'.
 * @property {Number} TimeoutData.time - time of an existing event in format '12:00:00'.
 * @property {ReminderTime} TimeoutData.reminderTime - object of the reminder time.
 * @property {String} TimeoutData.callback - the callback function that will be called before the event occurs.
 */

/**
 * @description The function adds settimeout with a delay for the specified period of time before the event occurs.
 * @param {TimeoutData} timeoutData - an object with data for adding setTimeout.
 * @returns {Number} returns setTimeout ID.
 * @example
 * //returns 2
 * addReminderTimeout('2022-05-06', '12:00:00', {minutes: 10, hours: 1}, () => console.log('Reminder!!!'))
 */
export const addReminderTimeout = ({ date, time, reminderTime, callback }) => {
  const parsedEventDate = dateParser(date, time);
  const remainingTime = parsedEventDate - Date.now();

  const reminderTimeInMilliseconds = reminderTimeConvertor(reminderTime);

  const delay = remainingTime - reminderTimeInMilliseconds;

  const reminderTimerId = setTimeout(callback, delay);

  return reminderTimerId;
};
