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
	date: '2020-10-10',
	time: '17:46:00',
};
const callbackSample = () => console.log('Happy Birthday');

describe('Calendar: addEvent', () => {
	test('should be defined', () => {
		expect(_.addEvent(callbackSample)).toBeDefined();
		expect(_.addEvent()).toBeDefined();
		expect(_.addEvent(validEventSample)).toBeDefined();
	});

	test('should throw an error if called without callback arg', () => {
		expect(_.addEvent(validEventSample)).toEqual(
			new Error('Callback parameter is required')
		);
	});

	test('should throw an error if called with invalid event arg', () => {
		expect(_.addEvent(invalidEventSample, callbackSample)).toEqual(
			new Error('Invalid Event')
		);
	});

	test('should throw an error if called with invalid date format', () => {
		expect(_.addEvent(validEventSampleWithInvalidDate, callbackSample)).toEqual(
			new Error('Incorrect date format')
		);
	});

	test('should throw an error if called with an elapsed date', () => {
		expect(_.addEvent(validEventSampleWithElapsedDate, callbackSample)).toEqual(
			new Error('The event can not be in the past')
		);
	});

	test('should return a string with the status of successful execution, and aray of events contain with the passed event object', () => {
		expect(_.addEvent(validEventSample, callbackSample)).toBe(
			'Added successfully!'
		);
		expect(_.getEvents()).toEqual(
			expect.arrayContaining([expect.objectContaining(validEventSample)])
		);
	});
});
