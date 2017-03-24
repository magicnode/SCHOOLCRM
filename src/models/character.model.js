/*
 * Module description: character 角色
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = Schema.Types
const characterSchema = new Schema({
    name: {
    	type: String, 
    	required: true, 
    	unique: true
    }, //角色名字
    user: {type: Types.ObjectId, ref: 'User'}, //创建者
    permission: [{type: Types.ObjectId, ref: 'Permission'}], //包含的权限
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
