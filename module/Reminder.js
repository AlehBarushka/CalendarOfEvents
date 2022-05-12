import { reminderTimeValidator } from '../utils/date.js';
import { addReminderTimeout } from '../utils/reminder.js';
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

        const reminderTimerId = addReminderTimeout(date, time, callback);

        events[index].reminderTimerId = reminderTimerId;

        return 'Added successfully!';
      } else {
        throw new Error('Event not found');
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * @description The method adds reminder (a callback function) to all events that are called before the events occur.
   * @param {Function} callback - the callback function that will be called before the event occurs.
   * @param {ReminderTime} reminderTime - reminder time obj.
   * @returns {String} returns string 'Added successfully!'.
   * @example addReminderForAllEvents(() => console.log('Happy Birthday'), {hours: 1, minutes: 30})
   */
  addReminderForAllEvents(callback, reminderTime) {
    try {
      if (!callback) {
        throw new Error('Callback parameter is required');
      }

      reminderTimeValidator(reminderTime);

      const events = this.getEvents();

      if (events.length === 0) {
        return 'There are no objects with events';
      }

      if (events.length > 0) {
        events.forEach((event) => {
          const { date, time } = event;

          const reminderTimerId = addReminderTimeout(
            date,
            time,
            reminderTime,
            callback
          );

          event.reminderTimerId = reminderTimerId;
        });
      }

      return 'Added successfully!';
    } catch (error) {
      return error;
    }
  }
}

const reminder = new Reminder();
window.reminder = reminder;
