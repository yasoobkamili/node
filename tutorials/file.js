const fs = require("fs");
const os = require("os");
console.log(os.cpus().length);
// writeFile overwrites over previous file
// sync...
// fs.writeFileSync("./test.txt", "hellowwwworld");

// async file , it does not return anything , and requires err
// fs.writeFile("./test.txt", "helloworkld", (err) => {});

//sync read
// let data = fs.readFileSync("./test.txt", "utf-8");
// console.log(data);

//async read fail
// let data = fs.readFile("./test.txt", "utf-8", (err) => {});  // this wont work as async wala doesnt return anything
// console.log(data);
// fs.appendFileSync("./test.txt", `${Date()} log\n`);

// fs.readFile("./test.txt", "utf-8", (err, result) => {
//   if (err) console.log("error reading file due to error:", err);
//   else console.log(result);
// });

// console.log(fs.statSync("./test.txt"));
