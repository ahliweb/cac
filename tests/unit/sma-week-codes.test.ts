/**
 * Tests for `src/domain/sma-week-codes.ts`: expansion of the week notation
 * used in the SMA coding syllabus (bagian 4 and 5).
 */

import { describe, expect, test } from "bun:test";
import { expandWeekCodes } from "../../src/domain/sma-week-codes";

describe("expandWeekCodes", () => {
  test("a single code", () => {
    expect(expandWeekCodes("A-X1-M1")).toEqual(["A-X1-M1"]);
  });

  test("an inclusive range", () => {
    expect(expandWeekCodes("A-X2-M4..M6")).toEqual(["A-X2-M4", "A-X2-M5", "A-X2-M6"]);
  });

  test("comma parts reuse the segment's semester prefix", () => {
    expect(expandWeekCodes("B-XI1-M1, M12")).toEqual(["B-XI1-M1", "B-XI1-M12"]);
    expect(expandWeekCodes("B-X2-M1..M2, M12..M13")).toEqual([
      "B-X2-M1",
      "B-X2-M2",
      "B-X2-M12",
      "B-X2-M13",
    ]);
  });

  test("semicolons start a new segment with its own prefix", () => {
    expect(expandWeekCodes("A-XI1-M9..M10; B-XI1-M8")).toEqual([
      "A-XI1-M9",
      "A-XI1-M10",
      "B-XI1-M8",
    ]);
  });

  test("a short part without a prefix is rejected", () => {
    expect(() => expandWeekCodes("M3")).toThrow('cannot parse week notation part "M3"');
  });

  test("a malformed part is rejected", () => {
    expect(() => expandWeekCodes("A-X1-M3..")).toThrow("cannot parse");
    expect(() => expandWeekCodes("minggu 3")).toThrow("cannot parse");
  });

  test("a backwards range is rejected", () => {
    expect(() => expandWeekCodes("A-X1-M9..M4")).toThrow("runs backwards");
  });
});
