const currentDate = Date.now();

export const Calendar = {
	events: [],
	addEvent(event) {
		const timerId = setTimeout(event.callback, event.startTime - currentDate);
		const eventObj = { ...event, timerId };
		this.events.push(eventObj);
	},
	deleteEvent(event) {
		const index = this.events.findIndex((el) => el.id === event.id);
		if (index !== -1) {
			this.events.splice(index, 1);
		}
		clearTimeout(event.timerId);
	},
};

