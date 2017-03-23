/*
 * Module description: character 角色
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const character_Schema = new Schema({
    name: {
    	type: String, 
    	required: true, 
    	unique: true,
    	enum: ['校长', '材料管理科', '审计处', '财务处', '实验室主管', '实验室员工']
    }, //角色名字
    permission: [{type: Schema.Types.ObjectId, ref: 'Permission'}], //包含的权限
    CreateAt: { type: Number, default: new Date().getTime() }
})

character_Schema.statics = {

}

mongoose.model('Character', character_Schema, 'character');