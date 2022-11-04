const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose
  .connect(`mongodb+srv://c0ffex:${process.env.DATABASE_PASSWORD}@evernote.mzaeixf.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('DB Connection');
    console.log(process.env.DATABASE_PASSWORD);
  }).catch((err) => console.log(err));
