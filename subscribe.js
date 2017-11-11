const redis = require('redis');
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


(async () => {
    const client = redis.createClient();
    client.on('pmessage', (p, channel, msg, count) => {
        console.log(channel, msg, count)
    });
    client.on("subscribe", function (channel, count) {
        console.log("client subscribed to " + channel + "," + count + "total subscriptions");
    });

    client.on("psubscribe", function (channel, count) {
        console.log("client psubscribe to " + channel + "," + count + "total subscriptions");
    });

    client.psubscribe('e*')

    // client.quit()
})();