const http = require("http");

const server = http.createServer((req, res) => {
	let response = {};

	switch (req.url) {
		case "/api":
			if (req.method === "GET") {
				res.writeHead(200, { "Content-Type": "application/json" });
				response = { body: "Success" };
				res.end(JSON.stringify(response));
			} else if (req.method === "POST") {
				res.writeHead(300);
				res.end("oxi");
			}
			break;

		default:
			res.writeHead(404, { "Content-Type": "application/json" });
			response = { body: "Not found" };
			res.end(JSON.stringify(response));
			break;
	}
	console.log("Hello World");
	console.log(response);
});

const PORT = 5050;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
