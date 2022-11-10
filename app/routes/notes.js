var express = require('express');
var router = express.Router();
const withAuth = require('../middlewares/auth')

const Note = require('../models/note');
const { findById } = require('../models/user');
const user = require('../models/user');

router.post('/', withAuth, async(req, res) => {
  const {title, body} = req.body
  try {
    let note = await Note.create({title: title, body: body, author: req.user._id})
    res.status(200).json(note)
  } catch (error) {
    console.log(error)
    res.status(400).json("Somethin went Wrong...")
  }
})

router.get('/', withAuth, async(req, res) => {
  try {
  let notes = await Note.find(({author:req.user._id}))
    res.status(200).json(notes)

  }catch (err){
     res.status(500).json(err)
  }
})

router.get('/:id', withAuth, async(req, res) => {
  try{
    const {id} = req.params
    let note = await Note.findById(id)
    if(isOwner(req.user, note)){
      res.status(200).json(note)
    }else{
      res.status(404).json("Not Found")
    }
  }catch(err){
    res.status(404).json(err)
  }
})

// router.put('/:id', withAuth, async(req, res) => {
//   const {title, body} = req.body
//   const {id} = req.params

//   try {
//     let note = await Note.findById(id)
//     if(isOwner(req.user, note)){
//       let note = await Note.findOneAndUpdate(id, 
//         { $set: { title: title, body: body }},
//         { upsert: true, 'new': true }
//         )
//       res.json(note)
//     } else{
//       res.status(500).json({error: "problem"})
//     }
//   } catch (err){
//     res.json(err).status(404)
//   }
// })

router.put('/:id', withAuth, async function(req, res) {
  const { title, body } = req.body;
  const { id } = req.params;

  try {
    let note = await Note.findById(id)
    if(isOwner(req.user, note)){
      note = await Note.findOneAndUpdate(
        {_id: id},
        { $set: { title: title, body: body}},
        { upsert: true, 'new': true }

      )
      res.json(note);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', withAuth, async (req, res) =>{
  const {id} = req.params
  try{
    let note = await Note.findById(req.params.id)
    if(isOwner(req.user, note)){
      await note.delete()
      res.json({message:"deleted"}).status(204)
    }else
    res.json({message:'idk'}).status(403)
  } catch (err) {
    res.json(err).status(500)
  }
})

const isOwner = (user, note) => {
  if(JSON.stringify(user._id) == JSON.stringify(note.author._id))
    return true
  else
    return false
}
module.exports = router