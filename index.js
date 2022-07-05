const express = require("express");
// const compute = require("./controller/splitPayment");
require("dotenv").config();

const app = express();

const { body, check, validationResult } = require("express-validator");
// const compute2 = require("./service/computation2");

app.use(express.json());
// app.use("/split-payment", compute);
// const requirement = (SplitData) => {};
const compute = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const ID = req.body.ID;
  const Amount = req.body.Amount;
  const Currency = req.body.Currency;
  const CustomerEmail = req.body.CustomerEmail;
  const SplitInfo = req.body.SplitInfo;
  console.log(SplitInfo.length);

  var arr = [];
  var sum = 0;
  var sumArr = [];
  function getTotal(sumArr) {
    var total = 0;
    for (i = 0; i < sumArr.length; i++) {
      if (sumArr.length <= 1) {
        continue;
      }
      total += sumArr[i];
    }
    console.log(total);
  }
  for (i = 0; i < SplitInfo.length; i++) {
    // console.log(SplitInfo[i]);

    if (SplitInfo[i].SplitType === "FLAT") {
      arr.unshift(SplitInfo[i]);
    } else if (SplitInfo[i].SplitType === "RATIO") {
      arr.push(SplitInfo[i]);
    }
  }
  var percentage = [];
  for (i = 0; i < SplitInfo.length; i++) {
    console.log(SplitInfo[i]);
    if (SplitInfo[i].SplitType === "PERCENTAGE") {
      percentage.push(SplitInfo[i]);
    }
  }
  //   console.log(percentage);
  //   console.log(arr);
  const index = arr.map(Iterate);
  function Iterate(value) {
    if (value.SplitType === "FLAT") {
      return value.SplitType;
    }
  }

  //   console.log(arr);
  lastIndex = index.lastIndexOf("FLAT");
  console.log(lastIndex);
  if (lastIndex != -1) {
    // console.log(...percentage);
    arr.splice(lastIndex + 1, 0, ...percentage);
  } else {
    arr.splice(0, 0, ...percentage);
  }
  var Balance = Amount;
  console.log(Balance);

  var ratios = [];
  const arr2 = arr.map(Functionality);
  sum = 0;
  function Functionality(value) {
    if (value.SplitType === "FLAT") {
      val = value.SplitValue;
      Balance = Balance - val;
      //   ratios;
    } else if (value.SplitType === "PERCENTAGE") {
      val = (value.SplitValue / 100) * Balance;
      Balance = Balance - val;
      //   ratios;
    } else if (value.SplitType === "RATIO") {
      ratios.push(value);
      ratios;
    }
    // console.log(ratios);
    // console.log(sum);
    // console.log(ratios);
    // console.log(arr);
    return {
      SplitType: value.SplitType,
      SplitEntityId: value.SplitEntityId,
      Amount: val,
      balance: Balance,
      //   ratio: ratios,
    };
  }

  //   console.log(ratios);
  for (i = 0; i < ratios.length; i++) {
    sum += ratios[i].SplitValue;
  }
  console.log(sum);
  final_balance = arr2.pop().balance;
  arr3 = ratios.map(ratio);
  function ratio(value) {
    val = (value.SplitValue / sum) * final_balance;
    // balance = balance - val;
    console.log(val, balance);
    return {
      SplitEntityId: value.SplitEntityId,
      Amount: val,
    };
  }
  var balance;
  if (ratios.length === 0) {
    balance = final_balance;
    console.log("final balance: ", balance);
  } else {
    balance = 0;
  }
  console.log(arr3);
  //   console.log(arr);
  //   console.log(arr2);
  //   console.log();
  const SplitBreakdown = (arr2) => {
    const filter = arr2.filter(func);
    function func(value) {
      return value.SplitType === "FLAT" || value.SplitType === "PERCENTAGE";
    }
    console.log(filter);
    return filter;
  };
  const RatioBreakdown = (arr3) => {};
  // res.send("Success");
  //   console.log(arr2);

  res.json({
    ID: 13092,
    Balance: balance,
    SplitBreakdown: [...SplitBreakdown(arr2), ...arr3],
  });
};

// var splitType = "FLAT" ||  || "RATIO";
app.post(
  "/split-payment/compute",
  body("ID").isNumeric(),
  body("Amount").isNumeric(),
  body("Currency").notEmpty().isAlpha(),
  body("CustomerEmail").notEmpty().isEmail(),
  body("SplitInfo").notEmpty().isArray().isLength({ min: 1, max: 20 }),
  body("SplitInfo.*").notEmpty().isObject(),
  body("SplitInfo.*.SplitType")
    .notEmpty()
    .custom((value, { req }) => {
      const splitType = ["FLAT", "PERCENTAGE", "RATIO"];
      if (!splitType.includes(value)) {
        throw new Error("Unknown Split Type");
      }
      return true;
    }),
  body("SplitInfo.*.SplitValue").isNumeric(),
  compute
);
port = process.env.PORT || 3420;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
