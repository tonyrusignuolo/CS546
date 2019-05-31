const express = require("express");
const router = express.Router();
const dataAnimals = require("../data/animals");
const dataPosts = require("../data/posts");

async function postPrint(post) {
	let animal = await dataAnimals.read(post.author.toString());
	post.author = {
		_id: animal._id,
		name: animal.name
	};
	return post;
}

router.get("", async (req, res) => {
	// returns all posts in the posts collection
	try {
		let posts = await dataPosts.readAll();
		for (let i = 0; i < posts.length; i++) {
			posts[i] = await postPrint(posts[i]);
		}
		res.json(posts);
	} catch (err) {
		res.status(404);
		res.send(err);
	}
})

router.post("", async (req, res) => {
	// creates a new post in the posts collection
	try {
		let post = await dataPosts.create(req.body.title, req.body.author, req.body.content);
		res.json(post).send();
	} catch (err) {
		res.status(400);
		res.send(err);	
	}
})

router.get("/:id", async (req, res) => {
	// returns the post with the given id in the posts collection
	try {
		let post = await dataPosts.read(req.params.id);
		res.json(await postPrint(post));
	} catch (err) {
		res.status(404);
		res.send(err);
	}
})

router.put("/:id", async (req, res) => {
	// updates the post with the given id in the posts collection
	try {
		let updatedPost = await dataPosts.update(req.params.id, req.body.newTitle, req.body.newContent);
		res.json(await postPrint(updatedPost));
	} catch (err) {
		if (err == "posts update !post" || err == "index convertID id format")
			res.status(404);
		else
			res.status(400);
		res.send(err);
	}
})

router.delete("/:id", async (req, res) => {
	// deletes the post with the given id from the posts collection
	try {
		let deletionData = await dataPosts.delete(req.params.id);
		let post = deletionData.data;
		await dataAnimals.deletePost(post.author, post._id);
		deletionData.data = await postPrint(deletionData.data);
		res.json(deletionData);
	} catch (err) {
		res.status(404);
		res.send(err);
	}
})

module.exports = router;