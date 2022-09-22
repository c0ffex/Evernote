const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://c0ffex:cdbnDvOuNlPp9p8X@evernote.mzaeixf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('connection successful'))
.catch((err) => console.log(err));