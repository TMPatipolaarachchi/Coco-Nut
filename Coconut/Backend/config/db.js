const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)

const dburl = "mongodb+srv://thusharuaroshgunapala:1812@db.dqcp3aj.mongodb.net/?retryWrites=true&w=majority&appName=DB";

const store = new MongoDBStore({
    uri: dburl,
    collection: 'sessions'
})

mongoose.set("strictQuery", true );

const dbConnection = async () => {
    try{
        await mongoose.connect(dburl);
        console.log("mongodb is connected");
    }catch(e){
        console.error(e.message);
        process.exit();
    }
}

module.exports = {dbConnection, store};
