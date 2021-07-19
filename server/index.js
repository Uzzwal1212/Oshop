const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/default.json");
const dbUrl = dbConfig.dbUrl;
const { ApolloServer } = require("apollo-server-express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const typeDefs = require("./TypeDefs");
const resolvers = require("./Resolvers");
const authSubscription = require("./utils/authSubscription");
const oauthRouter = require("./routes/oauth");
const tokenRouter = require("./routes/token");

if (!process.env.JWT_SECRET) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongoDb..."))
  .catch((error) => {
    console.log(error);
  });

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req, res, connection }) => ({
    req,
    res,
    connection,
  }),
  subscriptions: {
    path: "/graphql",
    onConnect: (connectionParams, webSocket, context) => {
      return new Promise((res) => {
        const admin = authSubscription(connectionParams);
        res({ res: admin._id });
      });
    },
  },
});

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

app.use(express.json());
app.use("*", cors());
app.use("/oauth", oauthRouter);
app.use("/token", tokenRouter);

server.applyMiddleware({ app });

const port = process.env.PORT || 5000;
httpServer.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
