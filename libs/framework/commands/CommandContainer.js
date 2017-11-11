export default (Super) => class CommandContainer extends Super {
    commandClasses = {};

    registerCommand(commandClazz) {
        if (this.commandClasses[commandClazz.key]) {
            throw new Error(`command ${commandClazz.name} name: ${commandClazz.key} 已存在！`);
        }

        this.commandClasses[commandClazz.key] = commandClazz;
    }

    async commandHandle(command_name, args = []) {
        const commandClazz = this.commandClasses[command_name];
        const command = new commandClazz();
        await command.handle(...args);
    }

    get commandPath() {
        return this.appPath + '/console/commands';
    }
}