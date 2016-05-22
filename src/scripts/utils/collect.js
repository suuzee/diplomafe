var checkLogin = require('./checkLogin');
var loadData = require('./loadData');
module.exports = function (target, e) {
    var self = this;
    var user = checkLogin();
    if (!!user) {
        loadData({
            url: '/diploma/collect/collect',
            callback: function () {
                target.removeClass('js-collect');
                target.addClass('js-cancel-collect');
                target.text('取消收藏');
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
