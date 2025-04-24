import { supabase } from "./supabaseClient";

// Fetch all todos for the current user
export const fetchTodos = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not authenticated:", userError);
    return [];
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }

  return data;
};

// Add a new todo
export const addTodo = async ({
  title,
  description,
  due_date,
}: {
  title: string;
  description: string;
  due_date?: string;
}) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not authenticated:", userError);
    return;
  }

  const { error } = await supabase.from("todos").insert([
    {
      user_id: user.id,
      title,
      description,
      due_date: due_date || null,
    },
  ]);

  if (error) {
    console.error("Error adding todo:", error);
  }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error);
    return false;
  }

  return true;
};
