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

describe('Calendar: getEvents', () => {
  test('should be defined', () => {
    expect(testInstance.getEvents()).toBeDefined();
  });

  test('should has a length of one', () => {
    expect(testInstance.getEvents()).toHaveLength(1);
  });

  test('should has contain array with event object', () => {
    expect(testInstance.getEvents()).toEqual(
      expect.arrayContaining([expect.objectContaining(validEventSample)])
    );
  });

  test('should has a length of two', () => {
    testInstance.addEvent(validEventSample, callbackSample);

    expect(testInstance.getEvents()).toHaveLength(2);
  });
});
