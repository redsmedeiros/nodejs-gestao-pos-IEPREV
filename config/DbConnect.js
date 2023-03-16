const mongoose = require('mongoose');

async function dbConnect(){

    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL)

    console.log('Conectado ao MONGO')

}

dbConnect().catch((err)=> console.log(err))

module.exports = dbConnect;