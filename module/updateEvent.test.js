import { Calendar } from './Calendar';

jest.useFakeTimers();

let _ = new Calendar();

const validEventSample = {
	title: 'Birthday',
	date: '2022-06-07',
	time: '17:46:00',
};

const nextValidEventSample = {
	title: 'Meeting',
	date: '2022-08-07',
	time: '12:00:00',
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
const nextCallbackSample = () => console.log('Meeting');

const nonexistId = 'id';
const getValidId = () => {
	return _.getEvents()[0].id;
};

beforeEach(() => {
	_.addEvent(validEventSample, callbackSample);
});

afterEach(() => {
	_.deleteEvent(getValidId());
});

describe('Calendar: updateEvent', () => {
	test('should throw an error if called without an arg', () => {
		expect(_.updateEvent()).toEqual(new Error('Id is required'));
	});

	test('should throw an error if called without nextEvent arg', () => {
		expect(_.updateEvent(getValidId())).toEqual(
			new Error('NextEvent parameter is required')
		);
	});

	test('should throw an error if called with invalid event arg', () => {
		expect(_.updateEvent(getValidId(), invalidEventSample)).toEqual(
			new Error('Invalid Event')
		);
	});

	test('should throw an error if called with invalid date format', () => {
		expect(
			_.updateEvent(getValidId(), validEventSampleWithInvalidDate)
		).toEqual(new Error('Incorrect date format'));
	});

	test('should throw an error if called with an elapsed date', () => {
		expect(
			_.updateEvent(getValidId(), validEventSampleWithElapsedDate)
		).toEqual(new Error('The event can not be in the past'));
	});

	test('should return a string "Event not found"', () => {
		expect(_.updateEvent(nonexistId, validEventSample)).toEqual(
			'Event not found'
		);
	});

	test('should return a string with the status of successful execution, and aray of events contain with the passed nextEvent object', () => {
		const getValidId = () => {
			return _.getEvents()[0].id;
		};
		expect(_.updateEvent(getValidId(), nextValidEventSample)).toBe(
			'Updated successfully!'
		);
		expect(_.getEvents()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					...nextValidEventSample,
					callback: callbackSample,
				}),
			])
		);
	});

	test('should return a string with the status of successful execution, and aray of events contain with the passed nextEvent object and callback nextCallback', () => {
		const getValidId = () => {
			return _.getEvents()[0].id;
		};
		expect(
			_.updateEvent(getValidId(), nextValidEventSample, nextCallbackSample)
		).toBe('Updated successfully!');
		expect(_.getEvents()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					...nextValidEventSample,
					callback: nextCallbackSample,
				}),
			])
		);
	});
});

