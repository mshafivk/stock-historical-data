/***
 * Script to execute batch insertion of csv OHLC data to stocksDB collection
 * For future additions - update source_info.json and add OHLC data csv file to data directory
 * source_info.json contains the stock title as well as historical data
 */

"use strict";

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csvJson = require("csvjson");
const { db_url } = require("./constants");
require("events").EventEmitter.prototype._maxListeners = 100;

const Stock = require("./models/stock");
const { disconnect } = require("cluster");

const csvJsonOpts = {
  delimiter: ",",
  quote: '"',
};

/**
 * Initialise DB Connection
 */

const connectDB = async () => {
  mongoose.connect(db_url, { useNewUrlParser: true });
  const con = mongoose.connection;
  return new Promise((resolve) =>
    con.on("open", () => {
      console.log("Connected");
      resolve(true);
    })
  );
};

/**
 * Disconnect DB Connection
 */

const disconnectDB = async () => {
  mongoose.disconnect(db_url);
  const con = mongoose.connection;
  con.on("close", () => {
    console.log("Connection closed");
  });
};

/***
 * Sync the data from CSV file to database
 */
const syncDB = () => {
  const csv_path = "./data";
  try {
    let sourceList = fs.readFileSync("./source_info.json", {
      encoding: "utf8",
    });
    let sourceListJSON = JSON.parse(sourceList);
    const filePromises = [];

    for (let sourceItem of sourceListJSON) {
      console.log("Processing source item - ", sourceItem.fileName);
      let promise = new Promise((resolve, reject) => {
        let rowData = fs.readFileSync(
          path.join(__dirname, csv_path, sourceItem.fileName),
          { encoding: "utf8" }
        );

        let jsonData = csvJson.toObject(rowData, csvJsonOpts);
        Stock.insertMany({
          name: sourceItem.entity,
          historicalData: jsonData,
        })
          .then(() => {
            console.log(sourceItem.entity + "Inserted");
            resolve(true);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
      filePromises.push(promise);
    }
    return Promise.all(filePromises);
  } catch (error) {
    console.log("syncDB - Error occurred when reading file");
  }
};

const launchSeed = async () => {
  await connectDB();
  await syncDB();
  await disconnectDB();
};

launchSeed();
