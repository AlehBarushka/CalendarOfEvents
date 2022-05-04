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

