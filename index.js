import { Calendar } from './module/Calendar.js';

//event time in miliseconds
const eventTime = 1649167950000;

const eventObj1 = {
	id: 1,
	title: 'birthday',
	callback() {
		console.log('Congratulations!!!!!!');
	},
	startTime: eventTime,
};

Calendar.addEvent(eventObj1);

