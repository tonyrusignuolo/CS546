const check = require("./check");

module.exports = {
	description: "string utilities",

	capitalize: (string) =>
	{
		// Given a string, capitalize the first letter and lowercase the remaining characters.
		check.isProperString(string);
		string = string[0].toUpperCase() + string.toLowerCase().slice(1);
		return string;
	},

	repeat: (string, num) =>
	{
		// Given string and num, repeat the string num amount of times.
		check.isProperString(string);
		check.isProperInt(num);
		if (num <= 0)
		{
			throw "num is not positive";
		}
		let newString = "";
		for (let i = 0; i < num; i++)
		{
			newString += string;
		}
		return newString;
	},

	countChars: (string) =>
	{
		// Return an object that has the mapping of a character and the amount of times it appears in a string. Hint: You may use a function you have written already.
		check.isProperString(string);
		let object = {};
		for (let i = 0; i < string.length; i++)
		{
			if (object[string[i]])
			{
				object[string[i]] += 1;
			}
			else
			{
				object[string[i]] = 1;
			}
		}
		return object;
	}
}