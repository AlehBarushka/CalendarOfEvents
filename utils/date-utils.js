/**
 * @typedef {Object} ReminderTime
 * @property {Number} ReminderTime.hours - number of hours.
 * @property {Number} ReminderTime.minutes - number of minutes.
 */

/**
 * @description The function converts the time and date into milliseconds.
 * @param {String} date - date in format '2022-04-06'.
 * @param {String} time - time in format '12:00:00'.
 * @returns {Number} returns the date in milliseconds since January 1, 1970, 00:00:00 UTC.
 * @example
 * //returns 1660035600000
 * dateParser('2022-04-06', '18:24:00')
 *
 */
export const dateParser = (date, time) => {
  const eventDate = date + 'T' + time;

  const parsedDate = Date.parse(eventDate);

  return parsedDate;
};

/**
 * @description The function checks the validity of the reminder time object.
 * @param {ReminderTime} reminderTime - object of the reminder time.
 * @returns {(Boolean|Error)} returns true if the object is valid, or returns an error if otherwise.
 * @example
 * //returns true
 * reminderTimeObjValidator({hours: 12})
 * //returns true
 * reminderTimeObjValidator({minutes: 10, hours: 1})
 * //returns Error
 * reminderTimeObjValidator({})
 */
export const reminderTimeObjValidator = (reminderTime) => {
  if (reminderTime?.hours || reminderTime?.minutes) {
    return true;
  } else {
    throw new Error('Invalid reminder time object');
  }
};

