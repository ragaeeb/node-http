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

  if (method === "POST") {
    fs.writeFileSync("message.txt", "Hello");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.write(JSON.stringify(json));
  res.end();
});

server.listen(3000);
