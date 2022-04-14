class Calendar {
  _events = [];

  /**
   * The method generates and returns a uniqId
   * @private
   * @method _generateUniqId
   */
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
   * The method checks the validity of the event object to use it in the addEvent method
   * @private
   * @method _addEventValidator
   * @param {object} event
   * Object of event
   * @returns {object}
   * Returns an object with fields date and time at least if event is valid
   */
  _eventValidator(event) {
    if (event?.date && event?.time && event?.title) {
      return event;
    } else {
      throw new Error('Invalid Event');
    }
  }

  /**
   * The method checks the validity of the event date
   * @private
   * @method _deleteEventValidator
   * @param {object} event
   * Object of event
   * @returns {string}
   * Returns string of event date in format: '2022-04-06T18:24:00'
   */
  _dateValidator(date, time) {
    const eventDate = date + 'T' + time;
    if (isNaN(Date.parse(eventDate))) {
      throw new Error('Incorrect date format');
    }
    if (Date.parse(eventDate) < Date.now()) {
      throw new Error('The event can not be in the past');
    }
    return eventDate;
  }

  /**
   * The method returns array of events objects
   * @method getEvents
   */
  getEvents() {
    return this._events;
  }

  /**
   * The method adds an event on a specific date and adds a callback function that will be called when the specified date in the event occurs
   * @method addEvent
   * @param {object} event
   * Object of event
   * @param {string} event.title
   * Title of event
   * @param {string} event.time
   * Time of the event in the format "12:00:00"
   * @param {string} event.date
   * Date of the event in the format "2022-04-06"
   * @param {function} callback
   * Callback function that will be called when the specified date in the event occurs
   * @example
   * addEvent({ title: 'birthday', date: '2022-04-06', time: '18:24:00'}, () => { console.log('Happy Birthday') })
   *
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
   * The method deletes the event
   * @method deleteEvent
   * @param {string} id
   * Id of an existing event
   * @example
   * deleteEvent('f9ca-1baa-c970-35b4')
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
      console.log(error.message);
    }
  }

  /**
   * The method deletes the event
   * @method updateEvent
   * @param {string} id
   * Id of an existing event
   * @param {object} nextEvent
   * Object of the new event
   * @param {string} event.title
   * Title of the new event
   * @param {string} event.time
   * Time of the new event in the format "12:00:00"
   * @param {string} event.date
   * Date of the new event in the format "2022-04-06"
   * @param {function} [nextCallback]
   * Callback function that will be called when the specified date in the event occurs
   * @example
   * updateEvent('f9ca-1baa-c970-35b4', { title: 'birthday', date: '2022-04-06', time: '18:24:00'}, () => { console.log('Happy Birthday') })
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
        if (!nextCallback) {
          callback = events[index].callback;
        } else {
          callback = nextCallback;
        }
        const prevDate = events[index].date + 'T' + events[index].time;
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
        return 'Event not found!';
      }
    } catch (error) {
      error;
    }
  }

  /**
   * The method returns array with events objects in the specified date range
   * @method getEventsForPeriod
   * @param {string} dateRange1
   * @param {string} dateRange2
   * @example
   * getEventsForPeriod('2022-10-10', '2022-10-20')
   */
  getEventsForPeriod(dateRange1, dateRange2) {
    try {
      if (!dateRange1 && !dateRange2) {
        throw new Error('Date range is required!');
      }
      if (isNaN(Date.parse(dateRange1)) && isNaN(Date.parse(dateRange2))) {
        throw new Error('Incorrect date format!');
      }
      const parsedDateRange1 = Date.parse(dateRange1);
      const parsedDateRange2 = Date.parse(dateRange2);
      const events = this._events.filter((event) => {
        return (
          (Date.parse(event.date) >= parsedDateRange1 &&
            Date.parse(event.date) <= parsedDateRange2) ||
          (Date.parse(event.date) >= parsedDateRange2 &&
            Date.parse(event.date) <= parsedDateRange1)
        );
      });
      if (events.length) {
        return events;
      } else {
        return 'There are no events for the specified period!';
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * The method return object with event in the specified date
   * @method getEventForDay
   * @param {string} date
   * @example
   * getEventForDay('2022-10-10')
   */
  getEventForDay(date) {
    try {
      if (!date) {
        throw new Error('Date is required!');
      }
      if (isNaN(Date.parse(date))) {
        throw new Error('Incorrect date format!');
      }
      const parsedDate = Date.parse(date);
      const events = this._events.filter((event) => {
        return Date.parse(event.date) === parsedDate;
      });
      if (events.length) {
        return events[0];
      } else {
        return 'There are no events for the specified period!';
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * The method return array with events objects in the specified month
   * @method getEventForMonth
   * @param {string|number} month number of month
   * @param {string|number} [year] number of year
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
      if (isNaN(Date.parse(dateRange1))) {
        throw new Error('Incorrect date format!');
      }
      const nextMonth = (month) => {
        if (parseInt(month) + 1 < 10) {
          return '0' + (parseInt(month) + 1);
        }
        if (parseInt(month) === 12) {
          return '01';
        } else {
          return parseInt(month) + 1;
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
        return (
          Date.parse(event.date) >= parsedDateRange1 &&
          Date.parse(event.date) < parsedDateRange2
        );
      });
      if (events.length) {
        return events;
      } else {
        return 'There are no events for the specified period!';
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

const calendar = new Calendar();
