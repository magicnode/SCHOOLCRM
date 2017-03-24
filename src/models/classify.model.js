/*
 * Module description: 分类
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classifySchema = Schema({
  name: {
  	type: String,
  	unique:true
  },
  description: String, //描述
  _goods: [{ type: Schema.Types.ObjectId, ref: 'Goods' }],
  CreateAt: { type: Number, default: new Date().getTime() }
})

classifySchema.index({ name: 1}, {unique:true, background:true, w:1})

export default mongoose.model('Classify', classifySchema, 'classify');
