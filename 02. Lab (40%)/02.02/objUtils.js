const check = require("./check");

module.exports = {
	description: "object utilities",

	extend: (...args) =>
	{
		// This method will take the properties from earlier objects in the array args, and compose a new object with the combined property from all the entries without overwriting properties from earlier entries.
		if (args.length < 2)
		{
			throw "not enough arguments";
		}
		let object = {};
		for (let i = 0; i < args.length; i++)
		{
			check.isProperObject(args[i]);
			for (let key in args[i])
			{
				if (!object[key])
				{
					object[key] = args[i][key]
				}
			}
		}
		return object;
	},

	smush: (...args) =>
	{
		// This method will take the properties from earlier objects in the array args, and compose a new object with the combined property from all the entries with overwriting properties from earlier entries.
		check.isProperArray(args);
		let object = {};
		for (let i = 0; i < args.length; i++)
		{
			check.isProperObject(args[i]);
			for (let key in args[i])
			{
				object[key] = args[i][key]
			}
		}
		return object;
	},

	mapValues: (object, func) =>
	{
		// Given an object and a function, evaluate the function on the values of the object and return a new object.
		check.isProperObject(object);
		check.isProperFunction(func);
		let newObject = {}
		for (let key in object)
		{
			newObject[key] = func(object[key]);
		}
		return newObject;
	}
}