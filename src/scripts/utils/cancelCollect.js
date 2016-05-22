var checkLogin = require('./checkLogin');
var loadData = require('./loadData');
module.exports = function (target, e) {
    var self = this;
    var user = checkLogin();
    if (!!user) {
        loadData({
            url: '/diploma/collect/cancelCollect',
            callback: function () {
                target.removeClass('js-cancel-collect');
                target.addClass('js-collect');
                target.text('收藏');
            },
            data: {
                userId: user.user_id,
                questionId: target.data('id')
            }
        });
    } else {
        alert('请先登录！');
    }
};
