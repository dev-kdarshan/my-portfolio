const mongoose = require('mongoose');

const FormResponseSchema = new mongoose.Schema({
  name: String,
  detail: String, 
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//  console.log(FormResponseSchema);

module.exports = mongoose.model('FormResponse', FormResponseSchema);