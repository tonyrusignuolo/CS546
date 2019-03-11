module.exports = {
	isProperString: (arg) => {
		if (arg == undefined) {
			throw "string is undefined";
		}
		if (typeof arg !== "string") {
			throw "not a string";
		}
	},

	isProperInt: (arg) => {
		if (typeof arg !== "number") {
			throw "arg is not a number"
		}
	},

	isProperArray: (arg) => {
		if (arg == undefined) {
			throw "array is undefined";
		}
		if (Array.isArray(arg) != true) {
			throw "not an array";
		} else if (arg.length == 0) {
			throw "array is empty"
		}
	},

	isProperInt: (arg) => {
		if (typeof arg !== "number") {
			throw "arg is not a number"
		}
	},

	isProperObject: (arg) => {
		if (arg == undefined) {
			throw "object is undefined";
		}
		if (typeof arg !== "object") {
			throw "not an object";
		}
	},

	isProperFunction: (arg) => {
		if (typeof arg !== "function") {
			throw "arg not a function";
		}
	}
}