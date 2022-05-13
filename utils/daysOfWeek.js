import { DAYS_OF_WEEK, NUMBER_OF_WEEK_DAYS } from '../constants/index.js';

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
  const convertedDaysOfWeek = daysOfWeek.reduce((previous, current) => {
    const index = DAYS_OF_WEEK.findIndex((el) => el === current.toLowerCase());

    if (index !== -1) {
      previous.push(index);
    }

    return previous;
  }, []);

  return convertedDaysOfWeek;
};

/**
 * @description The function checks for the presence of the days of the week in the passed array.
 * @param {Array.<Srting>} daysOfWeek - array with days of the week.
 * @returns {(boolean|Error)} returns true if the array contains at least one day of the week or returns an error if otherwise.
 * @example
 * // returns true
 * isContainsDaysOfTheWeek(['Sunday', 'monday', 'TuesDay'])
 * // returns Error
 * isContainsDaysOfTheWeek('Monday')
 **/
const isContainsDaysOfTheWeek = (daysOfWeek) => {
  const result = daysOfWeek.map((day) =>
    DAYS_OF_WEEK.includes(day.toLowerCase())
  );

  if (result.includes(true)) {
    return true;
  } else {
    throw new Error('There are no days of the week in the transmitted array');
  }
};

/**
 * @description The function check the validity of the array of days of the week.
 * @param {Array.<Srting>} daysOfWeek - array with days of the week.
 * @returns {(boolean|Error)} returns true if the array is valid or returns an error if otherwise.
 * @example
 * // returns true
 * daysOfWeekValidator(['Sunday', 'Monday', 'Tuesday'])
 * // returns Error
 * daysOfWeekValidator('Monday')
 **/
export const daysOfWeekValidator = (daysOfWeek) => {
  if (
    Array.isArray(daysOfWeek) &&
    daysOfWeek.length <= NUMBER_OF_WEEK_DAYS &&
    daysOfWeek.length >= 0
  ) {
    return isContainsDaysOfTheWeek(daysOfWeek);
  } else {
    throw new Error('Invalid array of the days of week');
  }
};

window.daysOfWeekСonverter = daysOfWeekСonverter;
