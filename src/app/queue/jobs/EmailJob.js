import Job from '../../../../framework/src/queue/Job'

export default class EmailJob extends Job {
    static key = 'send_email';

    data = {
        title: null,
        content: null
    };

    init(title, content) {
        Object.assign(this.data, {title, content})
    }

    handle() {
        // a()

        console.log('EmailJob', this.data.title)

        // this.error({name: 'zzz'})

        return new Promise((resolve) => {
            setTimeout(resolve, 2000)
        })
    }
}