require("dotenv").config({ path: ".env" });
require("dotenv").config({ path: ".env" });
const express = require("express");
const db = require("./config/connection");
const colors = require("colors");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { typeDefs, resolvers } = require("./schemas");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "build")));
app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.brightBlue);
      console.log(
        `USE GraphQL at http://localhost:${PORT}${server.graphqlPath}`
          .brightMagenta
      );
    });
  });
  db.on("error", (err) => {
    console.log(err);
  });
};

startApolloServer(typeDefs, resolvers);
