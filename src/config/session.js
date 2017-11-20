export default {
    name: 'BILLOW_SESS_ID',
    ttl: 60 * 60, //单位 s


    prefix: 'sid_',
    driver: 'mongo',
    connection: 'session'
}