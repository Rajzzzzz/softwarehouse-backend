const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection failed: ', err);
    });
  };

module.exports = { connect };
