import { LotrClient } from "../src";

describe("LotrClient", () => {
  it("should be defined", () => {
    expect(LotrClient).toBeDefined();
  });

  it("should be instantiable", () => {
    expect(new LotrClient("api-key")).toBeInstanceOf(LotrClient);
  });

  it("should throw an error if no api key is provided", () => {
    expect(() => new LotrClient("")).toThrow();
  });
});
