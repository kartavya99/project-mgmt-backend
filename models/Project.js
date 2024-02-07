const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
