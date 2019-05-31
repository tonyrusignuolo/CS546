const collections = require("./collections");
const animalsCollectionConnection = collections.animals;
const dataPosts = require("./animals");
const index = require("./index");

module.exports = {
	async create(name, animalType) {
		// This async function will resolve to the newly created animal object, with all of the properties from the animals schema
		if (!name) throw "animals create !name";
		if (typeof name !== "string") throw "animals create name type";
		if (!animalType) throw "animals create !animalType";
		if (typeof animalType !== "string") throw "animals create animalType type";
		let animalsCollection = await animalsCollectionConnection();
		let newAnimal = {
			name: name,
			animalType: animalType,
			likes: [],
			posts: []
		};
		let insertInfo = await animalsCollection.insertOne(newAnimal);
		if (insertInfo.insertedCount === 0) throw "animals create insertedCount == 0";
		let newId = insertInfo.insertedId;
		let animal = await this.read(newId);
		return animal;
	},

	async read(id) {
		// When given an id, this function will resolve to an animal from the database.
		if (!id) throw "animals read !id";
		id = await index.convertID(id);
		let animalsCollection = await animalsCollectionConnection();
		let animal = await animalsCollection.findOne({
			_id: id
		});
		if (animal === null) throw "animals read !animal";
		return animal;
	},

	async readAll() {
		// This function will resolve to an array of all animals in the collection.
		let animalsCollection = await animalsCollectionConnection();
		let animals = await animalsCollection.find({}).toArray();
		return animals;
	},

	async update(id, newName = null, newAnimalType = null) {
		// This function will update the name of an animal currently in the database.
		// if (typeof id === "object") id = null
		if (!id) throw "animals update !id";
		if (!newName && !newAnimalType) throw "animals update !newName && !newAnimalType";
		if (newName && typeof newName !== "string") throw "animals update newName type";
		// console.log(newAnimalType == true);
		if (newAnimalType && typeof newAnimalType !== "string") throw "animals update newAnimalType type";
		id = await index.convertID(id);
		let animal = await this.read(id);
		if (animal === {}) throw "animals update !animal";
		let newAnimal = {
			$set: {
				name: newName ? newName : animal.name,
				animalType: newAnimalType ? newAnimalType : animal.animalType,
				likes: animal.likes,
				posts: animal.posts
			}
		}
		let animalsCollection = await animalsCollectionConnection();
		let updateInfo = await animalsCollection.updateOne({
			_id: id
		}, newAnimal);
		if (updateInfo.modifiedCount === 0) throw "animals update modifiedCount == 0";
		return await this.read(id);
	},

	async delete(id) {
		// This function will delete the animal from the database.
		if (!id) throw "animals delete !id";
		id = await index.convertID(id);
		let animal = await this.read(id);
		let animalsCollection = await animalsCollectionConnection();
		let deletionInfo = await animalsCollection.removeOne({
			_id: id
		});
		if (deletionInfo.deletedCount === 0) throw "animals delete deletedCount == 0";
		return {
			deleted: true,
			data: animal
		};
	},

	async addPost(animalId, postId) {
		// this function adds a post's id to the animal's post list
		animalId = await index.convertID(animalId);
		postId = await index.convertID(postId);
		let animal = await this.read(animalId);
		if (animal === {}) throw "animals addPost !animal";
		let newAnimal = {
			$addToSet: {
				posts: postId.toString()
			}
		}
		let animalsCollection = await animalsCollectionConnection();
		let updateInfo = await animalsCollection.updateOne({
			_id: animalId
		}, newAnimal);
		if (updateInfo.modifiedCount === 0) throw "animals addPost modifiedCount == 0";
	},

	async deletePost(animalId, postId) {
		// this function removes a post's id from the animal's post list in the case the post is deleted
		animalId = await index.convertID(animalId);
		postId = await index.convertID(postId);
		let animal = await this.read(animalId);
		if (animal === {}) throw "animals deletePost !animal";
		let newAnimal = {
			$pull: {
				posts: postId.toString()
			}
		}
		let animalsCollection = await animalsCollectionConnection();
		let updateInfo = await animalsCollection.updateOne({
			_id: animalId
		}, newAnimal);
		if (updateInfo.modifiedCount === 0) throw "animals deletePost modifiedCount == 0";
	},

	async like(animalId, postId) {
		animalId = await index.convertID(animalId);
		postId = await index.convertID(postId);
		let animal = await this.read(animalId);
		if (animal === {}) throw "animals like !animal";
		let newAnimal = {
			$addToSet: {
				likes: postId.toString(),
			}
		}
		let animalsCollection = await animalsCollectionConnection();
		let updateInfo = await animalsCollection.updateOne({
			_id: animalId
		}, newAnimal);
		if (updateInfo.modifiedCount === 0) throw "animals like modifiedCount == 0";
	},

	async unlike(animalId, postId) {
		animalId = await index.convertID(animalId);
		postId = await index.convertID(postId);
		let animal = await this.read(animalId);
		if (animal === {}) throw "animals unlike !animal";
		let newAnimal = {
			$pull: {
				likes: postId.toString()
			}
		}
		let animalsCollection = await animalsCollectionConnection();
		let updateInfo = await animalsCollection.updateOne({
			_id: animalId
		}, newAnimal);
		if (updateInfo.modifiedCount === 0) throw "animals unlike modifiedCount == 0";
	}
}