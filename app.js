const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const port = process.env.PORT;
//middlewares
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["https://task-manager-chandru.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/v1/tasks", tasks);

app.use(notFound); //Route does not exist

app.use(errorHandlerMiddleware); // display the error

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}`));
    console.log(`DB connected`);
  } catch (err) {
    console.log(err);
  }
};

start();
