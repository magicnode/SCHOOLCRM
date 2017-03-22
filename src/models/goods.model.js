/*
 * Module description: Goods
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goodsSchema = Schema({
  name: {
  	type: String,
  	unique:true
  },
  price: Number, //参考价格
  description: String, //描述
  _lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
  _classify: { type: Schema.Types.ObjectId, ref: 'Classify' }
})

goodsSchema.index({ name: 1}, {unique:true, background:true, w:1})

export default mongoose.model('Goods', goodsSchema, 'goods');
