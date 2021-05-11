const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const { db_url } = require("./constants");
const Stock = require("./models/stock");

const router = express.Router();
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

mongoose.connect(db_url, { useNewUrlParser: true });

const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

router.get("/search", async (req, res) => {
  const response = {};
  const { term } = req.query;

  if (!term) {
    res.send(response);
    return;
  }

  const regex = new RegExp(escapeRegex(term), "gi");
  Stock.find({ name: regex }, (err, result) => {
    if (err) console.log(err);

    const output = result.reduce((actual, { _id, name }) => {
      actual.push({ _id, name });
      return actual;
    }, []);
    res.send({ data: output });
  }).sort("Date");
});

router.get("/getStock/:id", async (req, res) => {
  const response = {};
  const { id } = req.params;

  if (!id) {
    res.send(response);
    return;
  }

  Stock.find({ _id: id }, (err, result) => {
    if (err) console.log(err);

    res.send({ data: result });
  });
});

app.use("/", router);
app.listen(port);

console.log("Server started on port ", port);
