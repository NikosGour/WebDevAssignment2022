const http = require("http");

const server = http.createServer(async (req, res) => {
	let debug = {};
	let response = {};
	headers = {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	};

	debug.url = req.url;
	debug.method = req.method;

	let match = req.url.match(/api\/(.+)?/);
	if (req.url === "/api") {
		if (req.method === "GET") {
			res.writeHead(200, headers);
			response = { body: "Success" };
			res.end(JSON.stringify(response));
		} else if (req.method === "POST") {
			response = { body: "Book added successfully" };

			let body = "";
			req.on("data", (data) => {
				body += data;
			});

			req.on("end", () => {
				headers["Access-Control-Allow-Methods"] = "GET,POST";
				res.writeHead(200, headers);
				res.end(JSON.stringify(response));
			});

			if (body === "") {
				await setTimeout(() => 0, 500);
			}

			debug.request_body = JSON.parse(body);
		} else if (req.method === "OPTIONS") {
			headers["Access-Control-Allow-Headers"] = "*";
			res.writeHead(200, headers);
			response = { body: "Options Success" };
			res.end(JSON.stringify(response));
		}
	} else if (match != null) {
		let utf_decoded_body = decodeURIComponent(match[1]);
		res.writeHead(404, headers);
		response = { body: `Not ${utf_decoded_body}` };
		res.end(JSON.stringify(response));
	} else {
		res.writeHead(404, headers);
		response = { body: "Not found" };
		res.end(JSON.stringify(response));
	}

	debug.response = response;
	console.log(`${JSON.stringify(debug, null, "\t")}`);
	console.log("-".repeat(100));
});

const { PORT, URL } = require("./setting.json");

server.listen(PORT, () => {
	console.log("-".repeat(100));
	console.log(`Server running on port ${PORT}`);
	console.log("-".repeat(100));
});
