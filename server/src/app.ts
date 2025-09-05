import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";
import db from "./db";
import type { Todo } from "./generated/prisma";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ message: "Hello there!" });
});

app.get("/todos", async (req, res) => {
  const todos = await db.todo.findMany();
  res.status(200).json({ todos });
});

const typeDefs = `#graphql
 
 type Todo {
   id:ID!
   title:String
   done:Boolean
 }
  
 type Query{
  
  todos:[Todo]
 }
  
  type Mutation {
    addTodo(title:String):Todo
    completeTodo(id:ID!):Todo
    deleteTodo(id:ID!):Todo
  }
  

`;

const resolvers = {
  Query: {
    todos: async () => {
      const todos = await db.todo.findMany();

      return todos;
    },
  },
  Mutation: {
    addTodo: async (
      parent: any,
      { title }: { title: string }
    ): Promise<Todo> => {
      console.log(parent);
      const newTodo = await db.todo.create({
        data: {
          title,
        },
      });
      return newTodo;
    },
    completeTodo: async (_: any, { id }: { id: number }): Promise<Todo> => {
      const updatedTodo = await db.todo.update({
        where: { id: Number(id) },
        data: {
          done: true,
        },
      });

      return updatedTodo;
    },
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
