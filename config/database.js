const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log(con.connections);
    console.log('DB Connection');
  }).catch((err) => console.log(err));
