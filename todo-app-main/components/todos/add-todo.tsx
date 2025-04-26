"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/actions/todos/actions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function AddTodo() {
  const ref = useRef<HTMLFormElement>(null);
  const [priority, setPriority] = useState("medium"); // State for priority

  const handleSubmit = async (formData: FormData) => {
    const task = formData.get("task") as string;

    if (!task.trim()) {
      toast.error("Task cannot be empty");
      return;
    }

    try {
      // Include priority in form data
      formData.append("priority", priority);
      await addTodo(formData);
      ref.current?.reset();
      setPriority("medium"); // Reset to default after submission
      toast.success("Task added successfully");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700"
      ref={ref}
      action={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <Input
          id="task"
          className="flex-1"
          name="task"
          placeholder="What needs to be done?"
          required
        />
        <Button type="submit" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label
            htmlFor="priority"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="due_date"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Due Date
          </label>
          <Input type="date" id="due_date" name="due_date" className="w-full" />
        </div>
      </div>
    </form>
  );
}
