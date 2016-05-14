require('Jibs/jquery');
var Hogan = require('Jibs/hogan');
var checkLogin = require('./checkLogin');
var renderWidget = require('./renderWidget');
var headStr = require("CommonStr/header.string");

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
        container: '.js-head-container',
        tpl: headStr,
        data: data
    });

    // 绑定登出事件
    doLogout();

    // 初始化menu
    initMenu();
};

function doLogout () {
    $('.js-logout').on('click', function () {
        window.localStorage.removeItem('login_user');
    });
}

function initMenu () {
    $('.js-user-menu').dropdown();
}
