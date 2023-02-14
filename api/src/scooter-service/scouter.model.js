const mongoose = require("mongoose");

const ScouterSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "S'il vous plaît entrez votre nom"],
    },
    latitude: {
      type: String,
      required: [true, "S'il vous plaît entrez votre latitude"],
    },
    longitude: {
      type: String,
      required: [true, "S'il vous plaît entrez votre longitude"],
    },
    description: {
      type: String,
      required: [true, "S'il vous plaît entrez votre description"],
    },
    status: {
      type: String,
      required: true,
      default: "desactiver",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Scouter", ScouterSchema);
