export interface Todo {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
  priority?: "low" | "medium" | "high"; // New field
  due_date?: string | null; // New field (ISO date string)
}
