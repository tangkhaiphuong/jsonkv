"use strict";
const jsonkv_1 = require("./jsonkv");
const root = require("./data");
console.log(typeof true);
console.log("\r\nJSON object: ");
const left = JSON.stringify(root, null, "   ");
console.log(left);
let kv = jsonkv_1.toKv(root);
console.log("\r\nConvert to plain key-value: ");
console.log(kv);
let json = jsonkv_1.toJson(kv);
console.log("\r\nConvert back to json: ");
const right = JSON.stringify(json, null, "   ");
console.log(right);
console.log(right === left);

//# sourceMappingURL=example.js.map
