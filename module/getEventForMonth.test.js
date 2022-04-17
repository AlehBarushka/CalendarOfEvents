import { Calendar } from './Calendar';

let testInstance = new Calendar();

jest.useFakeTimers();

beforeAll(() => {
  const callbackSample = () => console.log('Happy Birthday');
  const validEventSample1 = {
    title: 'Birthday',
    date: '2022-06-07',
    time: '17:46:00',
  };
  const validEventSample2 = {
    title: 'Birthday',
    date: '2022-07-07',
    time: '17:46:00',
  };

  testInstance.addEvent(validEventSample1, callbackSample);
  testInstance.addEvent(validEventSample2, callbackSample);
});

describe('Calendar: getEventsForPeriod', () => {
  test('should throw an error if called without an arg', () => {
    expect(testInstance.getEventForMonth()).toEqual(
      new Error('Month is required')
    );
  });

  test('should throw an error if called with invalid date format', () => {
    const month = '01';
    const invalidYear = '20';

    expect(testInstance.getEventForMonth(month, invalidYear)).toEqual(
      new Error('Incorrect date format')
    );
  });

  test('should return a string with a unsuccessful status and the events array should be empty', () => {
    const month = '09';
    const year = '2022';

    expect(testInstance.getEventForMonth(month, year)).toBe(
      'There are no events for the specified period!'
    );
  });

  test('should has a length of one and has contain array with event object in the specified month', () => {
    const eventSample = {
      title: 'Birthday',
      date: '2022-06-07',
      time: '17:46:00',
    };
    const month = '06';
    const year = '2022';

    expect(testInstance.getEventForMonth(month, year)).toHaveLength(1);

    expect(testInstance.getEventForMonth(month, year)).toEqual(
      expect.arrayContaining([expect.objectContaining(eventSample)])
    );
  });

  test('should has a length of one and has contain array with event object in the specified month if called without year arg', () => {
    const eventSample = {
      title: 'Birthday',
      date: '2022-06-07',
      time: '17:46:00',
    };
    const month = '06';

    expect(testInstance.getEventForMonth(month)).toHaveLength(1);

    expect(testInstance.getEventForMonth(month)).toEqual(
      expect.arrayContaining([expect.objectContaining(eventSample)])
    );
  });

  test('should has a length of one and has contain array with event object in the specified month if called with month arg which a number', () => {
    const eventSample = {
      title: 'Birthday',
      date: '2022-07-07',
      time: '17:46:00',
    };
    const month = 7;

    expect(testInstance.getEventForMonth(month)).toHaveLength(1);

    expect(testInstance.getEventForMonth(month)).toEqual(
      expect.arrayContaining([expect.objectContaining(eventSample)])
    );
  });
});

