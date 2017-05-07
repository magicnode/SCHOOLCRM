/*
 * Module description: 实验室 schema
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const labSchema = new Schema({
    name: {
    	type: String,
    	unique:true
    },
    depart: String,
    description: String, //描述
    CreateAt: { type: Number, default: new Date().getTime() }
})

labSchema.index({ name: 1}, {unique:true, background:true, w:1})

labSchema.statics = {
}

export default mongoose.model('Lab', labSchema, 'lab');
