const people = require("./people");
const work = require("./work");
const weather = require("./weather");


async function main() {
	const test = await work.findTheHacker();
	console.log(test);
}

main().catch(err => {
	console.log(err);
});