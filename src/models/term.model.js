/*
 * Module description: term 学期
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const termSchema = Schema({
  description: String, //描述
  CreateAt: { type: Number, default: new Date().getTime() }
})

termSchema.index({ name: 1}, {unique:true, background:true, w:1})

termSchema.statics = {
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

export default mongoose.model('Term', termSchema, 'term');