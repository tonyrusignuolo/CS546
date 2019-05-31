const ObjectID = require("mongodb").ObjectID;
const collections = require("./collections");
const animalsCollectionConnection = collections.animals;

async function convertID(id){
	if (typeof id == "string") {
		id = ObjectID.createFromHexString(id);
	}
	else if (!id._bsontype && id._bsontype !== "ObjectID") {
		throw "ID is of the wrong type";
	}
	return id;
}

module.exports = {
	async create(name, animalType) {
		// This async function will resolve to the newly created animal object, with all of the properties from the animals schema
		if (!name) throw "Name wasn't provided";
		if (typeof name !== "string") throw "Name must be a string";
		if (!animalType) throw "Animal Type wasn't provided";
		if (typeof animalType !== "string") throw "Animal Type must be a string";
		const animalsCollection = await animalsCollectionConnection();
		let newAnimal = {
			name: name,
			animalType: animalType
		};
		const insertInfo = await animalsCollection.insertOne(newAnimal);
		if (insertInfo.insertedCount === 0) throw "Could not create animal";
		const newId = insertInfo.insertedId;
		const animal = await this.get(newId);
		return animal;
	},

	async getAll() {
		// This function will resolve to an array of all animals in the collection.
		const animalsCollection = await animalsCollectionConnection();
		const animals = await animalsCollection.find({}).toArray();
		return animals;
	},

	async get(id) {
		// When given an id, this function will resolve to an animal from the database.
		if (!id) throw "No id provided";
		id = await convertID(id);
		const animalsCollection = await animalsCollectionConnection();
		const animal = await animalsCollection.findOne({_id: id});
		if (animal === null) throw `Get: Could not find an animal with id ${id}`;
		return animal;
	},

	async remove(id) {
		// This function will remove the animal from the database.
		if (!id) throw "No id provided";
		id = await convertID(id);
		const animalsCollection = await animalsCollectionConnection();
		const animal = await this.get(id);
		const deletionInfo = await animalsCollection.removeOne({_id:id});
		if (deletionInfo.deletedCount === 0) throw `Could not delete animal with id of ${id}`
		return {
			deleted: true,
			data: animal
		};
	},

	async rename(id, newName) {
		// This function will update the name of an animal currently in the database.
		if (!id) throw "No id provided";
		if (!newName) throw "No name provided";
		if (typeof newName !== "string") throw "New name must be a string";
		id = await convertID(id);
		const animal = await this.get(id);
		if (!animal) throw `Rename: No animal with id ${id}`;
		let newAnimal = {$set:{
			name: newName,
			animalType: animal.animalType
		}}
		const animalsCollection = await animalsCollectionConnection();
		const updateInfo = await animalsCollection.updateOne({_id:id}, newAnimal);
		if (updateInfo.modifiedCount === 0) throw "Could not update animal";
		return await this.get(id);
	}
}