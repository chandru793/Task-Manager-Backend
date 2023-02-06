const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware=require('./middleware/errorHandler')

const port = process.env.PORT;
//middlewares
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound)  //Route does not exist

app.use(errorHandlerMiddleware)  // display the error

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
