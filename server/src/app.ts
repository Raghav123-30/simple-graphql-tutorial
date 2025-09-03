import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello there!" });
});

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

let todos: Todo[] = [{ id: 1, title: "Buy milk", done: false }];
let nextId = 2;

const typeDefs = `#graphql
 
 type Student{
   name:String
   address:String
 }
  
 type Todo {
   id:ID!
   title:String
   done:Boolean
 }
  
 type Query{
  students:[Student]
  todos:[Todo]
 }
  
  type Mutation {
    addTodo(title:String):Todo
    updateTodo(id:ID!):Todo
    deleteTodo(id:ID!):Todo
  }
  

`;

const resolvers = {
  Query: {
    students: () => [
      { name: "Raghavendra", address: "Navanagar" },
      { name: "Samant", address: "Dharwad" },
      { name: "Puneet", address: "Haliyal" },
    ],
    todos: () => todos,
  },
  Mutation: {
    addTodo: (parent: any, { title }: { title: string }): Todo => {
      console.log(parent);
      const newTodo: Todo = { id: nextId++, title, done: false };
      todos.push(newTodo);
      return newTodo;
    },
    updateTodo: (_: any, { id }: { id: number }): Todo => {
      const updatedTodo = todos.find((item) => (item.id = id));
      updatedTodo.done = !updatedTodo.done;
      todos = todos.map((item) => {
        if (item.id === id) {
          return { ...todos, ...updatedTodo };
        }
        return item;
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
