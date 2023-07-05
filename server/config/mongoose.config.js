const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.REACT_APP_DB_PORT
const db = process.env.REACT_APP_DB_NAME

mongoose.set('strictQuery', false)
mongoose
  .connect(`mongodb://127.0.0.1:${port}/${db}}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(
      `Successfully connected to database ${db} \nRunning on port ${port}`
    )
  })
  .catch((err) => console.error(err))
