const check = require("./check");

module.exports = {
	description: "arrayutilities",
	
	head: (array) =>
	{
		// returns the first element of the array
		check.isProperArray(array);
		return array[0];
	},

	last: (array) =>
	{
		// returns the last element of the array
		check.isProperArray(array);
		return array[array.length - 1];
	},

	remove: (array, index) =>
	{
		// removes the element at the specified index of the array and returns the new array
		check.isProperArray(array);
		check.isProperInt(index);
		if (index >= array.length)
		{
			throw "index is out of bounds";
		}
		array.splice(index,1);
		return array;
	},

	range: (end, value = null) =>
	{
		// Creates a new numbered array starting at 0 increasing by one up to, but not including the end argument. The value argument is optional, but when specified each element will be set to that value.
		check.isProperInt(end);
		if (end <= 0)
		{
			throw "end is out of range";
		}
		let array = [];
		for (let i = 0; i < end; i++)
		{
			if (value)
			{
				array.push(value);
			}
			else
			{
				array.push(i);
			}
		}
		return array;
	},

	countElements: (array) =>
	{
		// Will return an object with the count of each unique element in the array.
		check.isProperArray(array);
		object = {}
		for (let i = 0; i < array.length; i++)
		{
			if (object[array[i]])
			{
				object[array[i]] += 1;
			}
			else
			{
				object[array[i]] = 1;
			}
		}
		return object;
	},

	isEqual: (arrayOne, arrayTwo) =>
	{
		// Given two arrays, check if they are equal in terms of size and elements and return a boolean. Order of the items in the elements matters when comparing equality.
		check.isProperArray(arrayOne);
		check.isProperArray(arrayTwo);
		if (arrayOne.length != arrayTwo.length)
		{
			return false;
		}
		else
		{
			for (let i = 0; i < arrayOne.length; i++)
			{
				if (arrayOne[i] !== arrayTwo[i])
				{
					return false;
				}
			}
			return true;
		}
	}
}