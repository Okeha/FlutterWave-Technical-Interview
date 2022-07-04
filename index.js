const express = require("express");
const compute = require("./controller/splitPayment");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/split-payment", compute);

port = process.env.PORT || 3420;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
