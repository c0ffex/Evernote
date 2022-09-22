const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({ 
  title: String,
  body: String,
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now},
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


module.exports = mongoose.model('Note', noteSchema)