const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: String,
    username: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    email: String,
    roles: [String]
})

const Users = mongoose.model('users', UserSchema)

module.exports = Users