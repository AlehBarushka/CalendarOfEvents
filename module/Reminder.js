import { setTime, timeValidator } from '../utils/dateUtils.js';
import { generateUniqId } from '../utils/generateUniqId.js';
import { dailyLoop, reminderValidator } from '../utils/reminderUtils.js';
import { Calendar } from './Calendar.js';

/**
 * @typedef {Object} Reminder
 * @property {string} reminder.time - time in format '12:00:00'.
 * @property {string} reminder.title - title of reminder.
 */

class Reminder extends Calendar {
  /**
   * @description The method adds a reminder for the specified time by repeating every day, by day of the week.
   * @param {Reminder} reminder - reminder object.
   * @param {function} callback - callback function that will be called every day or on the specified days of the week.
   * @param {Array.<String>} [weekdays] - array with the weekdays for which to repeat.
   * @returns {string} returns string 'Added successfully!'.
   * @example
   * addRepeatingReminder({ title: 'meeting', time: '12:00:00'}, () => { console.log('Meeting will start at 12:30:00') })
   */
  addRepeatingReminder(reminder, callback, weekdays = []) {
    try {
      reminderValidator(reminder);

      const { time, title } = reminder;

      timeValidator(time);

      if (weekdays.length === 0) {
        const { reminderId, timerId } = dailyLoop(callback, time);

        const reminderObj = {
          id: reminderId,
          timerId,
          title,
          time,
          repeat: weekdays,
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

