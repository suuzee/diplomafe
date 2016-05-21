require("Jibs/jquery");
var Hogan = require("Jibs/hogan");
var Semantic = require("Jibs/semantic");
var SimpleMDE = require("Jibs/simplemde");
var indexStr = require("./tpl/index.string");
var qusetionStr = require("./tpl/question.string");
var alistStr = require("./tpl/answerlist.string");
var clistStr = require("./tpl/commentlist.string");
var commentStr = require("./tpl/comment.string");
var utils = require("Utils/index");


var Question = {
    addEvents: function () {
        var self = this;
        $('.js-answer').on('click', function () {
            self.answer.call(self);
        });

        $('.js-alist-container').on('click', '.js-like', function (e) {
            self.like.call(self, $(this), e);
        });

        $('.js-alist-container').on('click', '.js-comment', function (e) {
            self.showCommentList.call(self, $(this), e);
        });

        $('.js-comment').on('click', function (e) {
            self.comment.call(self, $(this), e);
        });
    },
    look: function () {
        var self = this,
            questionId = utils.getPathParam();
        self.storage = !!self.storage ? self.storage : {};
        self.storage.questionId = questionId;
        utils.loadData({
            url: '/diploma/question/addLook',
            data: {
                questionId: questionId
            }
        });
    },
    comment: function (target, e) {
        var self = this,
            answerId = self.storage.answerId,
            container = '.js-comment-form';
        var commentDesc = $(container).form('get value', 'commentDesc');
        utils.loadData({
            url: '/diploma/comment/saveComment',
            data: {
                answerId: answerId,
                commentDesc: commentDesc
            },
            method: 'post',
            container: container,
            callback: function (data) {
                $(container).find('textarea').val('');
                self.getComments();
                var newCommentNum = parseInt($('.js-comment-num-' + answerId).text()) + 1;
                $('.js-comment-num-' + answerId).text(newCommentNum);
            }
        });
    },
    like: function (target, e) {
        var self = this;
        var answerId = target.parents('.answer-item').data('id');
        var container = '.js-like'
        utils.loadData({
            url: '/diploma/like/like',
            data: {
                answerId: answerId
            },
            callback: function (data) {
                var likeNum = target.next().text();
                target.next().text(parseInt(likeNum) + 1);
                target.addClass('disabled');
                target.next().addClass('disabled');
            }
        });
    },
    answer: function (e) {
        var self = this,
            container = '.js-answer-form-container',
            $form = '.js-answer-form',
            answerDesc = self.editor.markdown(self.editor.value()),
            questionId = self.storage.questionId ? self.storage.questionId : utils.getPathParam();
        utils.loadData({
            url: '/diploma/answer/saveAnswer',
            data: {
                questionId: questionId,
                answerDesc: answerDesc
            },
            container: container,
            method: 'post',
            callback: function (data) {
                $('.js-alist-container').empty();
                self.editor.value('');
                self.renderAnswers();
            }
        });
    },
    showCommentList: function (target, e) {
        var self = this,
            answerId = target.parents('.answer-item').data('id');
            container = '.js-comment-modal';
        self.storage = !!self.storage ? self.storage : {};
        self.storage.answerId = answerId;
        // $('.js-comments-container').empty();
        $(container).modal('show');
        self.getComments();
    },
    getComments: function () {
        var self = this,
            id = self.storage.answerId,
            container = '.js-comment-modal';
        utils.loadData({
            url: '/diploma/comment/getComments',
            data: {
                answerId: id
            },
            callback: function (data) {
                var container = '.js-comments-container';
                $(container).empty();
                utils.renderWidget({
                    container: container,
                    tpl: commentStr,
                    data: data
                });
            },
            container: container
        });
    },
    initEditor: function () {
        var self = this;
        self.editor = new SimpleMDE({
            element: $('.js-editor')[0]
        });
    },
    initWidgets: function () {
        var self = this;
        self.initEditor();
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
    renderQuestion: function () {
        var self = this,
            container = '.js-question-container',
            questionId = utils.getPathParam();
        self.storage = !!self.storage ? self.storage : {};
        self.storage.questionId = questionId;
        utils.loadData({
            url: '/diploma/question/getQuestion',
            data: {
                questionId: questionId
            },
            callback: function (data) {
                document.title = data.question.question_title;
                utils.renderWidget({
                    container: container,
                    tpl: qusetionStr,
                    data: data
                });
            },
            container: container
        });
    },
    renderAnswers: function () {
        var self = this,
            container = '.js-alist-container',
            questionId = self.storage.questionId ? self.storage.questionId : utils.getPathParam();
        utils.loadData({
            url: '/diploma/answer/getAnswers',
            data: {
                questionId: questionId
            },
            callback: function (data) {
                utils.renderWidget({
                    container: container,
                    tpl: alistStr,
                    data: data
                });
            },
            container: container
        });
    },
    renderComments: function () {
        var self = this,
            container = '.js-clist-container';
        utils.renderWidget({
            container: container,
            tpl: clistStr
        });
    },
    renderPage: function () {
        var self = this;
        self.renderIndex();
        self.renderHead();
        self.renderRmenu();
        self.renderQuestion();
        self.renderAnswers();
        self.renderComments();
        self.look();
    },
    render: function () {
        var self = this;
        self.renderPage();
        self.initWidgets();
        self.addEvents();
    }
};

$(function () {
    Question.render();
});
