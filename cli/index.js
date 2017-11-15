const path = require('path');
const commander = require('commander');
const config = require('./package.json');
const util = require('./util');
const fs = require('fs');
const mkdirp = require('mkdirp');

// import path from 'path';
// import {exec} from 'child_process';
let targetPath = process.cwd();
let templatePath = __dirname + '/template';


function ergodicDir(path) {
    const files = fs.readdirSync(templatePath + path);
    files.map(file => {
        const currentPath = path + '/' + file;
        const state = fs.statSync(templatePath + currentPath);
        if (state.isDirectory()) {
            const targetDir = targetPath + currentPath;
            mkdirp.sync(targetDir);
            ergodicDir(currentPath);
        } else {
            const templateFile = templatePath + currentPath;
            const targetFile = targetPath + currentPath;

            let content = fs.readFileSync(templateFile);

            fs.writeFileSync(targetFile, content);
        }
    })
}

function generateProject(name) {
    let inPlace = !name || name === '.';


    if (inPlace) {
        name = process.cwd().split(path.sep).pop();
        util.log('使用当前目录：' + name);
        targetPath = targetPath.substring(0, targetPath.length - name.length - 1)
    } else {
        util.log('目录：' + name, '创建');

        if (util.mkdir(name) !== true) {
            util.error('创建目录失败。');
            return;
        }

        targetPath = targetPath + path.sep + name;
    }

    ergodicDir('');

    console.log('完成！');
    if (inPlace)
        console.log('执行：npm install');
    else {
        console.log('执行：cd ' + name);
        console.log('执行：npm install')
    }
}


commander.version(config.version);
commander.usage('[command] <options ...>');
commander.option('-v, --version', '显示版本号', () => {
    console.log(config.version)
});

commander.command('new <projectName>').description('生成项目').action(name => {
    generateProject(name || 'temp', commander);
});


commander.parse(process.argv);
// console.log(process.argv)
// console.log(process.cwd())