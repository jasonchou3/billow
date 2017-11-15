export default (Super) => class JobsContainer extends Super {
    jobClasses = {};

    registerJob(jobClazz) {
        if (this.jobClasses[jobClazz.key]) {
            throw new Error(`job ${jobClazz.name} name: ${jobClazz.key} 已存在！`);
        }

        this.jobClasses[jobClazz.key] = jobClazz;
    }


    getJob(jobKey) {
        return this.jobClasses[jobKey]
    }

    /**
     * maker 用
     * @returns {string}
     */
    get jobsPath() {
        return this.appPath + '/jobs';
    }
}