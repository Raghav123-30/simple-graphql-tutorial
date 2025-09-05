"use client";

type CompleteButtonProps = {
  id: number;
};

import { CompleteTodoAction } from "@/actions";
import { Check } from "lucide-react";
import React, { useState, useTransition } from "react";

const CompleteTodoButton = ({ id }: CompleteButtonProps) => {
  const [pending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <form
      className="text-sm text-gray-600 flex gap-2 items-center"
      action={async () => {
        setErrorMessage("");
        startTransition(async () => {
          const { error, message } = await CompleteTodoAction(id);
          if (error) {
            setErrorMessage(message);
          }
        });
      }}
    >
      <button className="cursor-pointer" type="submit">
        {pending ? "Completing..." : <Check />}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm my-1">{errorMessage}</p>
      )}
    </form>
  );
};

export default CompleteTodoButton;
