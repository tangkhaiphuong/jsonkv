"use strict";
let MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
let isArrayLike = function (collection) {
    let length = collection.length;
    return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
};
let isObject = function (obj) {
    let type = typeof obj;
    return type === "function" || type === "object" && !!obj;
};
/**
 * Convert json object to plained key value.
 *
 * @export
 * @param {Object} source Json object.
 * @param {string} [delimitation="."] Default access delimitation.
 */
function toKv(source, delimitation) {
    if (!delimitation) {
        delimitation = ".";
    }
    if (source === null || source === undefined) {
        return null;
    }
    else if (typeof source === "string" || typeof source === "number") {
        return source;
    }
    let result = {};
    let traveler = (node, path) => {
        if (typeof node === "string" || typeof node === "number") {
            result[path] = node;
        }
        else if (isArrayLike(node)) {
            for (let i = 0; i < node.length; ++i) {
                traveler(node[i], (path || "").concat("[").concat(i + "").concat("]"));
            }
        }
        else if (isObject(node)) {
            let keys = Object.keys(node);
            keys.forEach(key => {
                let value = node[key];
                let newPath = path;
                if (!!newPath) {
                    newPath = newPath.concat(".");
                }
                else {
                    newPath = "";
                }
                newPath = newPath.concat(key);
                if (typeof value === "string" || typeof value === "number") {
                    result[newPath] = node[key];
                }
                else if (isArrayLike(value)) {
                    for (let i = 0; i < value.length; ++i) {
                        traveler(value[i], newPath.concat("[").concat(i + "").concat("]"));
                    }
                }
                else if (isObject(value)) {
                    traveler(node[key], newPath);
                }
            });
        }
    };
    traveler(source, null);
    return result;
}
exports.toKv = toKv;
/**
 * Convert json to key value.
 *
 * @export
 * @param {{ [key: string]: any }} source
 * @param {string} [delimitation]
 * @returns {*}
 */
function toJson(source, delimitation) {
    if (!delimitation) {
        delimitation = ".";
    }
    if (source === null || source === undefined) {
        return null;
    }
    else if (typeof source === "string" || typeof source === "number") {
        return source;
    }
    let keys = Object.keys(source);
    let root = {};
    let currentRoot = root;
    let subKey = null;
    let startArray = false;
    let indexKey = null;
    for (let i = 0; i < keys.length; ++i) {
        let key = keys[i];
        currentRoot = root;
        subKey = null;
        startArray = false;
        indexKey = null;
        for (let index = 0; index < key.length; ++index) {
            let character = key[index];
            if (character !== delimitation) {
                if (character === "[") {
                    startArray = true;
                    indexKey = "";
                    if (!currentRoot[subKey]) {
                        currentRoot[subKey] = new Array();
                    }
                    currentRoot = currentRoot[subKey];
                }
                else if (character === "]" && startArray) {
                    subKey = parseInt(indexKey, 10);
                }
                else if (!startArray) {
                    if (!subKey) {
                        subKey = character;
                    }
                    else {
                        subKey = subKey.concat(character);
                    }
                }
                else {
                    indexKey = indexKey.concat(character);
                }
            }
            else {
                if (!currentRoot[subKey]) {
                    currentRoot[subKey] = {};
                }
                currentRoot = currentRoot[subKey];
                subKey = null;
                startArray = false;
            }
        }
        currentRoot[subKey] = source[key];
    }
    return root["null"] || root;
}
exports.toJson = toJson;

//# sourceMappingURL=jsonkv.js.map
