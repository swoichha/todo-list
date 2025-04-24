import { supabase } from "./supabaseClient";

export const addTodo = async ({
  title,
  description,
  due_date,
}: {
  title: string;
  description?: string;
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
      title,
      description,
      due_date,
      user_id: user.id, // ✅ MUST include user_id!
    },
  ]);

  if (error) {
    console.error("Error adding todo:", error);
  }
};
