var searchToJson = require('./searchToJson.js');

module.exports = function (value) {

    if (!!!value) {
        if (!!window.location.pathname) {
            var param = window.location.pathname.split('/');
            return param[param.length - 1];
        } else {
            return false;
        }
    } else {
        if (!!searchToJson()) {
            return searchToJson().value;
        } else {
            return false;
        }
    }
}
