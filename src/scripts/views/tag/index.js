require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var indexStr = require("./tpl/index.string");
var qListStr = require("./tpl/questionlist.string");
var utils = require("Utils/index");


var Tag = {
    addEvents: function () {
        var self = this;

        $('.js-collect').on('click', function (e) {
            utils.collect.call(self, $(this), e);
        });

        $('.js-cancel-collect').on('click', function (e) {
            utils.cancelCollect.call(self, $(this), e);
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
    renderQuestionListByTag: function () {
        var self = this,
            container = '.js-qlist-container',
            tagId = utils.getPathParam();
        self.storage = !!self.storage ? self.storage : {};
        self.storage.tagId = tagId;
        utils.loadData({
            url: '/diploma/question/getQuestionsByTag',
            data: {
                tagId: tagId
            },
            callback: function (data) {
                document.title = data.tagName + '-知否';
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
        self.renderQuestionListByTag();
    },
    render: function () {
        var self = this;
        self.renderPage();
    }
};

$(function () {
    Tag.render();
});
