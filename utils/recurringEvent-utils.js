import {
  DAY_IN_MILLISECONDS,
  NUMBER_OF_WEEK_DAYS,
  WEEK_IN_MILLISECONDS,
} from '../constants/daysOfWeek.js';
import { recurringEvent } from '../module/RecurringEvent.js';
import { setTime } from './date-utils.js';
import { generateUniqId } from './generateUniqId.js';

/**
 * @description The function checks the validity of the recurring event object.
 * @param {Object} event - event object.
 * @param {String} event.title - title of recurring event.
 * @param {String} event.time - time of recurring event in format '12:00:00'.
 * @returns {(Boolean|Error)} returns true if the event object is valid, or returns an error if otherwise.
 * @example
 * // returns true
 * recurringEventValidator({title: 'meeting', time: '12:00:00'})
 * // returns Error
 * recurringEventValidator({title: 'meeting'})
 **/
export const recurringEventValidator = (event) => {
  if (event?.title && event.time) {
    return true;
  } else {
    throw new Error('Invalid event');
  }
};

/**
 * @description The function sets the timeout and interval.
 * @param {Function} callback - callback function that will be called at the interval.
 * @param {Number} delay - setTimeout delay in millliseconds.
 * @param {Number} interval - setInterval delay in millliseconds.
 * @param {String} eventId - recurringEvent ID.
 * @returns {Number} returns setTimout ID.
 * @example
 * // returns 12
 * loop(() => console.log('Hello'), 10000, 86400000, 'f9ca-1baa-c970-35b4')
 **/
const loop = (callback, delay, interval, eventId) => {
  const timerId = setTimeout(() => {
    callback();

    const intervalId = setInterval(callback, interval);

    const events = recurringEvent.getEvents();

    const index = reminders.findIndex((el) => el.id === eventId);

    events[index].intervalIDs.push(intervalId);
  }, delay);

  return timerId;
};

/**
 * @description The function sets the daily interval with a certain delay.
 * @param {Function} callback - callback function that will be called at the interval.
 * @param {String} time - time in format '12:00:00'.
 * @returns {Object} returns an object with the recurringEvent ID and the setTimout ID.
 * @example
 * // returns {eventId: 'f9ca-1baa-c970-35b4', timerId: 12}
 * dailyLoop(() => console.log('Hello'), '12:00:00')
 **/
export const dailyLoop = (callback, time) => {
  let delay;

  const eventId = generateUniqId();

  const timeDifference = setTime(time) - Date.now();
  const isTimeUp = timeDifference < 0;

  if (isTimeUp) {
    delay = timeDifference + DAY_IN_MILLISECONDS;
  } else {
    delay = timeDifference;
  }

  const timerId = loop(callback, delay, DAY_IN_MILLISECONDS, eventId);

  return { timerId, eventId };
};

/**
 * @description The function sets the interval for the specified days of the week with a certain delay.
 * @param {Function} callback - callback function that will be called at the interval.
 * @param {String} time - time in format '12:00:00'.
 * @param {Array.<Srting>} daysOfWeek - array with days of the week.
 * @returns {Object} returns an object with the recurringEvent ID and an array with setTimeout IDs.
 * @example
 * // returns {reminderId: 'f9ca-1baa-c970-35b4', timerIDs: [12, 13]}
 * dailyLoop(() => console.log('Hello'), '12:00:00', ['Monday', 'Tuesday'])
 **/
export const daysOfWeekLoop = (callback, time, daysOfweek) => {
  let timerIDs = [];

  const eventId = generateUniqId();

  const timeDifference = setTime(time) - Date.now();

  daysOfweek.forEach((day) => {
    const daysOfWeekDifference = new Date().getDay() - day;
    const isTimeUp = timeDifference < 0;

    const willBeNextWeek =
      daysOfWeekDifference > 0 || (isTimeUp && daysOfWeekDifference === 0);

    if (willBeNextWeek) {
      const delay =
        timeDifference +
        (NUMBER_OF_WEEK_DAYS - daysOfWeekDifference) * DAY_IN_MILLISECONDS;

      const timerId = loop(callback, delay, WEEK_IN_MILLISECONDS, eventId);

      timerIDs.push(timerId);
    }

    if (!willBeNextWeek) {
      const delay = timeDifference - daysOfWeekDifference * DAY_IN_MILLISECONDS;

      const timerId = loop(callback, delay, WEEK_IN_MILLISECONDS, eventId);

      timerIDs.push(timerId);
    }
  });

  return { eventId, timerIDs };
};
