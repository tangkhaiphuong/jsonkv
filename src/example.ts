import {toKv, toJson} from "./jsonkv";
const root = require("./data");

console.log("\r\nJSON object: ");
console.log(JSON.stringify(root, null, "   "));
let kv = toKv(root);
console.log("\r\nConvert to plain key-value: ");
console.log(kv);
let json = toJson(kv);
console.log("\r\nConvert back to json: ");
console.log(JSON.stringify(json, null, "   "));
