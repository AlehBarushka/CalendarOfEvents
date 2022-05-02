import { reminder } from '../module/Reminder.js';
import { setTime } from './date-utils.js';
import { generateUniqId } from './generateUniqId.js';

/**
 * @description The function checks the validity of the reminder object.
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

const loop = (callback, delay, interval, reminderId) => {
  const timerId = setTimeout(() => {
    callback();

    const intervalId = setInterval(callback, interval);

    const reminders = reminder.getEvents();

    const index = reminders.findIndex((el) => el.id === reminderId);

    reminders[index].intervalId = intervalId;
    delete reminders[index].timerId;
  }, delay);

  return timerId;
};

/**
 * @description The function sets the daily interval with a certain delay.
 * @param {Function} callback - callback function that will be called at the interval.
 * @param {String} time - time in format '12:00:00'.
 * @returns {Object} returns an object with the reminder ID and the setTimout ID.
 * @example
 * // returns {reminderId: 'f9ca-1baa-c970-35b4', timerId: 12}
 * dailyLoop(() => console.log('Hello'), '12:00:00')
 **/
export const dailyLoop = (callback, time) => {
  const DAY_IN_MILLISECONDS = 86400000;

  const reminderId = generateUniqId();
  let delay;

  const timeDifference = setTime(time) - Date.now();
  const isTimeUp = timeDifference < 0;

  if (isTimeUp) {
    delay = timeDifference + DAY_IN_MILLISECONDS;
  } else {
    delay = timeDifference;
  }

  const timerId = loop(callback, delay, DAY_IN_MILLISECONDS, reminderId);

  return { timerId, reminderId };
};

