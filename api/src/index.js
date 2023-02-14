const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();
const cors = require("cors");

const { errorHandler } = require("./middleware/error.middleware");
const { notFound } = require("./middleware/route.middleware");
const connectDB = require("./config/db");

app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

connectDB();

// global middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./authentication-service/auth.route"));
app.use("/api/admin", require("./admin-service/admin.route"));
app.use("/api/users", require("./users-service/user.route"));
app.use("/api/scouter", require("./scooter-service/scouter.route"));

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
