const axios = require("axios");
const functions = require("./functions");


module.exports = {
	description: "weather.js",

	shouldTheyGoOutside: async (firstName, lastName) => {
		// Given a first and last name, find the person in 
		// the people.json array, then, if they are found, 
		// get their zip code and find the temperature for 
		// their location in weather.json. If the temperature 
		// is greater than or equal to 34 degrees, the person 
		// will go outside. You can assume that the weather 
		// data for the zip codes exist.
		await functions.typeCheck(firstName, "string");
		await functions.typeCheck(lastName, "string");
		const people = await functions.getPeople();
		for (let i = 0; i < people.length; i++) {
			if (people[i].firstName == firstName && people[i].lastName == lastName) {
				var person = people[i];
				break;
			}
		}
		if (!person) {
			throw "Error: person does not exist"
		}
		const weather = await functions.getWeather();
		for (let i = 0; i < weather.length; i++) {
			if (weather[i].zip == person.zip) {
				return (weather[i].temp >= 34) ? `Yes, ${person.firstName} should go outside.` : `No, ${person.firstName} should not go outside.`;
			}
		}
	}
}