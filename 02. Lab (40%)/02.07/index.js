const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const animalsRouter = require("./routes/animals");
const postsRouter = require("./routes/posts");
const likesRouter = require("./routes/likes");

app.use(bodyParser.json());
app.get("/", async (req, res) => {
	res.send("Hello world!");
});
app.use("/animals", animalsRouter);
app.use("/posts", postsRouter);
app.use("/likes", likesRouter);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log("Your routes will be running on http://localhost:3000");
})