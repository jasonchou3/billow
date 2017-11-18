import fs from 'fs'

export default class Container {
    project_root_path;
    config = {};
    providers = [];
    debug = false;

    constructor(project_root_path) {
        this.project_root_path = project_root_path;
    }

    async initConfig() {
        readFileFromDir(this.configPath, (key, filename) => {
            this.config[key] = require(filename).default;
        });

        this.debug = this.config['app']['debug'];
    }

    get configPath() {
        return this.project_root_path + '/config';
    }

    async initProviders() {
        this.config['app']['providers'].map(providerClassPath => {
            let providerClass;
            if (typeof(providerClassPath) === 'string') {
                providerClass = this.requireClassFromConfig(providerClassPath);
            } else
                providerClass = providerClassPath;

            const provider = new providerClass();
            this.providers.push(provider);

            provider.init();
        });

        this.providers.map(provider => {
            provider.boot();
        })

    }

    requireClassFromConfig(classPath) {
        let clazz;
        if (classPath.startsWith('billow-js'))
            clazz = require(classPath).default;
        if (classPath.startsWith('/'))
            clazz = require(classPath).default;
        else
            clazz = require(this.configPath + '/' + classPath).default

        return clazz;
    }

    destroy() {
        this.providers.map(provider => {
            provider.destroy();
        })
    }

}


function readFileFromDir(path, cb) {
    const files = fs.readdirSync(path);

    files.map((filename) => {
        const key = filename.split('.')[0];
        cb(key, path + '/' + filename)
    })
}
