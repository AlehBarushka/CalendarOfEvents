/**
 * @description The function returns an array with the days of the week in numerical representation.
 * @param {Array.<Srting>} daysOfWeek - array with days of the week.
 * @returns {Array.<Number>} returns an array with the days of the week in numerical representation.
 * @example
 * // returns [0, 1, 2]
 * reminderValidator(['Sunday', 'Monday', 'Tuesday'])
 * // returns [1, 2, 0]
 * reminderValidator(['Monday', 'Tuesday', 'Sunday'])
 **/
export const daysOfWeekСonverter = (daysOfWeek) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let arrOfDayNumbers = [];

  daysOfWeek.forEach((day) => {
    const index = days.findIndex((el) => el === day);
    if (index !== -1) {
      arrOfDayNumbers.push(index);
    }
  });

  return arrOfDayNumbers;
};

/**
 * @description The function check the validity of the array.
 * @param {Array.<Srting>} daysOfWeek - array with days of the week.
 * @returns {(boolean|Error)} returns true if the array is valid or returns an error if otherwise.
 * @example
 * // returns true
 * daysOfWeekValidator(['Sunday', 'Monday', 'Tuesday'])
 * // returns Error
 * daysOfWeekValidator('Monday')
 **/
export const daysOfWeekValidator = (daysOfWeek) => {
  if (Array.isArray(daysOfWeek)) {
    return true;
  } else {
    throw new Error('Invalid days of week');
  }
};

