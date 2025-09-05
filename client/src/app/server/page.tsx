import DisplayTodo from "@/components/DisplayTodo";
import createApolloClient from "@/config/apollo-client";
import { Todo } from "@/models/Todo";
import { gql } from "@apollo/client";

export default async function ServerPage() {
  try {
    const client = createApolloClient();
    const TODOS_LIST = gql`
      query listTodos {
        todos {
          id
          title
          done
        }
      }
    `;
    const { data, error } = await client.query<{ todos: Todo[] }>({
      query: TODOS_LIST,
    });
    if (error) {
      return (
        <div className="h-screen flex flex-col justify-center items-center">
          <p className="text-red-500">{error.message}</p>
        </div>
      );
    } else {
      return (
        <div className="pt-10 max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide">
            All of your tasks
          </h1>
          {data?.todos.length ? (
            data?.todos.map((item) => <DisplayTodo key={item.id} {...item} />)
          ) : (
            <p className="text-gray-600">No todos to show.</p>
          )}
        </div>
      );
    }
  } catch (error) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <p className="text-red-500">Internal server error</p>
      </div>
    );
  }
}
