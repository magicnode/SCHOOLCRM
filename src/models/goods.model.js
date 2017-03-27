/*
 * Module description: Goods 物品
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const goodsSchema = Schema({
  name: {
  	type: String,
  	unique:true
  },
  price: Number, //参考价格
  description: String, //描述
  lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
  classify: { type: Schema.Types.ObjectId, ref: 'Classify' },
  CreateAt: { type: Number, default: new Date().getTime() }
})

goodsSchema.index({ name: 1}, {unique:true, background:true, w:1})

goodsSchema.statics = {
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

export default mongoose.model('Goods', goodsSchema, 'goods');
