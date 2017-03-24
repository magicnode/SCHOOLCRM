/*
 * Module description: permission 权限
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const permissionSchema = new Schema({
    name: { type: String, required: true, unique: true },//英文名get auth etc.
    resource: { type: String }, //所属资源类型
    url: String, //所属路由
    description: String, //描述
    method: { 
        type: String,
        enum: ['get', 'post', 'put', 'delete']
    }, //动作
    CreateTime: { type: Date, default: Date.now }
})

permissionSchema.index({ name: 1}, {unique:true, background:true, w:1})

export default mongoose.model('Permission', permissionSchema, 'permission')