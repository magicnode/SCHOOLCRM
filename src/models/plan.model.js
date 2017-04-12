/*
 * Module description: plan 计划内消耗
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const planSchema = Schema({
	lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
	money: Number,
  CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('Plan', planSchema, 'plan');
