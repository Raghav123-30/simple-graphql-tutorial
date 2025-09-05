"use server";
import { gql } from "@apollo/client";
import createApolloClient from "./config/apollo-client";
import { revalidatePath } from "next/cache";

const CompleteTodoAction = async (
  id: number
): Promise<{ error: boolean; message: string }> => {
  try {
    const client = createApolloClient();
    const COMPLETE_TODO = gql`
      mutation MarkAsDone($id: ID!) {
        completeTodo(id: $id) {
          id
          title
          done
        }
      }
    `;

    await client.mutate({
      mutation: COMPLETE_TODO,
      variables: { id },
    });
    revalidatePath("/server");
    return { error: false, message: "Completed successfully" };
  } catch (error) {
    return { error: true, message: "Something went wrong" };
  }
};

export { CompleteTodoAction };
