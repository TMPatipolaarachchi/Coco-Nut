const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)

const dburl = "mongodb+srv://tmpatipolaarachchi:2455455@cluster0.bce23.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
