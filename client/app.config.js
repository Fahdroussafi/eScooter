require("dotenv").config();

module.exports = {
  extra: {
    appUrl: process.env.REACT_NATIVE_APP_URL,
  },
};