"use client";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export default function Home() {
  const TODOS_QUERY = gql`
    query getTodos {
      todos {
        id
        title
        done
      }
    }
  `;
  const UPDATE_TODO = gql`
    mutation updateTodo($id: ID!) {
      updateTodo(id: $id) {
        id
        title
        done
      }
    }
  `;
  const { data, error, loading } = useQuery<{ todos: Todo[] }>(TODOS_QUERY);
  const [updateTodo, { loading: updating, error: errorUpdating }] =
    useMutation<{ updatedTodo: Todo }>(UPDATE_TODO, {
      refetchQueries: [TODOS_QUERY],
    });
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }
  return (
    <div className="pb-10 max-w-3xl mx-auto">
      {data?.todos.map((item) => (
        <div key={item.id} className="bg-gray-50 p-3 rounded-md shadow-md">
          <h1 className="font-bold text-lg">{item.title}</h1>
          <p className="text-gray-600">{item.done ? "Completed" : "Pending"}</p>
          <button
            onClick={() => updateTodo({ variables: { id: item.id } })}
            disabled={updating}
            className={`${item.done ? "text-red-500" : "text-green-500"}`}
          >
            {updating
              ? "Updating"
              : item.done
              ? "Mark as pending"
              : "Mark as complete"}
          </button>
          {errorUpdating && <p className="text-red-500">Failed to update</p>}
        </div>
      ))}
    </div>
  );
}
