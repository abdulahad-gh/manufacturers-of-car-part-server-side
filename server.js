const app = require("./app");
const mongoose = require("mongoose");
const colors = require("colors");
const { port } = require("./secret");
const connectDb = require("./utils/db");


//server
app.listen(port,async () => {
  console.log("hello hi from manufacturer-car-part", port);

//database connection
await connectDb()
});
