const collections = require("./collections");
const postsCollectionConnection = collections.posts;
const dataAnimals = require("./animals");
const index = require("./index");

module.exports = {
	async create(title, authorId, content) {
		// This async function will resolve to the newly created post object with all of the properties from the posts schema
		if (!title) throw "posts create !title";
		if (typeof title !== "string") throw "posts create title.type";
		if (!authorId) throw "posts create !authorId";
		if (!dataAnimals.read(authorId)) throw "posts create !animal";
		if (!content) throw "posts create !content";
		if (typeof content !== "string") throw "posts create content type";
		let postsCollection = await postsCollectionConnection();
		let newPost = {
			title: title,
			author: await index.convertID(authorId),
			content: content
		};
		let insertInfo = await postsCollection.insertOne(newPost);
		if (insertInfo.insertedCount === 0) throw "posts create insertedCount == 0";
		let post = await this.read(insertInfo.insertedId);
		await dataAnimals.addPost(authorId, post._id);
		return post;
	},

	async read(id) {
		// When given an id, this function will resolve to a post from the database.
		if (!id) throw "posts read !id";
		id = await index.convertID(id);
		let postsCollection = await postsCollectionConnection();
		let post = await postsCollection.findOne({
			_id: id
		});
		if (post === null) throw `posts read !post`;
		return post;
	},

	async readAll() {
		// This function will resolve to an array of all posts in the collection.
		let postsCollection = await postsCollectionConnection();
		let posts = await postsCollection.find({}).toArray();
		return posts;
	},

	async update(id, newTitle = null, newContent = null) {
		// This function will update a post currently in the database.
		if (!id) throw "posts update !id";
		if (!newTitle && !newContent) throw "posts update !newTitle && !newContent";
		if (newTitle && typeof newTitle !== "string") throw "posts update newTitle type";
		if (newContent && typeof newContent !== "string") throw "posts update newContent type";
		id = await index.convertID(id);
		let post = await this.read(id);
		if (!post) throw "post update !post";
		let newPost = {
			$set: {
				title: (newTitle) ? newTitle : post.title,
				author: post.author,
				content: (newContent) ? newContent : post.content
			}
		}
		let postsCollection = await postsCollectionConnection();
		let updateInfo = await postsCollection.updateOne({
			_id: id
		}, newPost);
		if (updateInfo.modifiedCount === 0) throw "posts update modifiedCount == 0";
		return await this.read(id);
	},

	async delete(id) {
		// This function will remove the post from the database.
		if (!id) throw "posts delete !id";
		id = await index.convertID(id);
		let post = await this.read(id);
		let postsCollection = await postsCollectionConnection();
		let deletionInfo = await postsCollection.removeOne({
			_id: id
		});
		if (deletionInfo.deletedCount === 0) throw `posts delete deletedCount == 0`;
		// handle unliking after post is deleted
		return {
			deleted: true,
			data: post
		};
	}
}