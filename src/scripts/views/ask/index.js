require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var SimpleMDE = require("Jibs/simplemde");
var indexStr = require("./tpl/index.string");
var formStr = require("./tpl/form.string");
var tagItemStr = require("./tpl/tagItem.string");
var tagStr = require("./tpl/tag.string");
var addTagStr = require("./tpl/addTag.string");
var utils = require("Utils/index");

var Ask = {
    addEvent: function () {
        var self = this;

        $('.js-ask').on('click', function () {
            self.ask.call(self);
        });
    },
    handleCreateTag: function () {
        var self = this;
        $('.js-create-tag').on('click', function () {
            self.createTag.call(self);
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
                    container: '.js-select-tags select',
                    tpl: tagStr,
                    data: data
                });
                setTimeout(function () {
                    self.initAddTag();
                }, 500);
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
        data.tagsString = data.tags.toString();
        utils.loadData({
            url: '/diploma/question/saveQuestion',
            data: data,
            callback: function (data) {
                alert(data.message);
                window.location.href='index';
            },
            container: container,
            failMessage: '提问失败',
            method: 'post'
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
                        container: '.js-select-tags',
                        tpl: tagStr,
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
        self.getTags(function () {
            $('.js-select-tags').dropdown();
            self.initAddTag();
            self.handleCreateTag();
        });
    },
    initEditor: function () {
        var self = this;
        self.editor = new SimpleMDE({
            element: $('.js-editor')[0]
        });
    },
    initAddTag: function () {
        utils.renderWidget({
            container: '.js-select-tags .menu',
            tpl: addTagStr
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
