const mongoose = require('mongoose');

const dbString = 'mongodb+srv://nagasrikarp:L0edGN5AxQtwyg0b@cluster0.wrjobzv.mongodb.net/abc?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(dbString);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connection successful ✅");
});

connection.on("error", (err) => {
  console.error("Connection failed ❌", err);
});