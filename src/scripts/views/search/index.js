require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var indexStr = require("./tpl/index.string");
var qListStr = require("./tpl/questionlist.string");
var utils = require("Utils/index");


var Home = {
    addEvents: function () {
        var self = this;

        $('.js-collect').on('click', function (e) {
            utils.collect.call(self, $(this), e);
        });

        $('.js-cancel-collect').on('click', function (e) {
            utils.cancelCollect.call(self, $(this), e);
        });

        $('.js-informq').on('click', function (e) {
            utils.informq.call(self, $(this), e);
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
    renderQuestionList: function () {
        var self = this,
            container = '.js-qlist-container';

        utils.loadData({
            url: '/diploma/question/getQuestions',
            data: {
                keyword: decodeURIComponent(utils.searchToJson().keyword)
            },
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: qListStr,
                    data: data
                });
                self.addEvents();
            },
            container: container
        });
    },
    renderPage: function () {
        var self = this;
        self.renderIndex();
        self.renderHead();
        self.renderRmenu();
        self.renderQuestionList();
    },
    render: function () {
        var self = this;
        self.renderPage();
    }
};

$(function () {
    Home.render();
});
