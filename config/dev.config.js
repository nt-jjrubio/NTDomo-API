// process.env.foobar to define environment variable
module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://192.168.56.101:27017/ntdomo',
};