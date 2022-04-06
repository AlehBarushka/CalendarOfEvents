/**
 * @exports Calendar
 */

const Calendar = {
	/**
	 * Array of event objects
	 * @member
	 * @type {array}
	 *
	 */
	events: [],
	/**
	 * The method adds an event on a specific date and adds a callback function that will be called when the specified date in the event occurs
	 * @method addEvent
	 * @param {object} event
	 * Object of event
	 * @param {number} event.id
	 * Id of event
	 * @param {string} event.title
	 * Title of event
	 * @param {string} event.startTime
	 * Date of the event in the format "2022-04-06T12:00:00"
	 * @param {function} callback
	 * Callback function that will be called when the specified date in the event occurs
	 * @example
	 * addEvent({id: 1, title: 'birthday',startTime: '2022-04-06T12:00:00',}, () => { console.log('Happy Birthday') })
	 *
	 */
	addEvent(event, callback) {
		try {
			if (event?.id && event?.startTime && callback) {
				const timerId = setTimeout(
					callback,
					new Date(event.startTime).getTime() - Date.now()
				);
				const eventObj = { ...event, timerId };
				this.events.push(eventObj);
			} else {
				throw new Error(
					'event and callback parameters are required, and event must contain at least id and startTime'
				);
			}
		} catch (error) {
			console.log(error.message);
		}
	},

	/**
	 * The method deletes the event
	 * @method deleteEvent
	 * @param {object} event
	 * Object of event in Array "events"
	 * @param {number} event.id
	 * Id of event
	 * @param {string} event.title
	 * Title of event
	 * @param {string} event.startTime
	 * Date of the event in the format "2022-04-06T12:00:00"
	 * @param {number} event.timerId
	 * Id of timeout
	 * @example
	 * addEvent({id: 1, title: 'birthday', startTime: '2022-04-06T12:00:00', timerId: 1})
	 *
	 */
	deleteEvent(event) {
		try {
			if (event?.id && event?.timerId) {
				const index = this.events.findIndex((el) => el.id === event.id);
				if (index !== -1) {
					this.events.splice(index, 1);
				}
				clearTimeout(event.timerId);
			} else {
				throw new Error(
					'event parameter are required and must contain at least id and timeId'
				);
			}
		} catch (error) {
			console.log(error.message);
		}
	},
};

