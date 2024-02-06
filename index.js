require("dotenv").config({ path: ".env" });
const express = require("express");
const colors = require("colors");
const db = require("./config/db");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");

const port = process.env.PORT || 8080;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  db.once("open", () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`.yellow.bold);
      console.log(
        `USE GraphQL at http://localhost:${port}${server.graphqlPath}`.yellow
          .bold.underline
      );
    }); // Add closing parenthesis here
  });
};

startApolloServer(typeDefs, resolvers);

// db();
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`.yellow.bold);
// });
