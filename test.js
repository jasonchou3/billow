const replaceAll = (str, from, to) => {
    return str.replace(new RegExp(from, 'gm'), to)
}



console.log(replaceAll('asdassa$name$sdfsdfs$name$','\\$name\\$','zzzzzzz'))