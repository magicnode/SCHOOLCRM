/*
 * Module description: summary sheet 汇总报表
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const summarySchema = Schema({
	number: String, //汇总报表编号
	description: String, //描述
  plannedMoney: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  CreateAt: { type: Number, default: new Date().getTime() }
})

summarySchema.index({ name: 1}, {unique:true, background:true, w:1})

export default mongoose.model('Summary', summarySchema, 'summary');
