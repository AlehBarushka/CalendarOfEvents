import { Calendar } from './Calendar';

jest.useFakeTimers();

let testInstance = new Calendar();

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

const callbackSample = () => console.log('Happy Birthday');
const nextCallbackSample = () => console.log('Meeting');

const getValidId = () => {
  return testInstance.getEvents()[0].id;
};

beforeEach(() => {
  testInstance.addEvent(validEventSample, callbackSample);
});

afterEach(() => {
  testInstance.deleteEvent(getValidId());
});

describe('Calendar: updateEvent', () => {
  test('should throw an error if called without an arg', () => {
    expect(testInstance.updateEvent()).toEqual(new Error('Id is required'));
  });

  test('should throw an error if called without nextEvent arg', () => {
    expect(testInstance.updateEvent(getValidId())).toEqual(
      new Error('NextEvent parameter is required')
    );
  });

  test('should throw an error if called with invalid event arg', () => {
    const invalidEventSample = {
      title: 'Birthday',
      time: '17:46:00',
    };

    expect(testInstance.updateEvent(getValidId(), invalidEventSample)).toEqual(
      new Error('Invalid Event')
    );
  });

  test('should throw an error if called with invalid date format', () => {
    const validEventSampleWithInvalidDate = {
      title: 'Birthday',
      date: '20220607',
      time: '17:4600',
    };

    expect(
      testInstance.updateEvent(getValidId(), validEventSampleWithInvalidDate)
    ).toEqual(new Error('Incorrect date format'));
  });

  test('should throw an error if called with an elapsed date', () => {
    const validEventSampleWithElapsedDate = {
      title: 'Birthday',
      date: '2020-10-10',
      time: '17:46:00',
    };

    expect(
      testInstance.updateEvent(getValidId(), validEventSampleWithElapsedDate)
    ).toEqual(new Error('The event can not be in the past'));
  });

  test('should throw an error if event not found', () => {
    const nonexistId = 'id';

    expect(testInstance.updateEvent(nonexistId, validEventSample)).toEqual(
      new Error('Event not found')
    );
  });

  test('should return a string with the status of successful execution, and aray of events contain with the passed nextEvent object', () => {
    expect(testInstance.updateEvent(getValidId(), nextValidEventSample)).toBe(
      'Updated successfully!'
    );

    expect(testInstance.getEvents()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...nextValidEventSample,
          callback: callbackSample,
        }),
      ])
    );
  });

  test('should return a string with the status of successful execution, and aray of events contain with the passed nextEvent object and callback nextCallback', () => {
    expect(
      testInstance.updateEvent(
        getValidId(),
        nextValidEventSample,
        nextCallbackSample
      )
    ).toBe('Updated successfully!');

    expect(testInstance.getEvents()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...nextValidEventSample,
          callback: nextCallbackSample,
        }),
      ])
    );
  });
});
