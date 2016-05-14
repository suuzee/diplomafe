module.exports = function () {
    var user = JSON.parse(window.localStorage.getItem('login_user'));
    if (!!user) {

        if (user.user.user_name === "" || !!!user.user.user_name) {
            user.user.user_name = user.user.user_email;
        }
        return user.user;

    } else {
        return false;
    }
};
