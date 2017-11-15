export const replaceAll = (str, from, to) => {
    return str.replace(new RegExp(from, 'gm'), to)
};


export const mixin = (clazz, sources) => {
    sources.map(source => {
        clazz = source(clazz)
    });

    return clazz;
};