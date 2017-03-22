/*
 * Module description: department
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = Schema({
  name: {
  	type: String,
  	unique:true
  },
  labs: [{ type: Schema.Types.ObjectId, ref: 'Lab' }]
})

departmentSchema.index({ name: 1}, {unique:true, background:true, w:1})

export default mongoose.model('Department', departmentSchema, 'department');
