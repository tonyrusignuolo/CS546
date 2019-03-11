const animalsModule = require("./data/animals");
const connections = require("./data/connections");

async function main() {
	// 1
	console.log("1.\n")
	let sasha = await animalsModule.create("Sasha", "Dog");
	console.log("Sasha created!\n")
	
	// 2
	console.log("2.\n")
	console.log(sasha);
	console.log("\n")

	// 3
	console.log("3.\n")
	const lucy = await animalsModule.create("Lucy", "Dog");
	console.log("Lucy created!\n")

	// 4
	console.log("4.\n")
	let animals = await animalsModule.getAll();
	console.log(animals);
	console.log("\n")

	// 5
	console.log("5.\n")
	const duke = await animalsModule.create("Duke", "Walrus");
	console.log("Duke created!\n")

	// 6
	console.log("6.\n")
	console.log(duke);
	console.log("\n")

	// 7
	console.log("7.\n")
	const sashita = await animalsModule.rename(sasha._id.toString(), "Sashita");
	console.log("Sasha renamed!\n")

	// 8
	console.log("8.\n")
	console.log(sashita);
	console.log("\n")

	// 9
	console.log("9.\n")
	const deletionInfo = await animalsModule.remove(lucy._id.toString());
	console.log(deletionInfo);
	console.log("\n")

	// 10
	console.log("10.\n")
	animals = await animalsModule.getAll();
	console.log(animals);
	console.log("\n")

	const db = await connections();
	await db.serverConfig.close();
	console.log("Done!");
}

main().catch(async error => {
	console.log("Error:");
	console.log(error);
	const db = await connections();
	await db.serverConfig.close();
});