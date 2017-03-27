/*
 * Module description: 清单
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listSchema = new Schema({
	number: String, //清单编号
    name: {
    	type: String,
    	unique:true
    },
    status: {type: Number, enum: [1,2,3,4]},//1 未审批、2 正在审批 3 审批结束
    description: String, //描述
    depart: { type: Schema.Types.ObjectId, ref: 'Department' },//所属院系或工程训练中心
    supervisors: { type: Schema.Types.ObjectId, ref: 'LabSupervisor' },//主管人员 审批人员
    goods: [{ type: Schema.Types.ObjectId, ref: 'ListGoods' }],//清单物品
    CreateAt: { type: Number, default: new Date().getTime() }
})

listSchema.index({ name: 1}, {unique:true, background:true, w:1})

listSchema.statics = {

}

export default mongoose.model('Lab', listSchema, 'lab');
