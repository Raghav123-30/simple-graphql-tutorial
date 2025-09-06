"use client";

type CompleteButtonProps = {
  id: number;
};

import { Todo } from "@/models/Todo";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

//import { CompleteTodoAction } from "@/actions";
import { Check } from "lucide-react";
import React, { useActionState, useState, useTransition } from "react";

const CompleteTodoButton = ({ id }: CompleteButtonProps) => {
  // const [pending, startTransition] = useTransition();
  // const [errorMessage, setErrorMessage] = useState("");
  const COMPLETE_TODO = gql`
    mutation markAsDone($id: ID!) {
      completeTodo(id: $id) {
        id
        title
        done
      }
    }
  `;
  const [completeTodo, { data }] = useMutation<Todo>(COMPLETE_TODO);
  const submitHandler = async (
    state: { message: string; error: boolean },
    formData: FormData
  ) => {
    try {
      await completeTodo({ variables: { id } });
      return { error: false, message: "" };
    } catch (error) {
      return { message: "Something went wrong", error: true };
    }
  };

  const [state, action, pending] = useActionState(submitHandler, {
    message: "",
    error: false,
  });
  return (
    <form
      className="text-sm text-gray-600 flex gap-2 items-center"
      // action={async () => {
      //   setErrorMessage("");
      //   startTransition(async () => {
      //     const { error, message } = await CompleteTodoAction(id);
      //     if (error) {
      //       setErrorMessage(message);
      //     }
      //   });
      // }}
      action={action}
    >
      <button className="cursor-pointer" type="submit">
        {pending ? "Completing..." : <Check />}
      </button>
      {state.error && (
        <p className="text-red-500 text-sm my-1">{state.message}</p>
      )}
    </form>
  );
};

export default CompleteTodoButton;
