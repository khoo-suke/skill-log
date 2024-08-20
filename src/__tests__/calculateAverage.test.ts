import { calculateAverage } from "../app/_utils/calculateAverage";

describe("calculateAverage", () => {
  test("calculates average correctly for a given month", () => {
    const studyTimes = [
      { date: new Date(2024, 7, 1), studyTime: 10 },
      { date: new Date(2024, 7, 2), studyTime: 5 },
      { date: new Date(2024, 7, 3), studyTime: 3 },
    ];

    const startMonthDate = new Date(2024, 7, 1);
    const endMonthDate = new Date(2024, 7, 31);
    const now = new Date(2024, 7, 3);

    const averageTime = calculateAverage(
      studyTimes,
      startMonthDate,
      endMonthDate,
      now
    );
    // 平均値が6であること (10 + 5 + 3) / 3 = 6.0
    expect(averageTime).toBe("6.0");
  });

  test("excludes study times outside the given month when calculating average", () => {
    const studyTimes = [
      { date: new Date(2024, 5, 30), studyTime: 10 },
      { date: new Date(2024, 6, 1), studyTime: 10 },
      { date: new Date(2024, 6, 10), studyTime: 10 },
      { date: new Date(2024, 6, 20), studyTime: 10 },
      { date: new Date(2024, 7, 10), studyTime: 7 },
    ];

    const startMonthDate = new Date(2024, 6, 1);
    const endMonthDate = new Date(2024, 6, 30);
    const now = new Date(2024, 7, 10);

    const averageTime = calculateAverage(
      studyTimes,
      startMonthDate,
      endMonthDate,
      now
    );
    // 月内のデータのみ計算されるべきなので、平均値が(10 + 10 + 10) / 30 = 1.0
    expect(averageTime).toBe("1.0");
  });

  test("handles case where no data falls within the given month", () => {
    const studyTimes = [
      { date: new Date(2024, 6, 30), studyTime: 10 },
      { date: new Date(2024, 8, 1), studyTime: 7 },
    ];

    const startMonthDate = new Date(2024, 7, 1);
    const endMonthDate = new Date(2024, 7, 31);
    const now = new Date(2024, 7, 31);

    const averageTime = calculateAverage(
      studyTimes,
      startMonthDate,
      endMonthDate,
      now
    );
    // 月内のデータがないため、平均値は0.0
    expect(averageTime).toBe("0.0");
  });
});
