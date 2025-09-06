"use client";

import { Todo } from "@/models/Todo";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Loading from "../loading";
import DisplayTodo from "@/components/DisplayTodo";

export default function ClientPage() {
  const LIST_TODOS = gql`
    query listTodos {
      todos {
        id
        title
        done
      }
    }
  `;
  const { data, error, loading } = useQuery<{ todos: Todo[] }>(LIST_TODOS);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
  return (
    <div className="pt-10 max-w-6xl mx-auto">
      <h1 className="font-extrabold text-4xl text-center tracking-wide mb-8">
        All your todos
      </h1>
      {data?.todos.length ? (
        data?.todos?.map((item) => <DisplayTodo key={item.id} {...item} />)
      ) : (
        <p>No todos to show</p>
      )}
    </div>
  );
}
