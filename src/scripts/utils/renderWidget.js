require('Jibs/jquery');
var Hogan = require('Jibs/hogan');

// module.exports = function (container, tpl, data) {
module.exports = function (options) {
    var settings = {
        container: null,
        tpl: null,
        data: {},
        method: "append"
    };

    settings = $.extend(settings, options);

    if (!!settings.container) {
        $(settings.container).addClass('loading');

        var template = Hogan.compile(settings.tpl),
            outputHtml = template.render(settings.data);

        appendTemplate(settings.container, outputHtml, settings.method);
        $(settings.container).removeClass('loading');
    } else {
        alert("没有容器");
    }
};

function appendTemplate (container, content, method) {
    switch (method) {
        case 'append':
            $(container).append(content);
            break;
        case 'prepend':
            $(container).prepend(content);
            break;
        case 'before':
            $(container).before(content);
            break;
        case 'after':
            $(container).after(content);
            break;
    }
}
