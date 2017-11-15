const mkdirp = require('mkdirp');

module.exports.log = function () {
    console.log(...arguments)
};


module.exports.error = function () {
    console.log(...arguments)
};


module.exports.mkdir = function (dir) {
    let rst = true;
    try {
        mkdirp.sync(dir);
    } catch (e) {
        rst = e;
    }

    return rst
};