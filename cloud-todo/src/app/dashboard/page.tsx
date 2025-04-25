// app/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/Logout";
import DashboardClient from "@/components/DashboardClient";
import Link from "next/link";

export const dynamic = "force-dynamic"; // disables caching

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    return (
      <div className="p-10 space-y-4">
        <h1 className="text-lg font-bold">Unauthorized</h1>
        <p>
          Please{" "}
          <Link href="/" className="text-blue-600 underline">
            log in
          </Link>{" "}
          to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Top right logout button */}
      <div className="flex justify-end">
        <LogoutButton />
      </div>

      {/* Main content */}
      <div className="mt-10 space-y-4">
        <h1 className="text-xl font-semibold">Welcome, {user.email}</h1>
        <DashboardClient />
      </div>
    </div>
  );
}
