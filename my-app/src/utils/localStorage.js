/**
 * returns key from localStorage or defaultValue if no key is there
 */
function getKeyFromLocalStorage(key, defaultValue) {
    let result = JSON.parse(window.localStorage.getItem(key));
    // if locStor does not cont result we get null, so
    return result !== null ? result : defaultValue;
}

/**
 * pushes {key1: value1, key2?: value2?, ...} from dict to localStorage
 */
function pushDictToLocalStorage(dictionary) {
    for (const [key, value] of Object.entries(dictionary)) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

function isKeyInLocalStorage(key) {
    let result = JSON.parse(window.localStorage.getItem(key));
    let isIn = result !== null && result.length !== 0;
    return isIn;
}

export {
    getKeyFromLocalStorage,
    pushDictToLocalStorage,
    isKeyInLocalStorage
};
