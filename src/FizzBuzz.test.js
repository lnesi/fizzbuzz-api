const FizzBuzz = require("./FizzBuzz");

describe("FizzBuzz", () => {
  describe("getList", () => {
    test("returns correct page size", () => {
      expect(FizzBuzz.getList(1, 1000).length).toBe(1000);
    });

    test("returns an array", () => {
      expect(FizzBuzz.getList()).toBeInstanceOf(Array);
    });

    test("result is a list of FizzBuzzObjects", () => {
      expect(FizzBuzz.getList(0, 1)[0]).toMatchObject({
        fav: false,
        id: 1,
        value: 1
      });
    });

    test("returns correct page", () => {
      expect(FizzBuzz.getList(101, 1)[0]).toMatchObject({
        fav: false,
        id: 102,
        value: "Fizz"
      });
    });

    test("returns corret item favorite", () => {
      expect(FizzBuzz.getList(101, 1,[102])[0]).toMatchObject({
        fav: true,
        id: 102,
        value: "Fizz"
      });
    });
  });

  describe("calculate", () => {
    test("returns string(Fizz) case 3", () => {
      expect(FizzBuzz.calculate(3)).toEqual("Fizz")
    });

    test("returns string(Fizz) case 16362", () => {
      expect(FizzBuzz.calculate(16362)).toEqual("Fizz")
    });

    test("returns string(Buzz) case 5", () => {
      expect(FizzBuzz.calculate(5)).toEqual("Buzz")
    });

    test("returns string(Buzz) case 27260", () => {
      expect(FizzBuzz.calculate(27260)).toEqual("Buzz")
    });

    test("returns string(FizzBuzz) case 15", () => {
      expect(FizzBuzz.calculate(15)).toEqual("FizzBuzz")
    });

    test("returns string(FizzBuzz) case 81810", () => {
      expect(FizzBuzz.calculate(81810)).toEqual("FizzBuzz")
    });

    test("resturns default(int) numeber case 7", () => {
        expect(FizzBuzz.calculate(7)).toEqual(7);
    });
  });
});
