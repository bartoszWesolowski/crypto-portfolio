import fs from "fs";
import { ZondaDateParser } from "../ZondaDateParser";

describe("Zonda date Parser", () => {
  const parser = new ZondaDateParser();

  it("should parse date correctly for UTC", async () => {
    // TODO: Handle time zone conversion correctly
    const parsed = parser.parseDate("31-03-2021 13:09:05 UTC");
    expect(parsed.toUTCString()).toBe("Wed, 31 Mar 2021 11:09:05 GMT");
  });
});
