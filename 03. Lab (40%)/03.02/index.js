const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

console.log(objUtils.smush());

// // arrayUtils.head Tests
// try
// {
// 	// Should Pass
// 	const headOne = arrayUtils.head([2, 3, 4]);
// 	console.log('head passed successfully');
// }
// catch (e)
// {
// 	console.error('head failed test case');
// }
// try
// {
// 	// Should Fail
// 	const headTwo = arrayUtils.head(1234);
// 	console.error('head did not error');
// }
// catch (e)
// {
// 	console.log('head failed successfully');
// }

// // arrayUtils.last Tests
// try
// {
// 	// Should Pass
// 	const lastOne = arrayUtils.last([2, 3, 4]);
// 	console.log('last passed successfully');
// }
// catch (e)
// {
// 	console.error('last failed test case');
// }
// try
// {
// 	// Should Fail
// 	const lastTwo = arrayUtils.last(1234);
// 	console.error('last did not error');
// }
// catch (e)
// {
// 	console.log('last failed successfully');
// }

// // stringUtils.capitalize Tests
// try
// {
// 	// Should Pass
// 	const capitalizeOne = stringUtils.capitalize("string");
// 	console.log('capitalize passed successfully');
// }
// catch (e)
// {
// 	console.error('capitalize failed test case');
// }
// try
// {
// 	// Should Fail
// 	const capitalizeTwo = stringUtils.capitalize(1234);
// 	console.error('capitalize did not error');
// }
// catch (e)
// {
// 	console.log('capitalize failed successfully');
// }

// // objUtils.extend Tests
// const first = { x: 2, y: 3};
// const second = { a: 70, x: 4, z: 5 };
// const third = { x: 0, y: 9, q: 10 };
// try
// {
// 	// Should Pass
// 	const extendOne = objUtils.extend(first, second, third);
// 	console.log('extend passed successfully');
// }
// catch (e)
// {
// 	console.error('extend failed test case');
// }
// try
// {
// 	// Should Fail
// 	const extendTwo = objUtils.extend(1234);
// 	console.error('extend did not error');
// }
// catch (e)
// {
// 	console.log('extend failed successfully');
// }

// // try
// // {
// // 	// Should Fail
// // 	const test = objUtils.mapValues({ a: 1, b: 2, c: 3 }, "apple");
// // 	console.error(test);
// // }
// // catch (e)
// // {
// // 	console.log(e);
// // }