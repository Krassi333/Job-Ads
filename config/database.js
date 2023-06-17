const mongoose = require('mongoose');

const connection_string = 'mongodb://127.0.0.1:27017/jobAds';

module.exports = async (app) => {
    try {
        await mongoose.connect(connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database is connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);  //?
    }
}