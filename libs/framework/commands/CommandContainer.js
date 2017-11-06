export default (Super) => class CommandContainer extends Super {
    commands = {};

    registerCommand(command) {
        if (this.commands[command.name]) {
            throw new Error(`command ${command.constructor.name} name: ${command.name} 已存在！`);
        }

        this.commands[command.name] = command;
    }


    async command_handle(command_name, args = []) {
        await this.commands[command_name].handle(...args);
    }

    get commandPath() {
        return this.project_root_path + '/commands';
    }
}