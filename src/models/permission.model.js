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
    CreateAt: { type: Number, default: new Date().getTime() }
})

permissionSchema.index({ name: 1}, {unique:true, background:true, w:1})

permissionSchema.statics = {
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

export default mongoose.model('Permission', permissionSchema, 'permission')