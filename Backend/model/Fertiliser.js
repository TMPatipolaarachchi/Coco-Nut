const mongoose = require('mongoose');

const fertiliserSchema = new mongoose.Schema({

    Soiltype:{
        type: String
    },
    Coconuttype:{
        type: String
    },
    Age:{
        type: String 
    }
    
})

module.exports = fertiliser = mongoose.model ('fertiliser', fertiliserSchema);