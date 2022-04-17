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
  test('should be defined', () => {
    expect(testInstance.getEventsForPeriod()).toBeDefined();
  });

  test('should throw an error if called without an arg', () => {
    expect(testInstance.getEventsForPeriod()).toEqual(
      new Error('Date range is required')
    );
  });

  test('should throw an error if called with invalid date format', () => {
    const invalidDateRange1 = '20-2022-10';
    const invalidDateRange2 = '20-2023-10';

    expect(
      testInstance.getEventsForPeriod(invalidDateRange1, invalidDateRange2)
    ).toEqual(new Error('Incorrect date format'));
  });

  test('should return a string with a unsuccessful status and the events array should be empty', () => {
    const nonExistentDateRange1 = '2023-10-10';
    const nonExistentDateRange2 = '2023-10-09';

    expect(
      testInstance.getEventsForPeriod(
        nonExistentDateRange1,
        nonExistentDateRange2
      )
    ).toBe('There are no events for the specified period!');
  });

  test('should has a length of one and has contain array with event object in the specified period', () => {
    const eventSample = {
      title: 'Birthday',
      date: '2022-06-07',
      time: '17:46:00',
    };
    const dateRange1 = '2022-06-07';
    const dateRange2 = '2022-06-08';

    expect(
      testInstance.getEventsForPeriod(dateRange1, dateRange2)
    ).toHaveLength(1);

    expect(testInstance.getEventsForPeriod(dateRange1, dateRange2)).toEqual(
      expect.arrayContaining([expect.objectContaining(eventSample)])
    );
  });

  test('should has a length of one and has contain array with event object in the specified period', () => {
    const eventSample1 = {
      title: 'Birthday',
      date: '2022-06-07',
      time: '17:46:00',
    };
    const eventSample2 = {
      title: 'Birthday',
      date: '2022-07-07',
      time: '17:46:00',
    };
    const dateRange1 = '2022-06-07';
    const dateRange2 = '2022-07-08';

    expect(
      testInstance.getEventsForPeriod(dateRange1, dateRange2)
    ).toHaveLength(2);

    expect(testInstance.getEventsForPeriod(dateRange1, dateRange2)).toEqual(
      expect.arrayContaining([
        expect.objectContaining(eventSample1, eventSample2),
      ])
    );
  });
});

