import { reminder } from '../module/Reminder.js';
import { setTime } from './dateUtils.js';
import { generateUniqId } from './generateUniqId.js';

/**
 * @description The method checks the validity of the reminder object.
 * @param {Object} reminder - reminder object.
 * @param {String} reminder.title - title of reminder.
 * @param {String} reminder.time - time of reminder in format '12:00:00'.
 * @returns {(Boolean|Error)} returns true if the reminder object is valid, or returns an error if otherwise.
 * @example
 * // returns true
 * reminderValidator({title: 'meeting', time: '12:00:00'})
 * // returns Error
 * reminderValidator({title: 'meeting'})
 **/

export const reminderValidator = (reminder) => {
  if (reminder?.title && reminder.time) {
    return true;
  } else {
    throw new Error('Invalid reminder');
  }
};

/**
 * @description The method repeats the callback function every day.
 * @param {Function} callback - callback function that will be called at the interval.
 * @param {string} time - time in format '12:00:00'.
 * @returns {Object} returns an object with the reminder ID and the setTimout ID.
 * @example
 * // returns {reminderId: 'f9ca-1baa-c970-35b4', timerId: 12}
 * dailyLoop(() => console.log('Hello'), '12:00:00')
 **/
export const dailyLoop = (callback, time) => {
  const DAY_IN_MILLISECONDS = 86400000;

  const reminderId = generateUniqId();

  const delay = setTime(time) - Date.now();

  const timerId = setTimeout(() => {
    callback();
    const intervalId = setInterval(callback, DAY_IN_MILLISECONDS);

    const reminders = reminder.getEvents();

    const index = reminders.findIndex((el) => el.id === reminderId);

    reminders[index] = { ...reminders[index], timerId: intervalId };
  }, delay);

  return { reminderId, timerId };
};

