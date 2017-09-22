/**判断浏览器是否支持web storage
 *返回true为支持，
 *false为不支持
 */
function checkStorageSupport() {
    var result = {};
    //sessionStorage
    if (window.sessionStorage) {
        result.sessionStorage = true;
    } else {
        result.sessionStorage = false;
    }
    //localStorage
    if (window.localStorage) {
        result.localStorage = true;
    } else {
        result.localStorage = false;
    }
    return result;
}
//判断是否支持webstorage
function isSupport(obj) {
    // 默认浏览器支持web storage
    var result = true;
    if (obj === localStorage) {
        result = checkStorageSupport().localStorage;
    } else if (obj === sessionStorage) {
        result = checkStorageSupport().sessionStorage;
    }
    if (!result) {
        alert('浏览器不支持web storage');
        return false;
    }
    return true;
}
// 存储web storage
function setWebStorage(obj, key, value) {
    if (!isSupport(obj)) {
        return false;
    }
    // 存储localStorage
    obj.setItem(key, value);
}
// 获取web storage
function getWebStorage(obj, key) {
    if (!isSupport(obj)) {
        return false;
    }
    // 存储localStorage
    return obj.getItem(key);
}
// 清除某个键名对应的数据
function clearWebStorage(obj, key) {
    if (!isSupport(obj)) {
        return false;
    }
    // 存储localStorage
    obj.removeItem(key);
}
//清除所有保存的数据
function clearAll(obj) {
    if (!isSupport(obj)) {
        return false;
    }
    // 存储localStorage
    obj.clear();
}
/**test*/
function init() {
    // 存储并获取localStorage
    setWebStorage(localStorage, "name", "liming");
    setWebStorage(localStorage, "age", "18");
    setWebStorage(sessionStorage, "name", "litao");
    setWebStorage(sessionStorage, "age", "19");
    var result = getWebStorage(localStorage, "name");
    var elem = document.getElementById('showDiv');
    elem.innerHTML = result;
    //clearWebStorage(localStorage, "name");
    clearAll(localStorage);
    //遍历集合
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            console.log(key+":"+localStorage[key]);
        }
    }
    var length = localStorage.length;
    for (var i = 0; i < length; i++) {
        key = localStorage.key(i);
        console.log(key+":"+localStorage.getItem(key));
    }

}
init();
