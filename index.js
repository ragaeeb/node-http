const http = require("http");

const server = http.createServer((req, res) => {
  const { url } = req;
  const json = { url };

  res.setHeader("Content-Type", "application/json");

  if (url === "/") {
    json.message = "Welcome to the root";
  } else {
    json.message = `You accessed a specified route: ${url}`;
  }

  res.write(JSON.stringify(json));
  res.end();
});

server.listen(3000);
