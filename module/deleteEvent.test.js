import { Calendar } from './Calendar';

let testInstance = new Calendar();

jest.useFakeTimers();

beforeAll(() => {
  const validEventSample = {
    title: 'Birthday',
    date: '2022-06-07',
    time: '17:46:00',
  };
  const callbackSample = () => console.log('Happy Birthday');

  testInstance.addEvent(validEventSample, callbackSample);
});

describe('Calendar: deleteEvent', () => {
  test('should throw an error if called without an arg', () => {
    expect(testInstance.deleteEvent()).toEqual(new Error('Id is required'));
  });

  test('should throw an error if event not found', () => {
    const nonexistId = 'id';

    expect(testInstance.deleteEvent(nonexistId)).toEqual(
      new Error('Event not found')
    );
  });

  test('should return a string with a successful status and the events array should be empty', () => {
    const getValidId = () => {
      return testInstance.getEvents()[0].id;
    };

    expect(testInstance.deleteEvent(getValidId())).toBe(
      'Deleted successfully!'
    );

    expect(testInstance.getEvents()).toEqual([]);
  });
});
