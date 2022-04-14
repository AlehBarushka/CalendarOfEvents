import { Calendar } from './Calendar';

let _ = new Calendar();

jest.useFakeTimers();

const validEventSample = {
	title: 'Birthday',
	date: '2022-06-07',
	time: '17:46:00',
};
const callbackSample = () => console.log('Happy Birthday');
const nonexistId = 'id';

beforeAll(() => {
	_.addEvent(validEventSample, callbackSample);
});

describe('Calendar: deleteEvent', () => {
	test('should throw an error if called without an arg', () => {
		expect(_.deleteEvent()).toEqual(new Error('Id is required'));
	});

	test('should return a string "Event not found"', () => {
		expect(_.deleteEvent(nonexistId)).toBe('Event not found');
	});

	test('should return a string with a successful status and the events array should be empty', () => {
		const getValidId = () => {
			return _.getEvents()[0].id;
		};
		expect(_.deleteEvent(getValidId())).toBe('Deleted successfully!');
		expect(_.getEvents()).toEqual([]);
	});
});

