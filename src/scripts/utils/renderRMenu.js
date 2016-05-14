require('Jibs/jquery');
var Hogan = require('Jibs/hogan');
var checkLogin = require('./checkLogin');
var renderWidget = require('./renderWidget');
var rmenuStr = require("CommonStr/rightmenu.string");

module.exports = function () {
    var data = {
        noLogin: true
    };

    var loginUser = checkLogin();

    if (!!loginUser) {
        $.extend(data, {
            loginUser: loginUser
        });
        data.noLogin = false;
    }

    renderWidget({
        container: '.js-rmenu-container',
        tpl: rmenuStr,
        data: data
    });
};
