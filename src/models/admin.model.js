/*
 * Module description: person
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
  name    : String,
  age     : Number
})

export default mongoose.model('Admin', adminSchema, 'admin');
