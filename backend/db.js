
const mongoose = require("mongoose");
const mongoUri = "mongodb://127.0.0.1:27017/xnotes";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('connected to db successfully ')
  }
  catch (error) {
    handleError(error);
    console.log(`Mongoose can't connect with DB. ${error}`)
  }
}

module.exports = connectToMongo;






