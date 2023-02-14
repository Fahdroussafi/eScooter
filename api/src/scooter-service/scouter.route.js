const express = require("express");
const router = express.Router();

const {
  addScouter,
  getScouters,
  activateScouter,
  desactivateScouter,
} = require("./scouter.controller");

router.route("/addScouter").post(addScouter);
router.route("/getScouter").get(getScouters);
router.route("/activateScouter/:id").put(activateScouter);
router.route("/desactivateScouter/:id").put(desactivateScouter);

module.exports = router;
