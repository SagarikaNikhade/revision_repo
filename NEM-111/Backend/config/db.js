const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose.connect(process.mongo_url)

module.exports = {connection};