import { Calendar } from './Calendar';

let _ = new Calendar();

jest.useFakeTimers();

const validEventSample = {
	title: 'Birthday',
	date: '2022-06-07',
	time: '17:46:00',
};
const callbackSample = () => console.log('Happy Birthday');

beforeAll(() => {
	_.addEvent(validEventSample, callbackSample);
});

describe('Calendar: getEvents', () => {
	test('should be defined', () => {
		expect(_.getEvents()).toBeDefined();
	});

	test('should has a length of one', () => {
		expect(_.getEvents()).toHaveLength(1);
	});

	test('should has contain array with event object', () => {
		expect(_.getEvents()).toEqual(
			expect.arrayContaining([expect.objectContaining(validEventSample)])
		);
	});

	test('should has a length of two', () => {
		_.addEvent(validEventSample, callbackSample);
		expect(_.getEvents()).toHaveLength(2);
	});
});

