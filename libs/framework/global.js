global.require_ = (path) => {
    return require(path).default;
};