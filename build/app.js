"use strict";
const jsonkv_1 = require("./jsonkv");
const JSON2 = require("JSON2");
const root = require("./generated");
// console.log("\r\nJSON object: ");
// console.log(root);
// let kv = toKv(root);
// console.log("\r\nConvert to plain key-value: ");
// console.log(kv);
// let json = toJson(kv);
// console.log("\r\nConvert back to json: ");
// console.log(json);
const numberTry = 100000;
// // Testing performance.
let jsonString = JSON.stringify(root);
let start = Date.now();
for (let i = 0; i < numberTry; ++i) {
    JSON.parse(jsonString);
}
let end = Date.now();
console.log("Time to JSON.parse: " + (end - start));
start = Date.now();
for (let i = 0; i < numberTry; ++i) {
    JSON2.parse(jsonString);
}
end = Date.now();
console.log("Time to JSON2.parse: " + (end - start));
let keyValue = jsonkv_1.toKv(root);
let start2 = Date.now();
for (let i = 0; i < numberTry; ++i) {
    jsonkv_1.toJson(keyValue);
}
let end2 = Date.now();
console.log("Time to toJSON: " + (end2 - start2));

//# sourceMappingURL=app.js.map
