const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
})

userSchema.pre('save', function (next) {
  if(this.isNew || this.isModified('password')){
    bcrypt.hash(this.password, 10,
      (err, hashedPassword) => {
        if(err)
          next(err)
        else{
          this.password = hashedPassword
          next()
        }
      }
    )
  }
})

userSchema.methods.isCorrectPassword = (password, callback) => {
  bcrypt.compare(password, this.password, (err, same) => {
    if(err)
      callback(err)
    else
      callback(err,same)
  })
}

module.exports = mongoose.model('User', userSchema)