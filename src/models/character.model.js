/*
 * Module description: character 角色
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Types = Schema.Types
const characterSchema = new Schema({
    name: {
    	type: String, 
    	required: true,
    	unique: true
    }, //角色名字:审计处、财务处和校长,实验室主管,实验室员工，材料管理科， 库房管理员
    user: {type: Types.ObjectId, ref: 'User'}, //创建者
    CreateAt: { type: Number, default: new Date().getTime() }
})

characterSchema.index({ name: 1}, {unique:true, background:true, w:1})

characterSchema.statics = {
	/**
	 * List users in descending order of 'createdAt' timestamp.
	 * @param {number} skip - Number of users to be skipped.
	 * @param {number} limit - Limit number of users to be returned.
	 * @returns {Promise<User[]>}
	 */
	list({ query = {}, fliter = null, skip = 0, limit = 50 } = {}) {
	    return this.find(query, fliter)
	        .sort({ timestamp: -1 })
	        .skip(skip)
	        .limit(limit)
	}
}

export default mongoose.model('Character', characterSchema, 'character')
