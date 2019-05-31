const express = require("express");
const app = express();
const public = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");

app.use("/public", public);
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.get("/", async (req, res) => {
	try {
		let options = {
			title: "Is Prime?"
		}
		res.render("templates/form", options);
	} catch (err) {
		res.status();
		res.render("templates/error", {
			title: "Error", 
			error: err
		});
	}
});

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});