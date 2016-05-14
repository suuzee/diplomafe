require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var indexStr = require("./tpl/index.string");
var qListStr = require("./tpl/questionlist.string");
var utils = require("Utils/index");


var Home = {
    loadData: function (url, callback, container) {
        var self = this;
        container && $(container).addClass('loading');
        $.ajax({
            url: url,
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            method: 'get',
            data: {}
        }).done(function (res) {
            var data = !!res.data ? res.data : {};
            if (res.status !== 0) {
                alert('加载失败:' + res.message);
                return false;
            } else {
                callback && callback(data);
            }
        }).fail(function () {
            alert("加载失败");
        }).always(function () {
            // ...
            container && $(container).removeClass('loading');
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

        self.loadData('/diploma/question/getQuestionList', function (data) {
            var template = Hogan.compile(qListStr),
                outputHtml = template.render({
                data: data
            });
            $(container).append(outputHtml);
        }, container);
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
