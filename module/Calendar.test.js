import { Calendar } from './Calendar';

let _ = new Calendar();
let sampleObj = {
	title: 'Birthday',
	date: '2022-04-07',
	time: '17:46:00',
	id: 'asfdf',
	timerId: 1,
};
_._events.push(sampleObj);

describe('Calendar: getAllEvents', () => {
	test('should be defined', () => {
		expect(_.getAllEvents()).toBeDefined();
	});
	test('should has length', () => {
		expect(_.getAllEvents()).toHaveLength(1);
	});
	test('should has length', () => {
		const result = [
			{
				title: 'Birthday',
				date: '2022-04-07',
				time: '17:46:00',
				id: 'asfdf',
				timerId: 1,
			},
		];
		expect(_.getAllEvents()).toEqual(result);
	});
});

