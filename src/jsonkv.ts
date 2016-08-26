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
export function toKv(source: Object, delimitation?: string): any {
    if (!delimitation) {
        delimitation = ".";
    }
    if (source === null || source === undefined) {
        return null;
    } else if (typeof source === "string" || typeof source === "number" || typeof source === "boolean") {
        return source;
    }

    let result: { [key: string]: any } = {};
    let traveler = (node: any, path: string): any => {
        if (typeof node === "string" || typeof node === "number" || typeof node === "boolean") {
            result[path] = node;
        } else if (isArrayLike(node)) {
            for (let i = 0; i < node.length; ++i) {
                traveler(node[i], (path || "").concat("[").concat(i + "").concat("]"));
            }
        } else if (isObject(node)) {
            let keys = Object.keys(node);
            keys.forEach(key => {
                let value = node[key];
                let newPath = path;
                if (!!newPath) {
                    newPath = newPath.concat(".");
                } else {
                    newPath = "";
                }
                newPath = newPath.concat(key);
                if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                    result[newPath] = node[key];
                } else if (isArrayLike(value)) {
                    for (let i = 0; i < value.length; ++i) {
                        traveler(value[i], newPath.concat("[").concat(i + "").concat("]"));
                    }
                } else if (isObject(value)) {
                    traveler(node[key], newPath);
                }
            });
        }
    };
    traveler(source, null);
    return result;
}


/**
 * Convert json to key value.
 * 
 * @export
 * @param {{ [key: string]: any }} source
 * @param {string} [delimitation]
 * @returns {*}
 */
export function toJson(source: { [key: string]: any }, delimitation?: string): any {
    if (!delimitation) {
        delimitation = ".";
    }
    if (source === null || source === undefined) {
        return null;
    } else if (typeof source === "string" || typeof source === "number" || typeof source === "boolean") {
        return source;
    }

    let keys = Object.keys(source);
    let root = {};
    let currentRoot = root;
    let subKey: string | number = null;
    let startArray: boolean = false;
    let indexKey: string = null;

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
                } else if (character === "]" && startArray) {
                    subKey = parseInt(indexKey, 10);
                } else if (!startArray) {
                    if (!subKey) {
                        subKey = character;
                    } else {
                        subKey = (subKey as string).concat(character);
                    }
                } else {
                    indexKey = indexKey.concat(character);
                }
            } else {
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
