import {
  dateParser,
  reminderTimeConvertor,
  reminderTimeValidator,
} from '../utils/date-utils.js';
import { Calendar } from './Calendar.js';

/**
 * @typedef {Object} ReminderTime
 * @property {Number} ReminderTime.hours - number of hours.
 * @property {Number} ReminderTime.minutes - number of minutes.
 */

class Reminder extends Calendar {
  /**
   * @description The method adds a reminder (callback function) to an existing event, which is called before the event occurs.
   * @param {String} id - id of event.
   * @param {Function} callback - the callback function that will be called before the event occurs.
   * @param {ReminderTime} reminderTime - reminder time obj.
   * @returns {String} returns string 'Added successfully!'.
   * @example addReminder('f9ca-1baa-c970-35b4', () => console.log('Happy Birthday'), {hours: 1, minutes: 20})
   */
  addReminder(id, callback, reminderTime) {
    try {
      if (!callback) {
        throw new Error('Callback parameter is required');
      }

      reminderTimeValidator(reminderTime);

      const events = this.getEvents();
      const index = events.findIndex((el) => el.id === id);

      if (index !== -1) {
        const { date, time } = events[index];

        const parsedEventDate = dateParser(date, time);
        const remainingTime = parsedEventDate - Date.now();

        const reminderTimeInMilliseconds = reminderTimeConvertor(reminderTime);

        const delay = remainingTime - reminderTimeInMilliseconds;

        const reminderTimerId = setTimeout(callback, delay);

        events[index].reminderTimerId = reminderTimerId;

        return 'Added successfully!';
      } else {
        throw new Error('Event not found');
      }
    } catch (error) {
      return error;
    }
  }
}

const reminder = new Reminder();
window.reminder = reminder;
