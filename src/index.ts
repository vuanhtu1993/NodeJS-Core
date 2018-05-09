import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import router from "./controllers/api";

const port = 8000;
const app = express();
const url = "mongodb://test:test@ds263619.mlab.com:63619/medium";

// setting body-parser
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API
app.use("/", router);

// Connect MongoDB
mongoose.connect(url)
    .then(() => console.log("MongoDB is running!"))
    .catch((err) => console.log(err));
app.listen(port, () => {
    console.log("server is running on " + port);
});
