export const replaceAll = (str, from, to) => {
    return str.replace(new RegExp(from, 'gm'), to)
}
