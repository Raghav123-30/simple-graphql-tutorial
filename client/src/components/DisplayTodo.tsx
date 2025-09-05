import { Todo } from "@/models/Todo";
import React from "react";
import { Check } from "lucide-react";
import { CompleteTodoAction } from "@/actions";
import CompleteTodoButton from "./CompleteTodoButton";

const DisplayTodo = (todo: Todo) => {
  return (
    <div className="my-4 bg-white rounded-md shadow-md px-8 py-3 ring ring-gray-100 flex flex-col justify-between">
      <h1 className="font-bold text-xl">{todo.title}</h1>
      <div className="flex justify-between items-center text-gray-600 text-sm">
        <p>{todo.done ? "Completed" : "Pending"}</p>
        {!todo.done && <CompleteTodoButton id={todo.id} />}
      </div>
    </div>
  );
};

export default DisplayTodo;
