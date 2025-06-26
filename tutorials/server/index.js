const http = require("http");
const fs = require("fs");
// const url = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send(`hello ${req.query.name} from home page`);
});

app.get("/about", (req, res) => {
  return res.send(`hi ${req.query.name} from about`);
});
const port = 8001;
app.listen(port, () => console.log(`server started at port ${port} `));

// the below commented part was without using express, we had to handle all the cases manually
// const myServer = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: New Request Recieved: ${req.method}: ${
//     req.url
//   }\n`;
//   const myUrl = url.parse(req.url, true);
//   // console.log(myUrl);
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         res.end("hi from home page");
//         break;
//       case "/about":
//         const username = myUrl.query.myname;
//         res.end(`Hi, ${username}`);
//         break;
//       case "/search":
//         const search = myUrl.query.search_query;
//         res.end(`Results for ${search}`);
//         break;
//       case "/signup":
//         if (req.method === "GET") res.end("this is a signup form");
//         else if (req.method === "POST") res.end("signup success");
//       default:
//         res.end("404 Page Not Found");
//     }
//   });
// });
// const port = 8001;
// myServer.listen(port, () =>
//   console.log(`Server started successfully at port ${port}`)
// );
