require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var indexStr = require("./tpl/index.string");
var formStr = require("./tpl/form.string");
var utils = require("Utils/index");

var Regist = {
    addEvent: function () {
        var self = this;

        $('.js-register').on('click', function () {
            self.doRegister.call(self);
        });
    },
    doRegister: function (e) {
        var self = this,
            container = '.js-register-form';
        var data = $(container).form('get values');
        if (data.password !== data.password2) {
            alert('两次密码输入不一致');
        } else if (utils.checkEmail(data.email) === false) {
            alert('不正确的邮箱格式');
        } else {
            // 检测有没有重复的
            utils.loadData({
                url: '/diploma/user/checkEmail',
                data: {
                    email: data.email
                },
                callback: function (info) {
                    if (info.message === 'success') {
                        utils.loadData({
                            url: '/diploma/user/doRegister',
                            data: data,
                            callback: function (info) {
                                alert(info.message);
                                window.location.href = '/diploma/login';
                            },
                            container: container,
                            method: 'post'
                        });
                    } else {
                        alert('系统中已存在该账号');
                    }
                }
            });
        }
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
    renderRegisterForm: function () {
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
        self.renderRegisterForm();
    },
    render: function () {
        var self = this;
        self.renderPage();
        self.addEvent();
    }
};

$(function () {
    Regist.render();
});
