import { Calendar } from './Calendar';

let testInstance = new Calendar();

jest.useFakeTimers();

const validEventSample = {
  title: 'Birthday',
  date: '2022-06-07',
  time: '17:46:00',
};
const callbackSample = () => console.log('Happy Birthday');

beforeAll(() => {
  testInstance.addEvent(validEventSample, callbackSample);
});

describe('Calendar: getEventForDay', () => {
  test('should be defined', () => {
    expect(testInstance.getEventForDay()).toBeDefined();
  });

  test('should throw an error if called without an arg', () => {
    expect(testInstance.getEventForDay()).toEqual(
      new Error('Date is required')
    );
  });

  test('should throw an error if called with invalid date format', () => {
    const invalidDate = '20-2022-10';

    expect(testInstance.getEventForDay(invalidDate)).toEqual(
      new Error('Incorrect date format')
    );
  });

  test('should return a string with a unsuccessful status and the events array should be empty', () => {
    const nonExistentDateOfEvent = '2023-10-10';

    expect(testInstance.getEventForDay(nonExistentDateOfEvent)).toBe(
      'There are no events for the specified period!'
    );
  });

  test('should has a length of one', () => {
    const dateOfEvent = validEventSample.date;

    expect(testInstance.getEventForDay(dateOfEvent)).toHaveLength(1);
  });

  test('should has contain array with event object with specified date', () => {
    const dateOfEvent = validEventSample.date;

    expect(testInstance.getEventForDay(dateOfEvent)).toEqual(
      expect.arrayContaining([expect.objectContaining(validEventSample)])
    );
  });

  test('should has a length of two', () => {
    testInstance.addEvent(validEventSample, callbackSample);

    const dateOfEvent = validEventSample.date;

    expect(testInstance.getEventForDay(dateOfEvent)).toHaveLength(2);
  });
});

