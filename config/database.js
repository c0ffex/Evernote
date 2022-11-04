const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose
  .connect(`mongodb+srv://c0ffex:iQjyq872RkWecpbm@evernote.mzaeixf.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('DB Connection');
  }).catch((err) => console.log(err));
