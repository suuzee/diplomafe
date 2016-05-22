require('Jibs/jquery');
var Hogan = require('Jibs/hogan');
var checkLogin = require('./checkLogin');
var renderWidget = require('./renderWidget');
var loadData = require('./loadData');
var rmenuStr = require("CommonStr/rightmenu.string");

module.exports = function () {

    loadData({
        url: '/diploma/question/getHotQuestions',
        callback: function(data) {
            renderWidget({
                container: '.js-rmenu-container',
                tpl: rmenuStr,
                data: data
            });
        },
        container: '.js-hot-questions'
    });
};
