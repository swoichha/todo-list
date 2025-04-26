"use client";

import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { deleteTodo } from "@/actions/todos/actions";
import { Trash2, Trash2Icon } from "lucide-react";

export default function DeleteTodo({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${className} text-red-500 hover:text-red-700 dark:hover:text-red-400`}
      onClick={async () => {
        await deleteTodo(id);
      }}
    >
      <Trash2 className="h-5 w-5" />
    </Button>
  );
}
