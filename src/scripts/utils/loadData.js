module.exports = function (options) {
    var settings = {
        url: null,
        data: {},
        callback: null,
        container: null,
        method: 'get',
        contentType: 'application/json;charset=UTF-8',
        failMessage: '加载失败',
        failCallback: function (jqXHR, textStatus, errorThrown) {
            alert(settings.failMessage + ": " + errorThrown);
        }
    };

    settings = $.extend(settings, options);

    if (settings.method === 'post') {
        settings.contentType = 'application/x-www-form-urlencoded';
    }

    settings.container && $(settings.container).addClass('loading');
    $.ajax({
        url: settings.url,
        dataType: 'json',
        contentType: settings.contentType,
        method: settings.method,
        data: settings.data
    }).done(function (res) {
        var data = !!res.data ? res.data : {};
        if (res.status !== 0) {
            alert(settings.failMessage + ': ' + res.message);
            return false;
        } else {
            settings.callback && settings.callback(data);
        }
    }).always(function () {
        settings.container && $(settings.container).removeClass('loading');
    }).fail(settings.fillCallback);
}
