import { timeValidator } from '../utils/date-utils.js';
import {
  daysOfWeekValidator,
  daysOfWeekСonverter,
} from '../utils/daysOfWeek-utils.js';
import {
  dailyLoop,
  daysOfWeekLoop,
  recurringEventValidator,
} from '../utils/recurringEvent-utils.js';

import { Calendar } from './Calendar.js';

/**
 * @typedef {Object} RecurringEvent
 * @property {string} RecurringEvent.time - time of recurring event in format '12:00:00'.
 * @property {string} RecurringEvent.title - title of recurring event.
 */

export class RecurringEvent extends Calendar {
  /**
   * @description The method adds an event for the specified time, repeated every day or on days of the week.
   * @param {RecurringEvent} event - event object.
   * @param {function} callback - callback function that will be called every day or on the specified days of the week.
   * @param {Array.<String>} [daysOfWeek] - array with days of the week for which to repeat.
   * @returns {string} returns string 'Added successfully!'.
   * @example
   * addRecurringEvent({ title: 'meeting', time: '12:00:00'}, () => { console.log('Meeting will start at 12:30:00') })
   */
  addRecurringEvent(event, callback, daysOfWeek = []) {
    try {
      recurringEventValidator(event);

      const { time, title } = event;

      timeValidator(time);

      if (!callback) {
        throw new Error('Callback arg is required');
      }

      daysOfWeekValidator(daysOfWeek);

      if (daysOfWeek.length === 0) {
        const { eventId, timerId } = dailyLoop(callback, time);

        const recurringEventObj = {
          id: eventId,
          timerIDs: [timerId],
          intervalIDs: [],
          title,
          time,
          repeat: 'Daily',
          callback,
        };

        this._events.push(recurringEventObj);
      }

      if (daysOfWeek.length > 0) {
        const days = daysOfWeekСonverter(daysOfWeek);

        const { eventId, timerIDs } = daysOfWeekLoop(callback, time, days);

        const recurringEventObj = {
          id: eventId,
          timerIDs: [...timerIDs],
          intervalIDs: [],
          title,
          time,
          repeat: daysOfWeek,
          callback,
        };

        this._events.push(recurringEventObj);
      }

      return 'Added successfully!';
    } catch (error) {
      return error;
    }
  }
}
