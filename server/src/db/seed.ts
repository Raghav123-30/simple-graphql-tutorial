import db from ".";
import type { Todo } from "../generated/prisma";

const todos: Todo[] = [
  {
    id: 1,
    done: false,
    title: "Learn GraphQl",
  },
  {
    id: 2,
    done: false,
    title: "Learn tRPC",
  },
  {
    id: 3,
    done: false,
    title: "Learn AI applications development",
  },
  { id: 4, done: false, title: "Learn Serverless framework" },
  { id: 5, done: false, title: "Learn AWS CDK" },
];

const seedDatabase = async () => {
  try {
    await db.todo.createMany({ data: todos });
  } catch (error) {
    console.log(error);
  }
};

seedDatabase();
