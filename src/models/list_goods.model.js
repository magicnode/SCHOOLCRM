/*
 * Module description: 清单中物品， 包含物品审核状态
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const listGoodsSchema = new Schema({
  status: { type: Number, default: 1, enum: [1,2,3,4] },//1 未批、2 待批、3 统购和4 自购
  goods: { type: Schema.Types.ObjectId, ref: 'Goods' }, //物品
  list: { type: Schema.Types.ObjectId, ref: 'List' }, //物品
  count: String, //需要数量
  CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('ListGoods', listGoodsSchema, 'list_goods')
