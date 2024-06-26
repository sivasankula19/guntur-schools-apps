
const mongoose = require("mongoose");

async function connectDB() {

  try {
    const url = "mongodb+srv://manishagolla3:Z8wM3veFT176TAQw@cluster0.la2zt6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(url);
    console.log(`Database connected`);

    const dbConnection = mongoose.connection;

    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;


