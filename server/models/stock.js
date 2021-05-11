const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const stockSchema = new Schema({
  name: { type: String, required: true },
  historicalData: [
    {
      Date: { type: String, required: true },
      Open: { type: Number, required: true },
      High: { type: Number, required: true },
      Low: { type: Number, required: true },
      "Adj Close": { type: Number, required: false },
      Close: { type: Number, required: true },
      Volume: { type: Number, required: true },
    },
  ],
});

const Stock = mongoose.model("Stocks", stockSchema);

module.exports = Stock;
