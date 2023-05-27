import { helloMiddleEarth } from "../src";

describe("helloMiddleEarth", () => {
  it("should return 'Hello Middle Earth!'", () => {
    expect(helloMiddleEarth()).toBe("Hello Middle Earth!");
  });
});
