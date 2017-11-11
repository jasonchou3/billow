import ConsoleKernel from '../../../libs/framework/ConsoleKernel'
import ExampleCommand from './commands/ExampleCommand'

export default class Kernel extends ConsoleKernel {
    commands = [
        ExampleCommand
    ];

    schedule(scheduler) {
        scheduler.run('*/30 * * * * *', async () => {
            await this.commandHandle('help');
        })
    }

    async onError(e) {

    }
}