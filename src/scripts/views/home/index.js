require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var indexStr = require("./tpl/index.string");
var qListStr = require("./tpl/questionlist.string");
var utils = require("Utils/index");


var Home = {
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
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: qListStr,
                    data: data
                });
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
