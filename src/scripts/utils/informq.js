var checkLogin = require('./checkLogin');
var loadData = require('./loadData');
module.exports = function (target, e) {
    var self = this;
    var user = checkLogin();
    if (!!user) {
        loadData({
            url: '/diploma/inform/informq',
            callback: function (data) {
                alert('举报' + data.message);
                target.addClass('disabled');
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
