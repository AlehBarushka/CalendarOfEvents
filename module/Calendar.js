/**
 * @typedef {object} event
 * @property {string} event.date - date in format '2022-04-06'.
 * @property {string} event.time - time in format '12:00:00'.
 * @property {string} event.title - title of event.
 */

class Calendar {
  _events = [];

  /**
   * @description The method generates and returns a uniqId.
   * @returns {string} unique Id
   **/
  _generateUniqId() {
    const generateRandomString = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return (
      generateRandomString() +
      '-' +
      generateRandomString() +
      '-' +
      generateRandomString() +
      '-' +
      generateRandomString()
    );
  }

  /**
   * @description The method checks the validity of the event object to use it in the addEvent method.
   * @param {event} event - event object.
   * @returns {object} returns an object with fields date, time and title if event is valid.
   */
  _eventValidator(event) {
    if (event?.date && event?.time && event?.title) {
      return event;
    } else {
      throw new Error('Invalid Event');
    }
  }

  /**
   * @description The method checks the validity of the event date.
   * @param {string} date - date in format '2022-04-06'.
   * @param {string} time - time in format '12:00:00'.
   * @returns {string} returns string of event date in format: '2022-04-06T18:24:00'.
   */
  _dateValidator(date, time) {
    const eventDate = date + 'T' + time;
    const parsedDate = Date.parse(eventDate);

    if (Number.isNaN(parsedDate)) {
      throw new Error('Incorrect date format');
    }

    if (parsedDate < Date.now()) {
      throw new Error('The event can not be in the past');
    }

    return eventDate;
  }

  /**
   * @description The method returns array of events objects
   * @returns {array} returns array of events objects.
   */
  getEvents() {
    return this._events;
  }

  /**
   * @description The method adds an event on a specific date and adds a callback function that will be called when the specified date in the event occurs.
   * @param {event} event - event object.
   * @param {function} callback - callback function that will be called when the specified date in the event occurs.
   * @returns {string} returns string 'Added successfully!'.
   * @example addEvent({ title: 'birthday', date: '2022-04-06', time: '18:24:00'}, () => { console.log('Happy Birthday') })
   */
  addEvent(event, callback) {
    try {
      if (!callback) {
        throw new Error('Callback parameter is required');
      }

      const { title, date, time } = this._eventValidator(event);
      const validatedDate = this._dateValidator(date, time);
      const delay = new Date(validatedDate).getTime() - Date.now();
      const timerId = setTimeout(() => callback, delay);

      const eventObj = {
        id: this._generateUniqId(),
        title,
        date,
        time,
        timerId,
        callback,
      };

      this._events.push(eventObj);

      return 'Added successfully!';
    } catch (error) {
      return error;
    }
  }

  /**
   * @description The method deletes the event.
   * @param {string} id - id of an existing event.
   * @returns {string} returns string 'Deleted successfully!'.
   * @example deleteEvent('f9ca-1baa-c970-35b4')
   */
  deleteEvent(id) {
    try {
      const events = this._events;
      const index = events.findIndex((el) => el.id === id);

      if (index !== -1) {
        clearTimeout(events[index].timerId);
        events.splice(index, 1);
      } else {
        throw new Error('Event not found');
      }

      return 'Deleted successfully!';
    } catch (error) {
      return error;
    }
  }

