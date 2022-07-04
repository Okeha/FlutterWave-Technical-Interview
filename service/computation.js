const express = require("express");
const { body, check } = require("express-validator");

const requirement = (SplitData) => {};
const compute = async (req, res) => {
  const ID = req.body.ID;
  const Amount = req.body.Amount;
  const Currency = req.body.Currency;
  const CustomerEmail = req.body.CustomerEmail;
  const SplitInfo = req.body.SplitInfo;
  console.log(SplitInfo.length);

  var arr = [];

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

  console.log(arr);
  lastIndex = index.lastIndexOf("FLAT");
  console.log(lastIndex);
  if (lastIndex != -1) {
    console.log(...percentage);
    arr.splice(lastIndex + 1, 0, ...percentage);
  } else {
    arr.splice(0, 0, ...percentage);
  }
  console.log(arr);
  var Balance = Amount;
  console.log(Balance);
  const arr2 = arr.map(Functionality);
  function Functionality(value) {
    if (value.SplitType === "FLAT") {
      val = value.SplitValue;
      Balance = Balance - val;
    } else if (value.SplitType === "PERCENTAGE") {
      val = (value.SplitValue / 100) * Balance;
      Balance = Balance - val;
    }
    return { SplitEntityId: value.SplitEntityId, value: val, balance: Balance };

    // console.log(value.SplitValue, Balance);
    // return Balance;
  }
  res.send("Success");
  console.log(arr2);
};

module.exports = compute;
