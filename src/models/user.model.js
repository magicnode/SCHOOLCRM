/*
 * Module description: user 用户
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '', uniq: true },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('User', UserSchema, 'user')
