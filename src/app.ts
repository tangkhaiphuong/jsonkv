import {toKv, toJson} from "./jsonkv";
const root = require("./generated");

console.log("\r\nJSON object: ");
console.log(root);
let kv = toKv(root);
console.log("\r\nConvert to plain key-value: ");
console.log(kv);
let json = toJson(kv);
console.log("\r\nConvert back to json: ");
console.log(json);

// Testing performance.
// let jsonString = JSON.stringify(root);
// let start = Date.now();
// for (let i = 0; i < 100000; ++i) {
//     JSON.parse(jsonString);
// }
// let end = Date.now();
// console.log("Time to JSON.parse: " + (end - start));


// let keyValue = toKv(root);
// let start2 = Date.now();
// for (let i = 0; i < 100000; ++i) {
//     toJson(keyValue);
// }
// let end2 = Date.now();
// console.log("Time to toJSON: " + (end2 - start2));
