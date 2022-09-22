var express = require('express');
var router = express.Router();
const User = require('../models/user')
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

router.get('/login', async (req, res) => {

})

router.get('/:id', function(req, res, next) {
  const user = findById(req.params.id)
  try {
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({err: 'error Finding user'})
  }
});


module.exports = router;
