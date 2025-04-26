import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Todos from "@/components/todos/todos";
import ClearActions from "@/components/todos/clear-actions";
import SignOutButton from "@/components/auth/signout-button";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        {/* Main content card */}
        <div className="flex-1 flex flex-col border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 relative max-w-4xl w-full mx-auto">
          {/* Header with SignOut button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <CheckCircleIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <h1 className="font-bold text-2xl text-gray-800 dark:text-white">
                My Todo List
              </h1>
            </div>
            <SignOutButton />
          </div>

          {/* Todos list - flex-1 makes it take remaining space */}
          <div className="flex-1 overflow-y-auto p-6">
            <Todos />
          </div>

          {/* ClearActions at bottom */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <ClearActions />
          </div>
        </div>
      </div>
    </main>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
