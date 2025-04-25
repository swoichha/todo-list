// components/AuthForm.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) return setError(error.message);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-semibold text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit} className="w-full">
        {isLogin ? "Login" : "Sign Up"}
      </Button>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="text-center text-sm text-muted-foreground cursor-pointer hover:underline"
      >
        {isLogin ? "No account? Sign up" : "Have an account? Log in"}
      </p>
    </div>
  );
}
