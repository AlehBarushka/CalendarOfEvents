import { days } from '../constants/daysOfWeek.js';

/**
 * @description The function returns an array with the days of the week in numerical representation.
 * @param {Array.<Srting>} daysOfWeek - array with days of the week.
 * @returns {Array.<Number>} returns an array with the days of the week in numerical representation.
 * @example
 * // returns [0, 1, 2]
 * daysOfWeekСonverter(['Sunday', 'Monday', 'Tuesday'])
 * // returns [1, 2, 0]
 * daysOfWeekСonverter(['Monday', 'Tuesday', 'Sunday'])
 **/
export const daysOfWeekСonverter = (daysOfWeek) => {
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
 * arrayValidator(['Sunday', 'Monday', 'Tuesday'])
 * // returns Error
 * arrayValidator('Monday')
 **/
export const arrayValidator = (daysOfWeek) => {
  if (
    Array.isArray(daysOfWeek) &&
    daysOfWeek.length <= 7 &&
    daysOfWeek.length > 0
  ) {
    return true;
  } else {
    throw new Error('Invalid days of week');
  }
};
