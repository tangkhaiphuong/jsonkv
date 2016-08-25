import {toKv, toJson} from "./jsonkv";
const stopwatch = require("node-stopwatch").Stopwatch;
const JSON2 = require("JSON2");
const root = require("./data");

const NUMBER_TRY = 100000;

const testJSONParse = () => {

    let jsonString = JSON.stringify(root);

    let sw = stopwatch.create();
    sw.start();

    for (let i = 0; i < NUMBER_TRY; ++i) {
        JSON.parse(jsonString);
    }

    sw.stop();
    console.log("Time to JSON.parse:", sw.elapsedMilliseconds + " ms");
};

const testJSON2Parse = () => {

    let jsonString = JSON.stringify(root);

    let sw = stopwatch.create();
    sw.start();

    for (let i = 0; i < NUMBER_TRY; ++i) {
        JSON2.parse(jsonString);
    }

    sw.stop();
    console.log("Time to JSON2.parse:", sw.elapsedMilliseconds + " ms");
};

const testKVJSONParse = () => {

    let sw = stopwatch.create();
    sw.start();

    let keyValue = toKv(root);
    for (let i = 0; i < NUMBER_TRY; ++i) {
        toJson(keyValue);
    }

    sw.stop();
    console.log("Time to jsonkv.toJSON:", sw.elapsedMilliseconds + " ms");
};


testJSONParse();
testJSON2Parse();
testKVJSONParse();
