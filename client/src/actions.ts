"use server";
import { gql } from "@apollo/client";
import createApolloClient from "./config/apollo-client";
import { revalidatePath } from "next/cache";

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!) {
    updateTodo(id: $id) {
      id
      title
      done
    }
  }
`;
const toggleTodo = async (id: number) => {
  console.log("Working");
  const client = createApolloClient();
  await client.mutate({ mutation: UPDATE_TODO, variables: { id } });
  revalidatePath("/");
};

export { toggleTodo };
