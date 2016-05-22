var checkLogin = require('./checkLogin.js');
var renderHead = require('./renderHead.js');
var renderRMenu = require('./renderRMenu.js');
var renderWidget = require('./renderWidget.js');
var loadData = require('./loadData.js');
var getPathParam = require('./getPathParam.js');
var searchToJson = require('./searchToJson.js');
var collect = require('./collect.js');
var cancelCollect = require('./cancelCollect.js');
var informq = require('./informq.js');
var informa = require('./informa.js');
var checkEmail = require('./checkEmail.js');

module.exports = {
    checkLogin: checkLogin,
    renderHead: renderHead,
    renderRMenu: renderRMenu,
    renderWidget: renderWidget,
    loadData: loadData,
    getPathParam: getPathParam,
    searchToJson: searchToJson,
    collect: collect,
    cancelCollect: cancelCollect,
    informq: informq,
    informa: informa,
    checkEmail: checkEmail
};
