/*
 * Module description: 实验室 schema
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const labSchema = new Schema({
    name: {
    	type: String,
    	unique:true
    },
    description: String, //描述
    _depart: { type: Schema.Types.ObjectId, ref: 'Department' },//所属院系或工程训练中心
    _supervisors: [{ type: Schema.Types.ObjectId, ref: 'User' }],//主管人员
    CreateAt: { type: Number, default: new Date().getTime() }
})

labSchema.index({ name: 1}, {unique:true, background:true, w:1})

labSchema.statics = {

}

export default mongoose.model('Lab', labSchema, 'lab');
