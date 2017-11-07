export default {
    port: 5003,
    https: true,
    credentials: {
        key: __dirname + '/../private.pem',
        cert: __dirname + '/../file.crt',
    }
}