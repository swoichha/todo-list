import TodoData from "./todo-data";
import TodoCheckbox from "./todo-checkbox";
import DeleteTodo from "./delete-todo";
import { editTodo } from "@/actions/todos/actions";
import type { Todo } from "@/lib/interface";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function Todo({ todo }: { todo: Todo }) {
  return (
    <div className="group flex items-start gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
      <form
        className="flex-1"
        action={async () => {
          "use server";
          await editTodo(todo);
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex items-center h-[20px]">
            {" "}
            {/* Fixed height container */}
            <TodoCheckbox todo={todo} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center h-[20px]">
              {" "}
              {/* Matching height */}
              <TodoData todo={todo} />
            </div>
            {(todo.priority || todo.due_date) && (
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                {todo.priority && (
                  <Badge
                    variant={
                      todo.priority === "high"
                        ? "destructive"
                        : todo.priority === "medium"
                        ? "secondary"
                        : "outline"
                    }
                    className="h-5 px-1.5 text-xs font-normal"
                  >
                    {todo.priority}
                  </Badge>
                )}
                {todo.due_date && (
                  <span className="flex items-center gap-1">
                    <span className="text-xs">📅</span>
                    <span>{format(new Date(todo.due_date), "MMM dd")}</span>
                  </span>
                )}
                <DeleteTodo
                  id={todo.id}
                  className="ml-auto h-5 w-5 p-0 opacity-70 hover:opacity-100"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
