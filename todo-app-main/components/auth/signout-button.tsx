"use client";

import { signout } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <Button
      variant="outline"
      className="gap-2 border-red-500/30 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-400/30 dark:text-red-400 dark:hover:bg-red-900/20"
      onClick={async () => {
        await signout();
      }}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
}
