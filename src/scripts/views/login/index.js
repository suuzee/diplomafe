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
    loadData: function (url, data, callback, container, method) {
        var self = this;
        data = !!data ? data : {};
        container && $(container).addClass('loading');
        method = !!method ? method : 'get';
        contentType = !!(method === 'post')
                    ? 'application/x-www-form-urlencoded'
                    : 'application/json;charset=UTF-8';
        $.ajax({
            url: url,
            dataType: 'json',
            contentType: contentType,
            method: method,
            data: data
        }).done(function (res) {
            var data = !!res.data ? res.data : {};
            if (res.status !== 0) {
                alert('加载失败: ' + res.message);
                return false;
            } else {
                callback && callback(data);
            }
        }).fail(function (a, b, c) {
            alert("加载失败: " + c);
        }).always(function () {
            // ...
            container && $(container).removeClass('loading');
        });
    },
    doLogin: function (e) {
        var self = this,
            container = '.js-login-form';
            data = $(container).form('get values');
        self.loadData('/diploma/user/doLogin', data, function (data) {
            window.localStorage.setItem('login_user', JSON.stringify(data));
            window.location.href = '/diploma';
        }, container, 'post');
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
