import { calculateAverage } from '../app/_utils/calculateAverage';

describe('calculateAverage', () => {
  test('calculates average correctly for a given month', () => {
    const studyTimes = [
      { date: new Date(2024, 7, 1), studyTime: 10 },
      { date: new Date(2024, 7, 2), studyTime: 5 },
      { date: new Date(2024, 7, 3), studyTime: 3 },
    ];

    const startMonthDate = new Date(2024, 7, 1);
    const endMonthDate = new Date(2024, 7, 31);
    const now = new Date(2024, 7, 3);

    const averageTime = calculateAverage(studyTimes, startMonthDate, endMonthDate, now);
    // 平均値が6であること
    expect(averageTime).toBe('6.0');
  });
});
