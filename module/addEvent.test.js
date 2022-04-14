import { Calendar } from './Calendar';

jest.useFakeTimers();

let _ = new Calendar();

const validEventSample = {
	title: 'Birthday',
	date: '2022-06-07',
	time: '17:46:00',
};

const invalidEventSample = {
	title: 'Birthday',
	time: '17:46:00',
};

const validEventSampleWithInvalidDate = {
	title: 'Birthday',
	date: '20220607',
	time: '17:4600',
};

const validEventSampleWithElapsedDate = {
	title: 'Birthday',
	date: '20220607',
	time: '17:4600',
};
const callbackSample = () => console.log('Happy Birthday');

describe('Calendar: addEvent', () => {
	test('should be defined', () => {
		expect(_.addEvent(callbackSample)).toBeDefined();
		expect(_.addEvent()).toBeDefined();
		expect(_.addEvent(validEventSample)).toBeDefined();
	});

	test('should throw an error if called without event arg', () => {
		try {
			_.addEvent(_, callbackSample);
		} catch (error) {
			expect(error.message).toEqual('Event parameter is required');
		}
	});

	test('should throw an error if called without callback arg', () => {
		try {
			_.addEvent(validEventSample);
		} catch (error) {
			expect(error.message).toEqual('Callback parameter is required');
		}
	});

	test('should throw an error if called with invalid event arg', () => {
		try {
			_.addEvent(invalidEventSample, callbackSample);
		} catch (error) {
			expect(error.message).toEqual('Invalid Event');
		}
	});

	test('should throw an error if called with invalid date format', () => {
		try {
			_.addEvent(validEventSampleWithInvalidDate, callbackSample);
		} catch (error) {
			expect(error.message).toEqual('Incorrect date format');
		}
	});

	test('should throw an error if called with an elapsed date', () => {
		try {
			_.addEvent(validEventSampleWithElapsedDate, callbackSample);
		} catch (error) {
			expect(error.message).toEqual('The event can not be in the past');
		}
	});

	test('should return a string with the status of successful execution, and events contain an array with the passed event object', () => {
		expect(_.addEvent(validEventSample, callbackSample)).toBe(
			'Added successfully!'
		);
		expect(_.getEvents()).toEqual(
			expect.arrayContaining([expect.objectContaining(validEventSample)])
		);
	});
});
