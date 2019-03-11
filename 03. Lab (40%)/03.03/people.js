const functions = require("./functions");

module.exports = {
	description: "People.js",

	getPersonById: async (id) => {
		// This will return the person with the specified id 
		// within the people.json array.
		await functions.typeCheck(id, "number");
		if (id < 0 ){
			throw "Error: id is out of range. Must be a positive integer";
		}
		const people = await functions.getPeople();
		for (let i = 0; i < people.length; i++) {
			if (people[i].id == id) {
				let person = people[i];
				return person.firstName + " " + person.lastName;
			};
		};
		throw "Error: id does not exist";
	},

	lexIndex: async (index) => {
		// For this function, you must get the sorted lexographic (aka alphabetical order) of all the people (in people.json) by their last name. Then, return the person's full name at the index specified by the argument index.
		await functions.typeCheck(index, "number");
		if (index < 0 ){
			throw "Error: index is out of range. Must be a positive integer";
		}
		const people = await functions.getPeople();
		people.sort((a, b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0));
		if (people[index]) {
			let person = people[index];
			return person.firstName + " " + person.lastName;
		}
		else {
			throw "Error: index does not exist"
		}
	},

	firstNameMetrics: async () => {
		// Using just the first names of all the people in people.json, collect and return the following metrics:
		// totalLetters: sum of all the letters in all the firstNames,
		// totalVowels: sum of all the vowels in all the firstNames,
		// totalConsonants: sum of all the consonants in all the firstNames,
		// longestName: the longest firstName in the list,
		// shortestName: the shortest firstName in the list
		let metrics = {
			totalLetters: 0,
			totalVowels: 0,
			totalConsonants: 0,
			longestName: "",
			shortestName: ""
		};

		const people = await functions.getPeople();
		for (let i = 0; i < people.length; i++) {
			let firstName = people[i].firstName;
			metrics.totalLetters += firstName.length;
			metrics.totalVowels += (firstName.match(/[aAeEiIoOuU]/g) || []).length;
			metrics.totalConsonants += (firstName.match(/[^aAeEiIoOuU]/g) || []).length;
			if (firstName.length > metrics.longestName.length){
				metrics.longestName = firstName;
			}
			if (firstName.length < metrics.shortestName.length || metrics.shortestName == "") {
				metrics.shortestName = firstName;
			}
		};
		return metrics;
	}
}