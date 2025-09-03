// "use client";
// import { gql } from "@apollo/client";
// import { useMutation, useQuery } from "@apollo/client/react";

import { toggleTodo } from "@/actions";
import createApolloClient from "@/config/apollo-client";
import { gql } from "@apollo/client";

// type Todo = {
//   id: number;
//   title: string;
//   done: boolean;
// };

// export default function Home() {
//   const TODOS_QUERY = gql`
//     query getTodos {
//       todos {
//         id
//         title
//         done
//       }
//     }
//   `;
//   const UPDATE_TODO = gql`
//     mutation updateTodo($id: ID!) {
//       updateTodo(id: $id) {
//         id
//         title
//         done
//       }
//     }
//   `;
//   const { data, error, loading } = useQuery<{ todos: Todo[] }>(TODOS_QUERY);
//   const [updateTodo, { loading: updating, error: errorUpdating }] =
//     useMutation<{ updatedTodo: Todo }>(UPDATE_TODO, {
//       refetchQueries: [TODOS_QUERY],
//     });
//   if (loading) {
//     return <p>loading...</p>;
//   }
//   if (error) {
//     return <p className="text-red-500">{error.message}</p>;
//   }
//   return (
//     <div className="pb-10 max-w-3xl mx-auto">
//       {data?.todos.map((item) => (
//         <div key={item.id} className="bg-gray-50 p-3 rounded-md shadow-md">
//           <h1 className="font-bold text-lg">{item.title}</h1>
//           <p className="text-gray-600">{item.done ? "Completed" : "Pending"}</p>
//           <button
//             onClick={() => updateTodo({ variables: { id: item.id } })}
//             disabled={updating}
//             className={`${item.done ? "text-red-500" : "text-green-500"}`}
//           >
//             {updating
//               ? "Updating"
//               : item.done
//               ? "Mark as pending"
//               : "Mark as complete"}
//           </button>
//           {errorUpdating && <p className="text-red-500">Failed to update</p>}
//         </div>
//       ))}
//     </div>
//   );
// }

export default async function Home() {
  type Todo = {
    id: number;
    title: string;
    done: boolean;
  };
  const client = createApolloClient();
  const TODOS_LIST = gql`
    query getTodos {
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
    return <p className="text-red-500">{error.message}</p>;
  }
  return (
    <div className="bg-gray-50 mx-auto max-w-3xl">
      {data?.todos.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-md bg-white shadow-md flex flex-col gap-3"
        >
          <h1 className="font-bold text-lg">{item.title}</h1>
          <p className={`${item.done ? "text-green-500" : "text-red-500"}`}>
            {item.done ? "Completed" : "Pending"}
          </p>
          <form
            action={async () => {
              "use server";

              await toggleTodo(item.id);
            }}
          >
            <button
              type="submit"
              className="p-3 bg-slate-900 rounded text-white font-bold"
            >
              {item.done ? "Mark as pending" : "Mark as complete"}
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
