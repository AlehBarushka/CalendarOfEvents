import { Reminder } from '../module/Reminder';

let testInstance = new Reminder();

jest.useFakeTimers();

const callbackSample = () => console.log('Meeting start!');

const validReminderSample = {
  title: 'Meeting',
  time: '17:46:00',
};

describe('Reminder: addReminder', () => {
  test('should throw an error if called with an invalid reminder arg', () => {
    const nonValidReminderSample = {
      title: 'Meeting',
    };

    expect(
      testInstance.addReminder(nonValidReminderSample, callbackSample)
    ).toEqual(new Error('Invalid reminder'));
  });

  test('should throw an error if called with a valid reminder object, but with an invalid time field', () => {
    const sampleWithInvalidTime = {
      title: 'Meeting',
      time: '10046:00',
    };

    expect(
      testInstance.addReminder(sampleWithInvalidTime, callbackSample)
    ).toEqual(new Error('Invalid time format'));
  });

  test('should throw an error if called with an invalid DaysOfWeek arg', () => {
    const validReminderSample = {
      title: 'Meeting',
      time: '17:46:00',
    };

    const invalidDaysOfWeek = 'Monday, Friday';

    expect(
      testInstance.addReminder(
        validReminderSample,
        callbackSample,
        invalidDaysOfWeek
      )
    ).toEqual(new Error('Invalid days of week'));
  });

  test('should throw an error if called without callback arg', () => {
    expect(testInstance.addReminder(validReminderSample)).toEqual(
      new Error('Callback arg is required')
    );
  });

  test('should return a string with the status of successful execution and aray of events has a length of one', () => {
    expect(testInstance.addReminder(validReminderSample, callbackSample)).toBe(
      'Added successfully!'
    );

    expect(testInstance.getEvents()).toHaveLength(1);
  });

  test('should contain an array with the previously passed reminder object', () => {
    testInstance.addReminder(validReminderSample, callbackSample);

    expect(testInstance.getEvents()).toEqual(
      expect.arrayContaining([expect.objectContaining(validReminderSample)])
    );
  });
});

