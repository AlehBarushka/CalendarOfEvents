import { timeValidator } from '../utils/date-utils.js';
import { daysOfWeekСonverter } from '../utils/daysOfWeek-utils.js';
import {
  dailyLoop,
  daysOfWeekLoop,
  reminderValidator,
} from '../utils/reminder-utils.js';
import { Calendar } from './Calendar.js';

/**
 * @typedef {Object} Reminder
 * @property {string} reminder.time - time in format '12:00:00'.
 * @property {string} reminder.title - title of reminder.
 */

class Reminder extends Calendar {
  /**
   * @description The method adds a reminder for the specified time, repeating every day or by days of the week.
   * @param {Reminder} reminder - reminder object.
   * @param {function} callback - callback function that will be called every day or on the specified days of the week.
   * @param {Array.<String>} [daysOfWeek] - array with days of the week for which to repeat.
   * @returns {string} returns string 'Added successfully!'.
   * @example
   * addRepeatingReminder({ title: 'meeting', time: '12:00:00'}, () => { console.log('Meeting will start at 12:30:00') })
   */
  addReminder(reminder, callback, daysOfWeek = []) {
    try {
      reminderValidator(reminder);

      const { time, title } = reminder;

      timeValidator(time);

      if (daysOfWeek.length === 0) {
        const { reminderId, timerId } = dailyLoop(callback, time);

        const reminderObj = {
          id: reminderId,
          timerIDs: [timerId],
          intervalIDs: [],
          title,
          time,
          repeat: 'Daily',
          callback,
        };

        this._events.push(reminderObj);
      }

      if (daysOfWeek.length > 0) {
        const days = daysOfWeekСonverter(daysOfWeek);

        const { reminderId, timerIDs } = daysOfWeekLoop(callback, time, days);

        const reminderObj = {
          id: reminderId,
          timerIDs: [...timerIDs],
          intervalIDs: [],
          title,
          time,
          repeat: daysOfWeek,
          callback,
        };

        this._events.push(reminderObj);
      }

      return 'Added successfully!';
    } catch (error) {
      return error;
    }
  }
}

export const reminder = new Reminder();
window.reminder = reminder;

