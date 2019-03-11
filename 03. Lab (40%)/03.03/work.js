const functions = require("./functions");


module.exports = {
	description: "work.js",

	whereDoTheyWork: async (firstName, lastName) => {
		// Given a first and last name, find the person in the 
		// people.json array, then, if they are found, get 
		// their SSN and find out where they work from work.json. 
		// Then, print their full name, company, job title and if 
		// they will be fired. You can assume that the data 
		// corresponding to a person's SSN always exists in 
		// work.json.
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
		const work = await functions.getWork();
		for (let i = 0; i < work.length; i++) {
			if (work[i].ssn == person.ssn) {
				return `${person.firstName} ${person.lastName} - ${work[i].jobTitle} at ${work[i].company}. They will${(work[i].willBeFired) ? "" : " not"} be fired.` 
			}
		}
	},

	findTheHacker: async (ip) => {
		// Someone is hacking company records, and your boss 
		// found their IP Address. Use your async JS skills 
		// with people.json and work.json to find the hacker!
		await functions.typeCheck(ip, "string");		
		const work = await functions.getWork();
		for (let i = 0; i < work.length; i++) {
			if (work[i].ip == ip) {
				var employee = work[i];
			}
		}
		if (!employee) {
			throw "Error: employee record for ip address does not exist"
		}
		const people = await functions.getPeople();
		for (let i = 0; i < people.length; i++) {
			if (people[i].ssn == employee.ssn) {
				let hacker = people[i];
				return `${hacker.firstName} ${hacker.lastName} is the hacker!`;
			}
		}
	}
}