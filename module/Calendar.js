class Calendar {
	_events = [];

	/**
	 * The method generates a random string
	 * @private
	 * @method _getId
	 * @returns {string}
	 * random string
	 */
	_getId() {
		const s4 = () => {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		};
		return s4() + '-' + s4() + '-' + s4() + '-' + s4();
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
		if (event?.date && event?.time) {
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
			const validatedEvent = this._eventValidator(event);
			const validatedDate = this._dateValidator(event.date, event.time);
			const timerId = setTimeout(
				callback,
				new Date(validatedDate).getTime() - Date.now()
			);
			const eventObj = {
				id: this._getId(),
				...validatedEvent,
				timerId,
				callback,
			};
			this._events.push(eventObj);
			return 'Added successfully!';
		} catch (error) {
			console.log(error.message);
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
	 * @param {string} [event.title
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
			const validatedEvent = this._eventValidator(nextEvent);
			const validatedDate = this._dateValidator(nextEvent.date, nextEvent.time);
			const events = this._events;
			const index = events.findIndex((el) => el.id === id);
			if (index !== -1) {
				let callback;
				if (!nextCallback) {
					callback = events[index].callback;
				} else {
					callback = nextCallback;
				}
				const date = events[index].date + 'T' + events[index].time;
				if (Date.parse(validatedDate) !== Date.parse(date)) {
					clearTimeout(events[index].timerId);
					const timerId = setTimeout(
						callback,
						new Date(validatedDate).getTime() - Date.now()
					);
					console.log(callback);
					events[index] = {
						...events[index],
						...validatedEvent,
						timerId,
						callback,
					};
				}
				events[index] = {
					...events[index],
					...validatedEvent,
					callback,
				};
				return 'Updated successfully!';
			} else {
				throw new Error('Event not found!');
			}
		} catch (error) {
			console.log(error.message);
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
			if (events) {
				return events;
			}
			return 'There are no events for the specified period!';
		} catch (error) {
			console.log(error.message);
		}
	}
}

const calendar = new Calendar();

