/*
 * Module description: 清单中物品， 包含物品审核状态
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const listGoodsSchema = new Schema({
  status: {type: Number, enum: [1,2,3,4]},//1 未批、2 待批、3 统购和4 自购
  good: { type: Schema.Types.ObjectId, ref: 'Goods' }, //物品
  count: String, //需要数量
  CreateAt: { type: Number, default: new Date().getTime() }
})

listGoodsSchema.index({ name: 1 }, { unique: true, background: true, w: 1 })

export default mongoose.model('ListGoods', listGoodsSchema, 'list_goods')
