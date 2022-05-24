const express = require(`express`);
const cors = require(`cors`);
const mysql = require(`mysql2`);

const app = express();

const connection = mysql.createConnection(
	{
		host: `sql11.freemysqlhosting.net`,
		user: `sql11494173`,
		password: `lshqlnynZV`,
		database: `sql11494173`,
		port: 3306
	});


const PORT = 8080;


app.use(cors());
app.use(express.json());


app.post(`/api`, async (req, res) => 
{
	const book = req.body;

	console.log(book);

	const query = `INSERT INTO books(author, title, genre, price) VALUES (?,?,?,?);`;
	const values = [book.author, book.title, book.genre, book.price];

	connection.query(query, values, (err, results) => 
	{
		if (err) { console.log(err); }
		res.json(results);
	});

	console.log(`Book added`);
});

app.get(`/api/:text`, (req, res) => 
{
	// let str
	try { var str = decodeURIComponent(req.params.text); }
	catch (err) 
	{
		if( err.message === `URI malformed`)
		{
			console.error(err.message);
			res.status(500).send({ error: `Bad URI you probably have an '%' on the search box, no sql injections allowed here :)` });
			
			return;
		}
		else
		{
			console.error(err);
			res.status(500).send({ error: `Something went wrong` });
			
			return;
		}
	}

	console.log(str);

	const query = `SELECT * FROM books WHERE TITLE LIKE '%${str}%';`;

	console.log(query);

	connection.query(query, (err, results) => 
	{
		if (err) { console.log(err); }
		res.json(results);
		console.log(results);
	});

});

app.listen(PORT, async () => 
{
	console.log(`Server running on port ${PORT} , http://localhost:${PORT}`);

	await connection.connect((err) => 
	{
		if (err) { throw err; }
		console.log(`Connected to database`);
	});

});