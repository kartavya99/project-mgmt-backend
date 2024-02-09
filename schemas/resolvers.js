const { Client, Project } = require("../models");

const resolvers = {
  Query: {
    fetchAllClients: async () => {
      return await Client.find();
    },

    fetchClient: async (parent, { clientId }) => {
      return await Client.findById({ _id: clientId });
    },

    fetchAllProjects: async () => {
      return await Project.find().populate("clientId");
    },

    fetchProject: async (parent, { projectId }) => {
      return await Project.findById({ _id: projectId }).populate("clientId");
    },
  },

  Mutation: {
    createClient: async (parent, args) => {
      const { name, email, phone } = args;
      const client = await Client.create({ name, email, phone });
      return client;
    },

    deleteClient: async (parent, { clientId }) => {
      const projects = await Project.find({ clientId });
      projects.forEach(async (project) => {
        await Project.findByIdAndDelete({ _id: project._id });
      });

      const client = await Client.findByIdAndDelete({ _id: clientId });
      return client;
    },

    createProject: async (parent, args) => {
      const { name, description, status, clientId } = args;
      const project = await Project.create({
        name,
        description,
        status,
        clientId,
      });
      await Client.findByIdAndUpdate(
        {
          _id: clientId,
        },
        {
          $push: { projects: project._id },
        }
      );

      return project;
    },
    deleteProject: async (parent, { projectId }) => {
      const project = await Project.findByIdAndDelete({ _id: projectId });
      return project;
    },
    updateProject: async (parent, args) => {
      const { projectId, status } = args;
      const project = await Project.findByIdAndUpdate(
        { _id: projectId },
        { status },
        { new: true }
      );
      return project;
    },
  },
};

module.exports = resolvers;
