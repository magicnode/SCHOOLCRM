/*
 * Module description: 清单
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const listSchema = new Schema({
	number: String, //清单编号
    name: {
    	type: String,
    	unique:true
    },
    status: {type: Number, default: 0, enum: [0, 1,2,3,4]},//0 未完成还在填写 1 未审批、2 正在审批 3 审批结束
    description: String, //描述
    listgoods: [{type: Schema.Types.ObjectId, ref: 'ListGoods'}],
    lab: { type: Schema.Types.ObjectId, ref: 'Lab' },//所属实验室
    term: { type: Schema.Types.ObjectId, ref: 'Term' }, //所属学期
    CreateAt: { type: Number, default: new Date().getTime() }
})

listSchema.index({ name: 1}, {unique:true, background:true, w:1})

export default mongoose.model('List', listSchema, 'list')
