"use client";

import { Button } from "@/components/ui/button";
import { deleteCompletedTodos, deleteAllTodos } from "@/actions/todos/actions";
import { toast } from "sonner";
import { CheckCheck, Trash2 } from "lucide-react";

export default function ClearActions() {
  const handleClearCompleted = async () => {
    try {
      await deleteCompletedTodos();
      toast.success("Completed todos cleared successfully!");
    } catch (error) {
      toast.error("Failed to clear completed todos");
    }
  };

  const handleClearAll = async () => {
    try {
      await deleteAllTodos();
      toast.success("All todos cleared successfully!");
    } catch (error) {
      toast.error("Failed to clear all todos");
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Manage your todos
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleClearCompleted}
          size="sm"
          variant="outline"
          className="gap-2 border-orange-300 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/20"
        >
          <CheckCheck className="h-4 w-4" />
          Clear Completed
        </Button>

        <Button
          onClick={handleClearAll}
          size="sm"
          variant="destructive"
          className="gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>
    </div>
  );
}
