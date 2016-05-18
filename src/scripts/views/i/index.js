require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var indexStr = require("./tpl/index.string");
var userStr = require("./tpl/user.string");
var statisticsStr = require("./tpl/statistics.string");
var tabStr = require("./tpl/tab.string");
var utils = require("Utils/index");


var I = {
    initTab: function () {
        var self = this;

        $('.js-myself-tab .item').tab();
    },
    initUpload: function () {
        var self = this;

        $('.myself .image').dimmer({
            on: 'hover'
        });
    },
    initWidgets: function () {
        var self = this;
        self.initUpload();
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
    renderUser: function () {
        var self = this,
            container = '.js-user-container';
        self.storage = !!self.storage ? self.storage : {};
        var userId = self.storage.userId = !!self.storage.userId ? self.storage.userId : utils.getPathParam();
        utils.loadData({
            url: '/diploma/user/getUser',
            data: {
                userId: userId
            },
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: userStr,
                    data: data
                });
            },
            container: container
        });
    },
    renderStatistics: function () {
        var self = this,
            container = '.js-statistics-container';

        self.storage = !!self.storage ? self.storage : {};
        var userId = self.storage.userId = !!self.storage.userId ? self.storage.userId : utils.getPathParam();

        utils.loadData({
            url: '/diploma/question/getQuestionNumByUserId',
            data: {
                userId: userId
            },
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: statisticsStr,
                    data: data
                });
            },
            container: container
        });
    },
    renderTab: function () {
        var self = this,
            container = '.myself';

        self.storage = !!self.storage ? self.storage : {};
        var userId = self.storage.userId = !!self.storage.userId ? self.storage.userId : utils.getPathParam();

        utils.loadData({
            url: '/diploma/question/getQuestionByUserId',
            data: {
                userId: userId
            },
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: tabStr,
                    data: data
                });
                self.initTab();
            },
            container: container
        });
    },
    renderPage: function () {
        var self = this;
        self.renderIndex();
        self.renderHead();
        self.renderRmenu();
        self.renderUser();
        self.renderStatistics();
        self.renderTab();
    },
    render: function () {
        var self = this;
        self.renderPage();
        self.initWidgets();
    }
};

$(function () {
    I.render();
});
