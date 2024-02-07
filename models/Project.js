const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Planning", "Progress", "Completed"],
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
