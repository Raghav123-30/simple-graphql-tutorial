import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello there!" });
});

const typeDefs = `#graphql
 
 type Student{
   name:String
 }
  
 type Query{
  students:[Student]
 }

`;

const resolvers = {
  Query: {
    students: () => [
      { name: "Raghavendra" },
      { name: "Samant" },
      { name: "Puneet" },
    ],
  },
};

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use("/graphql", express.json(), expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(`🚀 Server running  at http://localhost:${PORT}`);
  });
};

startServer();
