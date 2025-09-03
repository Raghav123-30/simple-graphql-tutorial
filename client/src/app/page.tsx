import createApolloClient from "@/config/apollo-client";
import { gql } from "@apollo/client";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export default async function Home() {
  const client = createApolloClient();
  const GET_TODOS = gql`
    query getTodos {
      todos {
        id
        title
        done
      }
    }
  `;
  const { data, error } = await client.query<{ todos: Todo[] }>({
    query: GET_TODOS,
  });

  if (error) {
    return <div>{error.message}</div>;
  } else {
    return (
      <div className="max-w-3xl mx-auto pb-10">
        {data?.todos.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-md ring-1 ring-gray-200 shadow-md p-6"
          >
            <h1 className="font-bold text-lg mb-2">{item.title}</h1>
            <p className="text-sm text-gray-600">
              {item.done ? "Completed" : "Pending"}
            </p>
          </div>
        ))}
      </div>
    );
  }
}
