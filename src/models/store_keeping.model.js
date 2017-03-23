/*
 * Module description: store keeping材料管理科 //可用角色权限代替
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeKeepingSchema = Schema({
  name    : String,
  CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('storeKeeping', storeKeepingSchema, 'store_keeping');
