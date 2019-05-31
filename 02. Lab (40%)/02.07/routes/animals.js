const express = require("express");
const router = express.Router();
const dataAnimals = require("../data/animals");
const dataPosts = require("../data/posts");

async function animalPrint(animal) {
	for (let i = 0; i < animal.likes.length; i++) {
		try {
			let like = await dataPosts.read(animal.likes[i]);
			animal.likes[i] = {
				_id: like._id,
				title: like.title
			};
		} catch (err) {
			await dataAnimals.unlike(animal._id, animal.likes[i]);
			animal.likes.splice(i, 1);
			i--;
		}
	}
	for (let i = 0; i < animal.posts.length; i++) {
		let post = await dataPosts.read(animal.posts[i]);
		animal.posts[i] = {
			_id: post._id,
			title: post.title
		};
	}
	return animal;
}

router.get("", async (req, res) => {
	// returns all animals in the animals collection
	try {
		let animals = await dataAnimals.readAll();
		for (let i = 0; i < animals.length; i++) {
			animals[i] = await animalPrint(animals[i]);
		}
		res.json(animals);
	} catch (err) {
		res.status(404);
		res.send(err);
	}
})

router.post("", async (req, res) => {
	// creates a new animal in the animals collection
	try {
		let animal = await dataAnimals.create(req.body.name, req.body.animalType);
		res.json(animal).send();
	} catch (err) {
		res.status(400);
		res.send(err);
	}
})

router.get("/:id", async (req, res) => {
	// returns the animal with the given id in the animals collection
	try {
		let animal = await dataAnimals.read(req.params.id);
		animal = await animalPrint(animal);
		res.json(animal);
	} catch (err) {
		res.status(404);
		res.send(err);
	}
})

router.put("/:id", async (req, res) => {
	// updates the animal with the given id in the animals collection
	try {
		let updatedAnimal = await dataAnimals.update(req.params.id, req.body.newName, req.body.newAnimalType);
		res.json(updatedAnimal);
	} catch (err) {
		console.log(err);
		if (err == "animals update !animal" || err == "index convertID id format")
			res.status(404);
		else
			res.status(400);
		res.send(err);		
	}
})

router.delete("/:id", async (req, res) => {
	// deletes the animal with the given id from the animals collection
	try {
		let deletionData = await dataAnimals.delete(req.params.id);
		for (let i = 0; i < deletionData.data.posts.length; i++) {
			await dataPosts.delete(deletionData.data.posts[i]);
		}
		res.json(deletionData);
	} catch (err) {
		console.log(err);
		res.status(404);
		res.send(err);		
	}
})

module.exports = router;