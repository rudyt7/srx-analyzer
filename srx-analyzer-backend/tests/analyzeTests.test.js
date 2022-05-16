const utilityFunctions = require("../utility/utilFunctions");

describe("Utility Functions", () => {
  test("Give count of various metrics", () => {
    expect(
      utilityFunctions.givePopulatedObject([
        "a",
        "a",
        "a",
        "b",
        "b",
        "c",
        "c",
        "c",
      ])
    ).toEqual({
      a: 3,
      b: 2,
      c: 3,
    });
  });

  test("Give Sliced Data Filter false", () => {
    expect(utilityFunctions.giveSlicedData([1, 2, 3, 4, 5], 3, false)).toEqual(
      []
    );
  });

  test("Give Sliced Data Filter true", () => {
    expect(utilityFunctions.giveSlicedData([1, 2, 3, 4, 5], 3, true)).toEqual([
      1, 2, 3,
    ]);
  });

  test("Give Merged Object", () => {
    expect(
      utilityFunctions.mergeObject([
        {
          session: "345",
          ip: " 10.10.1.14",
          destIp: " 10.10.1.13",
          totalPackets: 0,
          totalBytes: 0,
        },
        {
          session: "345",
          ip: " 10.10.1.14",
          destIp: " 10.10.1.13",
          totalPackets: 18959056,
          totalBytes: 1309286135,
        },
        {
          session: "345",
          ip: " 10.10.1.14",
          destIp: " 10.10.1.13",
          totalPackets: 17991328,
          totalBytes: 1268969873,
        },
      ])
    ).toEqual({
      345: {
        ip: " 10.10.1.14",
        destIp: " 10.10.1.13",
        totalPackets: 36950384,
        totalBytes: 2578256008,
      },
    });
  });
});
