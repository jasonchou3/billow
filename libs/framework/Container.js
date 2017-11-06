import fs from 'fs'

export default class Container {
    project_root_path;
    config = {};
    providers = [];
    commands = {};

    constructor(project_root_path) {
        this.project_root_path = project_root_path;
    }

    async init() {
        await this.initConfig();
        await this.initProviders();
    }


    async initConfig() {
        try {
            readFileFromDir(this.configPath, (key, filename) => {
                this.config[key] = require(filename).default;
            })
        } catch (e) {
            console.log(e)
        }
    }

    get configPath() {
        return this.project_root_path + '/config';
    }


    async initProviders() {
        try {
            this.config['app']['providers'].map(provider_clazz => {
                const provider = new provider_clazz();
                this.providers.push(provider);

                provider.init();
            });

            this.providers.map(provider => {
                provider.boot();
            })

        } catch (e) {
            console.log(e)
        }
    }

    destroy() {
        this.providers.map(provider => {
            provider.destroy();
        })
    }


    // ==================== command =========================

    registerCommand(command) {
        if (this.commands[command.name]) {
            throw new Error(`command ${command.constructor.name} name: ${command.name} 已存在！`);
        }

        this.commands[command.name] = command;
    }


    async command(command_name, args = []) {
        await this.commands[command_name].handle(...args);
    }

    // ==================== service =========================

    alias_instances = {};

    /**
     *
     * @param alias
     * @param args array
     */
    get(alias, args = []) {
        if (!this.alias_instances[alias]) {

            return this.make(alias, args);
        }

        return this.alias_instances[alias];
    }

    make(alias, args = []) {
        const clazz = this.config['app']['alias'][alias];
        const instance = new clazz(...args);

        if (instance.lifecycle === 'app')
            this.alias_instances[alias] = instance;
        // else if (instance.lifecycle === 'request')

        return instance;
    }

    registerAlias(alias, clazz) {
        if (this.config['app']['alias'][alias])
            throw new Error(`alias:${alias}已存在！`)

        this.config['app']['alias'][alias] = clazz;
    }
}


function readFileFromDir(path, cb) {
    const files = fs.readdirSync(path);

    files.map((filename) => {
        const key = filename.split('.')[0];
        cb(key, path + '/' + filename)
    })
}
