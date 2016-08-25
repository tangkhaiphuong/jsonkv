"use strict";
const jsonkv_1 = require("./jsonkv");
const root = require("./data");
console.log("\r\nJSON object: ");
console.log(JSON.stringify(root, null, "   "));
let kv = jsonkv_1.toKv(root);
console.log("\r\nConvert to plain key-value: ");
console.log(kv);
let json = jsonkv_1.toJson(kv);
console.log("\r\nConvert back to json: ");
console.log(JSON.stringify(json, null, "   "));

//# sourceMappingURL=example.js.map
