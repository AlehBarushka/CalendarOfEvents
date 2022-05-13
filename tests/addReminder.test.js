import { RecurringEvent } from '../module/RecurringEvent';

let testInstance = new RecurringEvent();

jest.useFakeTimers();

const callbackSample = () => console.log('Meeting start!');

const validRecurringEventSample = {
  title: 'Meeting',
  time: '17:46:00',
};

describe('RecurringEvent: addRecurringEvent', () => {
  test('should throw an error if called with an invalid event arg', () => {
    const nonValidRecurringEventSample = {
      title: 'Meeting',
    };

    expect(
      testInstance.addRecurringEvent(
        nonValidRecurringEventSample,
        callbackSample
      )
    ).toEqual(new Error('Invalid event object'));
  });

  test('should throw an error if called with a valid recurring event object, but with an invalid time field', () => {
    const sampleWithInvalidTime = {
      title: 'Meeting',
      time: '10046:00',
    };

    expect(
      testInstance.addRecurringEvent(sampleWithInvalidTime, callbackSample)
    ).toEqual(new Error('Invalid time format'));
  });

  test('should throw an error if called with an invalid DaysOfWeek arg', () => {
    const invalidDaysOfWeek = 'Monday, Friday';

    expect(
      testInstance.addRecurringEvent(
        validRecurringEventSample,
        callbackSample,
        invalidDaysOfWeek
      )
    ).toEqual(new Error('Invalid array of the days of week'));
  });

  test('should throw an error if called without callback arg', () => {
    expect(testInstance.addRecurringEvent(validRecurringEventSample)).toEqual(
      new Error('Callback arg is required')
    );
  });

  test('should return a string with the status of successful execution and array of events has a length of one', () => {
    expect(
      testInstance.addRecurringEvent(validRecurringEventSample, callbackSample)
    ).toBe('Added successfully!');

    expect(testInstance.getEvents()).toHaveLength(1);
  });

  test('should contain an array with the previously passed recurring event object', () => {
    testInstance.addRecurringEvent(validRecurringEventSample, callbackSample);

    expect(testInstance.getEvents()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(validRecurringEventSample),
      ])
    );
  });
});
