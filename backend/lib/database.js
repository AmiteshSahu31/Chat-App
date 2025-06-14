const mongoose = require('mongoose');
require("dotenv").config();

exports.connectDB= () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => { console.log("DB connection is successful"); } )
    .catch((err) => {
        console.log("DB is not connected");
        console.error(err);
        process.exit(1);
    })
}