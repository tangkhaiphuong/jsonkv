import {toKv, toJson} from "./jsonkv";
const root = require("./data");

console.log(typeof true);

console.log("\r\nJSON object: ");
const left = JSON.stringify(root, null, "   ");
console.log(left);
let kv = toKv(root);
console.log("\r\nConvert to plain key-value: ");
console.log(kv);
let json = toJson(kv);
console.log("\r\nConvert back to json: ");
const right = JSON.stringify(json, null, "   ");
console.log(right);
console.log(right === left);
