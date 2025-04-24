"use client";

import { useEffect, useState } from "react";
import { addTodo, fetchTodos } from "@/lib/todoActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

type Todo = {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
  created_at: string;
};

export default function DashboardClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const handleAddTodo = async () => {
    if (!newTodo.title.trim()) return;

    await addTodo(newTodo);
    const updatedTodos = await fetchTodos();
    setTodos(updatedTodos);
    setNewTodo({ title: "", description: "", due_date: "" });
  };

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    loadTodos();
  }, []);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">📝 My Todo List</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add a New Todo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              placeholder="Buy groceries..."
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              placeholder="Milk, eggs, and bread"
            />
          </div>
          <div>
            <Label>Due Date</Label>
            <Input
              type="datetime-local"
              value={newTodo.due_date}
              onChange={(e) =>
                setNewTodo({ ...newTodo, due_date: e.target.value })
              }
            />
          </div>
          <Button onClick={handleAddTodo}>Add Todo</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">{todo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {todo.description}
              </p>
              {todo.due_date && (
                <p className="text-sm">
                  <strong>Due:</strong>{" "}
                  {format(new Date(todo.due_date), "PPpp")}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
