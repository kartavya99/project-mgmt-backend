const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Client {
    _id: ID!
    name: String!
    email: String!
    phone: String!
  }

  enum Status {
    NOT_STARTED
    IN_PROGRESS
    COMPLETED
  }

  type Project {
    _id: ID
    name: String!
    description: String!
    status: Status!
  }

  type Query {
    fetchClient(clientId: ID!): Client
    fetchAllProjects: [Project]
    fetchProject(projectId: ID!): Project
  }
`;

module.exports = typeDefs;
