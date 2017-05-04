/*
 * Module description: Storeroom 库房
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const storeroomSchema = Schema({
  count: Number, //个数
  description: String, //描述
  goods: [{
   good: { type: Schema.Types.ObjectId, ref: 'good' },
   count: Number
  }],
  lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
  term: {type: Schema.Types.ObjectId, ref: 'term'},
  CreateAt: { type: Number, default: new Date().getTime() }
})

storeroomSchema.index({ name: 1}, {unique:true, background:true, w:1})

storeroomSchema.statics = {
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

export default mongoose.model('Storeroom', storeroomSchema, 'storeroom');
