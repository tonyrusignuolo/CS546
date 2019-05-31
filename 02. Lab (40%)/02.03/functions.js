const axios = require("axios");


const peopleURL = "https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json";
const workURL = "https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json";
const weatherURL = "https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json";


module.exports = {
	getPeople: async () => {
		const { data } = await axios.get(peopleURL);
		return data;
	},

	getWork: async() => {
		const {data} = await axios.get(workURL);
		return data;
	},

	getWeather: async () => {
		const {data} = await axios.get(weatherURL);
		return data;
	},

	typeCheck: async (arg, type) => {
		let argType = typeof arg;
		if (argType !== type) {
			throw "Error: arg is of type " + argType + ", not of type " + type;
		}
	}
}