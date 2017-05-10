/*
 * Module description: 清单中物品， 包含物品审核状态
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const listGoodsSchema = new Schema({
  status: { type: Number, default: 1, enum: [1,2,3,4] },//1 未批、2 待批、3 统购和4 自购
  goods: { type: Schema.Types.ObjectId, ref: 'Goods' }, //物品
  name: String, //物品名字
  price: Number, //物品价格
  unit: String, //物品单位
  list: { type: Schema.Types.ObjectId, ref: 'List' }, //清单
  count: String, //需要数量
  material_status: {type: Number, default: 1, enum: [1,2]},//1 未买、2 买完
  CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('ListGoods', listGoodsSchema, 'list_goods')
