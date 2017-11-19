export default {
    name: 'BILLOW_SESS_ID',
    ttl: 60, //单位 s


    prefix: 'sid_',
    driver: 'redis',
    connection: 'session'
}