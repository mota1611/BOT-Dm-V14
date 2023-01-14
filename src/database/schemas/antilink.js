const mongoose = require('mongoose');

const AntilinkSchema = new mongoose.Schema({
    _id: { type: String, require: true },
    logs: { type: Boolean, default: false } 
})

module.exports = mongoose.model('Antilink', AntilinkSchema)