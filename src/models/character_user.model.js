/*
 * Module description: character 角色 用户user 关系
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const characterUserSchema = new Schema({
	  character: {type: Schema.Types.ObjectId, ref: 'Character'},
	  user: {type: Schema.Types.ObjectId, ref: 'User'},
    CreateAt: { type: Number, default: new Date().getTime() }
})

character_Schema.statics = {

}

export default mongoose.model('Character', character_Schema, 'character');