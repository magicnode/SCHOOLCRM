/*
 * Module description: permission 权限
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const permission_Schema = new Schema({
    name: { type: String, required: true, unique: true },//英文名
    route: String, //所属路由
    method: { 
        type: String,
        enum: ['get', 'post', 'put', 'delete']
    }, //动作
    CreateTime: { type: Date, default: Date.now }
})

permission_Schema.statics = {

}

mongoose.model('Permission', permission_Schema, 'permission');