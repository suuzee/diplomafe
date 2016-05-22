require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var indexStr = require("./tpl/index.string");
var formStr = require("./tpl/form.string");
var utils = require("Utils/index");

var Login = {
    addEvent: function () {
        var self = this;

        $('.js-login').on('click', function () {
            self.doLogin.call(self);
        });
    },
    doLogin: function (e) {
        var self = this,
            container = '.js-login-form';
            data = $(container).form('get values');
        utils.loadData({
            url: '/diploma/user/doLogin',
            data: data,
            callback: function (data) {
                window.localStorage.setItem('login_user', JSON.stringify(data));
                window.location.href = '/diploma';
            },
            container: container,
            method: 'post'
        });
    },
    renderIndex: function () {
        var self = this;

        utils.renderWidget({
            container: 'body',
            tpl: indexStr
        });
    },
    renderHead: function () {
        var self = this;

        utils.renderHead();
    },
    renderRmenu: function () {
        var self = this;
        utils.renderRMenu();
    },
    renderLoginForm: function () {
        var self = this;

        utils.renderWidget({
            container: '.js-qlist-container',
            tpl: formStr
        });
    },
    renderPage: function () {
        var self = this;
        self.renderIndex();
        self.renderHead();
        self.renderRmenu();
        self.renderLoginForm();
    },
    render: function () {
        var self = this;
        self.renderPage();
        self.addEvent();
    }
};

$(function () {
    Login.render();
});
