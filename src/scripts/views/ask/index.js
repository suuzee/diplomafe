require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var SimpleMDE = require("Jibs/simplemde");
var indexStr = require("./tpl/index.string");
var formStr = require("./tpl/form.string");
var tagItemStr = require("./tpl/tagItem.string");
var addTagStr = require("./tpl/addTag.string");
var utils = require("Utils/index");

var Ask = {
    addEvent: function () {
        var self = this;

        $('.js-create-tag').on('click', function () {
            self.createTag.call(self);
        });

        $('.js-ask').on('click', function () {
            self.ask.call(self);
        });
    },
    createTag: function () {
        var self = this;
        var container = '.js-create-tag-container';
        var tagName = $(container).form('get value', 'new-tag');

        utils.loadData({
            url: '/diploma/tag/addTag',
            data: {
                tag_name: tagName
            },
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: tagItemStr,
                    data: data,
                    method: 'before'
                });
            },
            container: container,
            failMessage: '创建失败'
        });
    },
    ask: function () {
        var self = this,
            container = '.js-ask-form',
            editor = self.editor;
        var data = $(container).form('get values');
        data.description = editor.markdown(editor.value());
        debugger;
        utils.loadData({
            url: '/diploma/tag/addTag',
            data: {
                tagName: tagName
            },
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: tagItemStr,
                    data: data,
                    method: 'before'
                });
            },
            container: container,
            failMessage: '创建失败'
        });
    },
    getTags: function (callback) {
        var self = this,
            container = '.js-select-tags'
        utils.loadData({
            url: '/diploma/tag/getTags',
            container: container,
            callback: function (data) {
                debugger;
                var i = 0, len = data.length;
                for (; i < len; i ++) {
                    utils.renderWidget({
                        container: '.js-select-tags .menu',
                        tpl: tagItemStr,
                        data: data[i]
                    });
                }
                callback && callback();
            }
        });
    },
    initWidgets: function () {
        var self = this;
        self.initTags();
        self.initEditor();
    },
    initTags: function () {
        var self = this;
        $('.js-select-tags').dropdown();
        self.getTags(function () {
            utils.renderWidget({
                container: '.js-select-tags .menu',
                tpl: addTagStr
            });
        });
    },
    initEditor: function () {
        var self = this;
        self.editor = new SimpleMDE({
            element: $('.js-editor')[0]
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
    renderAskForm: function () {
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
        self.renderAskForm();
    },
    render: function () {
        var self = this;
        self.renderPage();
        self.initWidgets();
        self.addEvent();
    }
};

$(function () {
    Ask.render();
});
