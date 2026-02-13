"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter(); // Initialize the router for navigation

  // useEffect to check for an active session on component mount

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/Dashboard");
      }
    });
  }, [router]);

  // Function to handle sign-in with Google using Supabase's OAuth

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <button
        onClick={signInWithGoogle}
        className=" text-white px-6 py-2 rounded-lg  border-amber-50 border-2 hover:cursor-pointer hover:border-fuchsia-500 duration-300 transition active:scale-95 active:opacity-30"
      >
        Sign In with Google
      </button>
    </div>
  );
}
