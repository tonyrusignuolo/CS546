const express = require("express");
const router = express.Router();
const dataAnimals = require("../data/animals");
const dataPosts = require("../data/posts");

router.post("/:animalId", async (req, res) => {
	// This route will add the postId provided to the animal's like list, and will return a 200 status code if this is successful; no response body will be returned.
	try {
		await dataAnimals.like(req.params.animalId, req.query.postId);
		res.send();
	} catch (err) {
		if (err == "animals like modifiedCount == 0")
			res.send();
		else {
			res.status(404);
			res.send(err);
		}
	}
})

router.delete("/:animalId", async (req, res) => {
	// This route will remove the postId provided to the animal's likelist, and will return a 200 status code if this is successful; no response body will be returned.
	try {
		await dataAnimals.unlike(req.params.animalId, req.query.postId);
		res.send();
	} catch (err) {
		if (err == "animals unlike modifiedCount == 0")
			res.send();
		else {
			res.status(404);
			res.send(err);
		}
	}
})

module.exports = router;