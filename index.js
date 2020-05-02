const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.setHeader("Content-Type", "application/json");

  const json = {
    url: req.url,
  };

  res.write(JSON.stringify(json));
  res.end();
});

server.listen(3000);
