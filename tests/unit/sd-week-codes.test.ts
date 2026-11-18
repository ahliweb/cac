/**
 * Tests for `src/domain/sd-week-codes.ts`: expansion of the week notation
 * used in the SD coding syllabus (bagian 6).
 */

import { describe, expect, test } from "bun:test";
import { expandSdWeekCodes } from "../../src/domain/sd-week-codes";

describe("expandSdWeekCodes", () => {
  test("a single code", () => {
    expect(expandSdWeekCodes("SD5-1-M1")).toEqual(["SD5-1-M1"]);
  });

  test("comma parts reuse the segment's class-semester prefix", () => {
    expect(expandSdWeekCodes("SD5-1-M1, M2, M3")).toEqual(["SD5-1-M1", "SD5-1-M2", "SD5-1-M3"]);
  });

  test("semicolons start a new segment with its own prefix", () => {
    expect(expandSdWeekCodes("SD5-1-M2, M3; SD6-1-M1")).toEqual([
      "SD5-1-M2",
      "SD5-1-M3",
      "SD6-1-M1",
    ]);
  });

  test("an inclusive range", () => {
    expect(expandSdWeekCodes("SD6-2-M4..M6")).toEqual(["SD6-2-M4", "SD6-2-M5", "SD6-2-M6"]);
  });

  test("a part without a prefix, a malformed part and a backwards range are refused", () => {
    expect(() => expandSdWeekCodes("M1")).toThrow("cannot parse week notation");
    expect(() => expandSdWeekCodes("SD7-1-M1")).toThrow("cannot parse week notation");
    expect(() => expandSdWeekCodes("SD5-1-M6..M2")).toThrow("runs backwards");
  });
});
