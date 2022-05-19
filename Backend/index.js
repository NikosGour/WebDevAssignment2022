const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
	host: "localhost",
	user: "user",
	password: "0101",
	database: "webdev"
});


const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {

	res.send("Testing")
});

app.post("/api", async (req, res) => {
	const book = req.body;
	console.log(book);

	connection.connect((err) => {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
		console.log("Connected to database");

	});
	console.log("after connection");
});

app.get("/api/:text", (req, res) => {
	let str = decodeURIComponent(req.params.text);
	console.log(str);
	res.end(str);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} , http://localhost:${PORT}`);
});