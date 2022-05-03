import { reminder } from '../module/Reminder.js';
import { getCurrentWeekDay, setTime } from './date-utils.js';
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

/**
 * @description The function sets the timeout and interval.
 * @param {Function} callback - callback function that will be called at the interval.
 * @param {Number} delay - setTimeout delay in millliseconds.
 * @param {Number} interval - setInterval delay in millliseconds.
 * @param {String} reminderId - reminder ID.
 * @returns {Number} returns setTimout ID.
 * @example
 * // returns 12
 * loop(() => console.log('Hello'), 10000, 86400000, 'f9ca-1baa-c970-35b4')
 **/
const loop = (callback, delay, interval, reminderId) => {
  const timerId = setTimeout(() => {
    callback();

    const intervalId = setInterval(callback, interval);

    const reminders = reminder.getEvents();

    const index = reminders.findIndex((el) => el.id === reminderId);

    reminders[index].intervalIDs.push(intervalId);
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

  let delay;

  const reminderId = generateUniqId();

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

/**
 * @description The function sets the interval for the specified days of the week with a certain delay.
 * @param {Function} callback - callback function that will be called at the interval.
 * @param {String} time - time in format '12:00:00'.
 * @param {Array.<Srting>} daysOfWeek - array with days of the week.
 * @returns {Object} returns an object with the reminder ID and an array with setTimeout IDs.
 * @example
 * // returns {reminderId: 'f9ca-1baa-c970-35b4', timerIDs: [12, 13]}
 * dailyLoop(() => console.log('Hello'), '12:00:00', ['Monday', 'Tuesday'])
 **/
export const daysOfWeekLoop = (callback, time, daysOfweek) => {
  const WEEK_IN_MILLISECONDS = 604800000;
  const DAY_IN_MILLISEC = 86400000;
  const NUMBER_OF_WEEK_DAYS = 7;

  let timerIDs = [];

  const reminderId = generateUniqId();

  const timeDifference = setTime(time) - Date.now();

  daysOfweek.forEach((day) => {
    const daysOfWeekDifference = getCurrentWeekDay() - day;
    const isTimeUp = timeDifference < 0;

    const willBeNextWeek =
      daysOfWeekDifference > 0 || (isTimeUp && daysOfWeekDifference === 0);

    if (willBeNextWeek) {
      const delay =
        timeDifference +
        (NUMBER_OF_WEEK_DAYS - daysOfWeekDifference) * DAY_IN_MILLISEC;

      const timerId = loop(callback, delay, WEEK_IN_MILLISECONDS);

      timerIDs.push(timerId);
    }

    if (!willBeNextWeek) {
      const delay = timeDifference - daysOfWeekDifference * DAY_IN_MILLISEC;

      const timerId = loop(callback, delay, WEEK_IN_MILLISECONDS);

      timerIDs.push(timerId);
    }
  });

  return { reminderId, timerIDs };
};

