const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
