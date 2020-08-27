const operations = require("./operations");
const { add, subtract, multiply, divide } = operations;

test("add operation adds two numbers", () => {
  var result = add(1, 2);
  expect(result).toBe(3);
});

// test("subtract operation subtracts two numbers", () => {
//   var result = subtract(8, 4);
//   expect(result).toBe(4);
// });

// test("multiply operation multiplys two numbers", () => {
//   var result = multiply(3, 3);
//   expect(result).toBe(9);
// });

// test("divide operation divides two numbers", () => {
//   var result = divide(3, 3);
//   expect(result).toBe(1);
// });
