const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const public = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");
const session = require('express-session');
const bcrypt = require('bcryptjs');
const users = require('./users');

// css
app.use("/public", public);

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// creating and setting handlebars engine
app.engine("hbs", exphbs.create({
	extname: 'hbs',
	defaultLayout: "main"
}).engine);
app.set("view engine", "hbs");

// creating AuthCookie session
app.use(session({
	name: 'AuthCookie',
	secret: 'some secret string!',
	resave: false,
	saveUninitialized: true
}));

// session logger
// app.use(session({
// 	name: "Logger",
// 	secret: 'logger gonna log',
// 	resave: false,
// 	saveUninitialized: true
// }));

app.use(async function (req, res, next) {
	// output the log to the console
	var date = new Date().toUTCString();
	var auth = (req.session.loggedIn) ? 'Authenticated' : 'Non-Authenticated';
	console.log(`[${date}]: ${req.method} ${req.originalUrl} (${auth} User)`);

	next()
});

async function isUser(username, password) {
	for (let i = 0; i < users.length; i++) {
		let user = users[i];
		if (username == user.username && await bcrypt.compare(password, user.hashedPassword))
			return true;
	}
	return false;
}

async function getUser(username) {
	for (let i = 0; i < users.length; i++) {
		let user = users[i];
		if (username == user.username)
			return user;
	}
	return false;
}

// routes
app.get("/", async (req, res) => {
	try {
		if (req.session.loggedIn)
			res.redirect("/private");
		let options = {
			title: "Login"
		};
		res.render("templates/login", options);
	} catch (error) {
		res.status(400);
		res.render("templates/error", {
			title: "Error",
			error: error
		});
	}
});

app.post("/login", async (req, res) => {
	try {
		if (await isUser(req.body.username, req.body.password)) {
			req.session.userName = req.body.username;
			req.session.loggedIn = true;
			res.redirect("/private")
		}
		else {
			let options = {
				title: "Login",
				error: "Incorrect username / password"
			};
			res.status(401);
			res.render("templates/login", options);
		}
	} catch (error) {
		res.status(400);
		res.render("templates/error", {
			title: "Error",
			error: error
		});
	}
});

app.get("/private", async (req, res, next) => {
	try {
		if (req.session.loggedIn) {
			let user = await getUser(req.session.userName);
			delete user.hashedPassword;
			res.render("templates/user", user);
			// next();
		}
		else {
			throw "User is not logged in!";
		}
		// res.render("templates/private", options);
	} catch (error) {
		res.status(403);
		res.render("templates/error", {
			title: "Error",
			error: error
		});
	}
});

app.get("/logout", async (req, res) => {
	try {
		// deleteAuthCookie
		delete req.session.userName;
		delete req.session.loggedIn;
		let options = {
			title: "Logout"
		};
		res.render("templates/logout", options);
	} catch (error) {
		res.status(400);
		res.render("templates/error", {
			title: "Error",
			error: error
		});
	}
})

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});