  /**
   * @description The method updates the event
   * @param {string} id - id of an existing event.
   * @param {event} nextEvent - updated object of event.
   * @param {function} [nextCallback] - updated callback function that will be called when the specified date in the event occurs.
   * @returns {string} returns string 'Updated successfully!'.
   * @example updateEvent('f9ca-1baa-c970-35b4', { title: 'birthday', date: '2022-04-06', time: '18:24:00'}, () => { console.log('Happy Birthday') })
   */
  updateEvent(id, nextEvent, nextCallback) {
    try {
      const { title, date, time } = this._eventValidator(nextEvent);
      const validatedDate = this._dateValidator(date, time);
      const events = this._events;
      const delay = new Date(validatedDate).getTime() - Date.now();
      const index = events.findIndex((el) => el.id === id);

      if (index !== -1) {
        let callback;
        const prevDate = events[index].date + 'T' + events[index].time;

        !nextCallback
          ? (callback = events[index].callback)
          : (callback = nextCallback);

        if (Date.parse(validatedDate) !== Date.parse(prevDate)) {
          clearTimeout(events[index].timerId);
          const timerId = setTimeout(() => callback, delay);
          events[index] = {
            ...events[index],
            title,
            date,
            time,
            timerId,
            callback,
          };
        } else {
          events[index] = {
            ...events[index],
            title,
            callback,
          };
        }

        return 'Updated successfully!';
      } else {
        throw new Error('Event not found!');
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * @description The method returns array with events objects in the specified date range.
   * @param {string} dateRange1 - date in format '2022-04-06'.
   * @param {string} dateRange2 - date in format '2023-04-06'.
   * @returns {array} returns array of events objects in the specified date range.
   * @example getEventsForPeriod('2022-10-10', '2022-10-20').
   */
  getEventsForPeriod(dateRange1, dateRange2) {
    try {
      if (!dateRange1 && !dateRange2) {
        throw new Error('Date range is required!');
      }

      if (
        Number.isNaN(Date.parse(dateRange1)) &&
        Number.isNaN(Date.parse(dateRange2))
      ) {
        throw new Error('Incorrect date format!');
      }

      const parsedDateRange1 = Date.parse(dateRange1);
      const parsedDateRange2 = Date.parse(dateRange2);

      const events = this._events.filter((event) => {
        const parsedDate = Date.parse(event.date);

        return (
          (parsedDate >= parsedDateRange1 && parsedDate <= parsedDateRange2) ||
          (parsedDate >= parsedDateRange2 && parsedDate <= parsedDateRange1)
        );
      });

      if (events.length) {
        return events;
      } else {
        return 'There are no events for the specified period!';
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * @description The method return object with event in the specified date.
   * @param {string} date - date in format '2022-04-06'.
   * @returns {array} returns array of events objects in the specified date.
   * @example getEventForDay('2022-10-10')
   */
  getEventForDay(date) {
    try {
      if (!date) {
        throw new Error('Date is required!');
      }

      const parsedDate = Date.parse(date);

      if (Number.isNaN(parsedDate)) {
        throw new Error('Incorrect date format!');
      }

      const events = this._events.filter((event) => {
        return Date.parse(event.date) === parsedDate;
      });

      if (events.length) {
        return events;
      } else {
        return 'There are no events for the specified period!';
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * @description The method return array with events objects in the specified month.
   * @param {string|number} month - number of month.
   * @param {string|number} [year] - number of year.
   * @returns {array} returns array of events objects in the specified month.
   * @example
   * getEventForDay('04', '2022')
   * getEventForDay(4, 2022)
   * getEventForDay(4)
   */
  getEventForMonth(month, year = new Date().getFullYear()) {
    try {
      const dateRange1 = year + '-' + month;

      if (!month) {
        throw new Error('Month is required!');
      }

      if (Number.isNaN(Date.parse(dateRange1))) {
        throw new Error('Incorrect date format!');
      }

      const nextMonth = (month) => {
        const nextMonthNumber = parseInt(month) + 1;

        if (nextMonthNumber < 10) {
          return '0' + nextMonthNumber;
        }

        if (nextMonthNumber === 12) {
          return '01';
        } else {
          return nextMonthNumber + 1;
        }
      };

      const nextYear = (year = new Date().getFullYear()) => {
        if (nextMonth(month) === '01') {
          return (parseInt(year) + 1).toString();
        } else {
          return year.toString();
        }
      };

      const dateRange2 = nextYear(year) + '-' + nextMonth(month);
      const parsedDateRange1 = Date.parse(dateRange1);
      const parsedDateRange2 = Date.parse(dateRange2);

      const events = this._events.filter((event) => {
        const parsedDate = Date.parse(event.date);
        return parsedDate >= parsedDateRange1 && parsedDate < parsedDateRange2;
      });

      if (events.length) {
        return events;
      } else {
        return 'There are no events for the specified period!';
      }
    } catch (error) {
      return error;
    }
  }
}

const calendar = new Calendar();
