var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config();
const secret = process.env.JWT_TOKEN
/* GET users listing. */

router.post('/create', async (req, res) => {
  const data = req.body;
  try { 
    const user = await User.create(data)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({err: 'Error registering new user'})
  }
  }
)

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({email})
    if(!user)
      res.status(401).json({error: 'Incorrect email or password'})
    else{
      user.isCorrectPassword(password, function(err, same) {
        if(!same){
          res.status(401).json({error: 'Incorrect email or password'})
        }
        else {
          const token = jwt.sign({email}, secret, {expiresIn: '1d'})
          res.json({user: user, token: token})
        }
      })
    }
  } catch (err) {
    res.status(500).json({err: 'Internal error, please check your email'})
  }
})


module.exports = router;
