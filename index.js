const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const json = { url };

  res.setHeader("Content-Type", "application/json");

  if (url === "/") {
    json.message = "Welcome to the root";
  } else {
    json.message = `You accessed a specified route: ${url}`;
  }

  if (method === "POST" && url === "/") {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else if (method === "POST" && url === "/message") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // this will give us back a bunch of key value pairs of the request body
      const parsed = JSON.parse(parsedBody);

      fs.writeFile("message.txt", parsed.message, (err) => {
        if (!err) {
          json.message = `I received the message: ${parsed.message}`;
          res.write(JSON.stringify(json));
          return res.end();
        }

        json.message = `Error!`;
        res.write(JSON.stringify(json));
      });
    });
  }

  res.write(JSON.stringify(json));
  res.end();
});

server.listen(3000);
