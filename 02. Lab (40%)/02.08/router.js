const express = require("express");
const router = express.Router();
const axios = require("axios");

const peopleURL = "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json";
async function getPeople() {
	const people = await axios.get(peopleURL);
	return people.data;
}

router.get("", async (req, res) => {
	// Main Page/People Finder
	try {
		let options = {
			title: "People Finder"
		}
		res.render("templates/form", options);
	} catch (err) {
		res.status(404);
		res.render("templates/error", {
			title: "Error", 
			error: err});
	}
})

router.post("/search", async (req, res) => {
	// People Found 
	// searches people.json for personName and provides at most 20 results
	try {
		let peopleJSON = await getPeople();
		let people = [];
		for (let i = 0; i < peopleJSON.length; i++) {
			if (people.length >= 20)
				break;
			let person = peopleJSON[i];
			// console.log(req.body.personName.toLowerCase());
			if (person.firstName.toLowerCase().includes(req.body.personName.toLowerCase()) || person.lastName.toLowerCase().includes(req.body.personName.toLowerCase()))
				people.push(person);
		}
		if (req.body.personName == "")
			throw "No input provided."
		let options = {
			title: "People Found",
			personName: req.body.personName,
			people: people
		}
		res.render("templates/search", options);
	} catch (err) {
		res.status(400);
		res.render("templates/error", {
			title: "Error", 
			error: err});
	}
})

router.get("/details/:id", async (req, res) => {
	// Person Found
	// returns the person with the given id in the person collection
	try {
		let peopleJSON = await getPeople();
		let person = null;
		for (let i = 0; i < peopleJSON.length; i++) {
			if (Number(req.params.id) == peopleJSON[i].id){
				person = peopleJSON[i];
				break;
			}
		}
		if (person == null) 
			throw `No person with id ${req.params.id}.`;
		let options = {
			title: "Person Found",
			personName: person.firstName + " " + person.lastName,
			person: person
		}
		res.render("templates/details", options);
	} catch (err) {
		res.status(404);
		res.render("templates/error", {
			title: "Error", 
			error: err});
	}
})

module.exports = router;