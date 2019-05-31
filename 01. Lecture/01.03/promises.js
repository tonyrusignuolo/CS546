console.log("Start");

let itemSet = () => {
	let itemCount = 1;

	let items = [
		{id: itemCount++, item: "Item 1"},
		{id: itemCount++, item: "Item 2"}
		// {id: itemCount++, item: "Item 3"}
	];

	return {
		addItem: (item) => {
			return new Promise((fulfill, reject) => {
				if (!item) reject("You did not provide an item");
				fulfill(items.push({id: itemCount++, item: "Items 1"}));
			});
		},
		getItem: () => {
			return new Promise((fulfill, reject) => {
				setTimeout(() => {
					if (items.length > 0) fulfill(items.shift());
					reject("Frig off!");
				}, 750);
			});
		}
	}
}

let firstItemSet = itemSet();

let firstChain = firstItemSet.getItem().then((firstItem) => {
	console.log("You got a new item");
	console.log(firstItem);

	return firstItemSet.getItem().then((secondItem) => {
		console.log("You got a second item");
		console.log(secondItem);

		return firstItemSet.getItem().then((thirdItem) => {
			console.log("You got a third item");
			console.log(thirdItem);
			return firstItemSet.getItem().then((fourthItem) => {
				return [firstItem, secondItem, thirdItem, fourthItem];
			}).catch(() => {
				console.log("There was no fourth item");
				return [firstItem, secondItem, thirdItem];
			});
		}).catch(() => {
			console.log("Frig off here!");
			return [firstItem, secondItem]
		});
	});
}).then((items) => {
	console.log("All the items were: ");
	console.log(items);
	return items;
}, (error) => {
	console.log("There was an error: ");
	console.log(error) 
});


// let readResult = readFileAndReturnPromiseWithContent("data.txt");

// readResult.then((fileContent) => {
// 	// return string split into an array of paragraphs
// 	return fileContent.split("\n");
// }).then((paragraphArray) => {
// 	let newFileText = JSON.stringify(paragraphArray);
// 	returnwriteFileAndReturnPromise(newFileText);
// }, (readFileError) => {
// 	console.error("Error splitting text or reading file; returning an empty array");
// 	return [];
// }).then(() => {
// 	console.log("Everything has worked!");
// }, (error) => {
// 	console.log("An error has occured writing the file!");
// 	console.error(error);
// })