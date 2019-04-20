const FizzBuzz = require("./FizzBuzz");

describe("FizzBuzz", () => {
  test("getList returns correct page size", () => {
    expect(FizzBuzz.getList(1, 1000).length).toBe(1000);
  });

  test("getList returns an array", () => {
    expect(FizzBuzz.getList()).toBeInstanceOf(Array);
  });

  test("getList result is a list of FizzBuzzObjects", () => {
    expect(FizzBuzz.getList(0, 1)[0]).toMatchObject({
      fav: false,
      id: 1,
      value: 1
    });
  });

  test("getList returns correct page", () => {
    expect(FizzBuzz.getList(101, 1)[0]).toMatchObject({
      fav: false,
      id: 102,
      value: "Fizz"
    });
  });
});
