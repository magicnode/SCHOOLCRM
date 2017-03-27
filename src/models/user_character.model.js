/*
 * Module description: character 角色 用户user 关系
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const userCharacterSchema = new Schema({
	  user: {type: Schema.Types.ObjectId, ref: 'User'},
	  character: {type: Schema.Types.ObjectId, ref: 'Character'},
    CreateAt: { type: Number, default: new Date().getTime() }
})

userCharacterSchema.statics = {

}

export default mongoose.model('userCharacter', userCharacterSchema, 'user_character')
