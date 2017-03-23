/*
 * Module description: lab supervisor实验室主管
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labSupervisorSchema = Schema({
  name: {
  	type: String,
  	unique:true
  },
  labs: [{ type: Schema.Types.ObjectId, ref: 'Lab' }],
  CreateAt: { type: Number, default: new Date().getTime() }
})

labSupervisorSchema.index({ name: 1}, {unique:true, background:true, w:1})

export default mongoose.model('LabSupervisor', labSupervisorSchema, 'lab_supervisor')
