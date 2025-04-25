// components/LogoutButton.tsx
"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button
      className="bg-rose-500 hover:bg-rose-600 text-white"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
