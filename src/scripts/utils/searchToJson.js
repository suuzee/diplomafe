'use strict'

module.exports = function () {
    if (!!window.location.search) {
        let search = window.location.search.replace(/\?/, "");
        let searchArr = search.split("&");
        let obj = {};

        searchArr.forEach((item, index) => {
            let itemArr = item.split("=");
            obj[itemArr[0]] = itemArr[1];
        });
        return obj;
    } else {
        return false;
    }
};
