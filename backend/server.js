const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
