"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { addTodo, fetchTodos, deleteTodo, updateTodo } from "@/lib/todoActions";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  is_completed: boolean;
  created_at: string;
}

export default function DashboardClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    due_date: "",
    is_completed: false,
    created_at: "",
  });

  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [dialogTodo, setDialogTodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    due_date: "",
    is_completed: false,
    created_at: "",
  });

  const handleAddTodo = async () => {
    if (!newTodo.title.trim()) return;

    await addTodo(newTodo);
    const updatedTodos = await fetchTodos();
    setTodos(updatedTodos);
    setNewTodo({ title: "", description: "", due_date: "" });
  };

  const handleEditTodo = (todo: Todo) => {
    setIsDialogOpen(true); // Open the dialog when editing
    setDialogTodo(todo); // Pass the todo to the dialog form
  };

  const handleSaveEditedTodo = async () => {
    if (!dialogTodo.title.trim()) return;

    try {
      const updatedTodo = await updateTodo(dialogTodo.id, dialogTodo);

      if (updatedTodo) {
        const updatedTodos = await fetchTodos();
        setTodos(updatedTodos);
        setIsDialogOpen(false); // Close the dialog after saving
        setDialogTodo({
          id: "",
          title: "",
          description: "",
          due_date: "",
          is_completed: false,
          created_at: "",
        });
      }
    } catch (error) {
      console.error("Error in handleSaveEditedTodo:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (todoToDelete) {
      const success = await deleteTodo(todoToDelete);
      if (success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== todoToDelete));
        setTodoToDelete(null); // Close delete dialog after delete
      }
    }
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

      {/* Add Todo Form */}
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Todo" : "Add a New Todo"}</CardTitle>
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

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">{todo.title}</CardTitle>
              {/* Button container to align buttons side by side */}
              <div className="flex space-x-2">
                <Button onClick={() => handleEditTodo(todo)}>Edit</Button>
                <AlertDialog
                  open={todoToDelete === todo.id} // Open only when deleting specific todo
                  onOpenChange={(isOpen) => !isOpen && setTodoToDelete(null)} // Close dialog when closed
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setTodoToDelete(todo.id)} // Open dialog with the correct todo id
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        If you proceed, this task will be permanently deleted
                        and cannot be recovered.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setTodoToDelete(null)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleConfirmDelete}>
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
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

      {/* Edit Todo Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Todo</AlertDialogTitle>
            <AlertDialogDescription>
              Modify your task details below:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={dialogTodo.title}
                onChange={(e) =>
                  setDialogTodo({ ...dialogTodo, title: e.target.value })
                }
                placeholder="Task title..."
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={dialogTodo.description || ""}
                onChange={(e) =>
                  setDialogTodo({ ...dialogTodo, description: e.target.value })
                }
                placeholder="Task description"
              />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input
                type="datetime-local"
                value={dialogTodo.due_date || ""}
                onChange={(e) =>
                  setDialogTodo({ ...dialogTodo, due_date: e.target.value })
                }
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveEditedTodo}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
