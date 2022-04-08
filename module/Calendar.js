export class Calendar {
	_events = [];

	/**
	 * The method adds a new event object to the array
	 * @private
	 * @method _setEvent
	 * @param {object} event - object of event
	 *
	 */
	_setEvent(event) {
		this._events.push(event);
	}

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
	_addEventValidator(event) {
		if (event?.date && event?.time) {
			return event;
		} else {
			throw new Error('Invalid Event');
		}
	}

	/**
	 * The method checks the validity of the event object to use it in the deleteEvent method
	 * @private
	 * @method _deleteEventValidator
	 * @param {object} event
	 * Object of event
	 * @returns {object}
	 * Returns an object with fields date, time, id, timerId at least if event is valid
	 */
	_deleteUpdateEventValidator(event) {
		if (event?.id && event?.timerId && event?.date && event?.time) {
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
	 * Valid object of event
	 * @returns {string}
	 * Returns string of event date in format: '2022-04-06T18:24:00'
	 */
	_dateValidator(event) {
		const eventDate = event.date + 'T' + event.time;
		if (isNaN(Date.parse(eventDate))) {
			throw new Error('Incorrect date format');
		}

		if (Date.parse(eventDate) < Date.now()) {
			throw new Error('The event can not be in the past');
		}
		return eventDate;
	}

	/**
	 * The method return array with objects of events
	 * @method getAllEvents
	 * @returns {array}
	 * Array with objects of events
	 */
	getAllEvents() {
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
			const validatedEvent = this._addEventValidator(event);
			const validatedDate = this._dateValidator(validatedEvent);
			const timerId = setTimeout(
				callback,
				new Date(validatedDate).getTime() - Date.now()
			);
			const eventObj = { id: this._getId(), ...validatedEvent, timerId };
			this._setEvent(eventObj);
		} catch (error) {
			console.log(error.message);
		}
	}

	/**
	 * The method deletes the event
	 * @method deleteEvent
	 * @param {object} event
	 * Object of event in Array "events"
	 * @param {string} event.id
	 * Id of event
	 * @param {string} event.title
	 * Title of event
	 * @param {string} event.time
	 * Time of the event in the format "12:00:00"
	 * @param {string} event.date
	 * Date of the event in the format "2022-04-06"
	 * @param {number} event.timerId
	 * Id of timeout
	 * @example
	 * addEvent({ id: 'f9ca-1baa-c970-35b4', title: 'birthday', date: '2022-04-06', time: '18:24:00', timerId: 25 })
	 */
	deleteEvent(event) {
		try {
			const validatedEvent = this._deleteUpdateEventValidator(event);
			const index = this.getAllEvents().findIndex(
				(el) => el.id === validatedEvent.id
			);
			if (index !== -1) {
				this.events.splice(index, 1);
			} else {
				throw new Error('Event not found');
			}
			clearTimeout(validatedEvent.timerId);
		} catch (error) {
			console.log(error.message);
		}
	}
}

const calendar = new Calendar();

const eventSampleForAdd = {
	title: 'Birthday',
	date: '2022-04-07',
	time: '17:46:00',
};
const eventSampleForDelete = {
	title: 'Birthday',
	date: '2022-04-07',
	time: '17:46:00',
	id: 'asfdf',
	timerId: 1,
};

const callbackSample = () => console.log('Happy Birthday');

