const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Client {
    _id: ID!
    name: String!
    email: String!
    phone: String!
  }

  enum Status {
    Planning
    Progress
    Completed
  }

  type Project {
    _id: ID!
    name: String!
    description: String!
    status: Status!
  }

  type Query {
    fetchClient(clientId: ID!): Client
    fetchAllProjects: [Project]
    fetchProject(projectId: ID!): Project
  }

  type Mutation {
    createClient(name: String!, email: String!, phone: String!): Client
    deleteClient(clientId: ID!): Client
    createProject(name: String!, description: String!, status: Status!): Project
    deleteProject(projectId: ID!): Project
    updateProject(projectId: ID!, status: Status!): Project
  }
`;

module.exports = typeDefs;
