"use client";

import { useEffect, useState } from "react";// Import useState for managing component state
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const router = useRouter();// Initialize the router for navigation
  const [bookmarks, setBookmarks] = useState<any[]>([]); // State to hold the list of bookmarks
  const [title, setTitle] = useState("");// State to hold the title of a new bookmark
  const [url, setUrl] = useState("");// State to hold the URL of a new bookmark


  // useEffect to fetch bookmarks and check user session on component mount

  useEffect(() => {
    fetchBookmarks();
    subscribeRealtime();

    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/");
      }
    };

    checkUser();
  }, []);

  // Function to handle user logout

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Function to fetch bookmarks from the Supabase database

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  // Function to add a new bookmark to the Supabase database

  const addBookmark = async () => {
    const { data: user } = await supabase.auth.getUser();

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.user?.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  // Function to delete a bookmark from the Supabase database


  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };


// Function to subscribe to real-time updates from the Supabase database

  const subscribeRealtime = () => {
    supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        },
      )
      .subscribe();
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
        <button
          onClick={handleLogout}
          className="p-2 px-4 border-2 hover:border-fuchsia-500 transition rounded-lg duration-300 active:scale-90 active:opacity-20"
        >
          Sign out
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <input
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <button
          onClick={addBookmark}
          className="text-white p-2 px-4 border-2 hover:cursor-pointer hover:border-fuchsia-500 transition rounded-lg duration-300 active:scale-90 active:opacity-20"
        >
          Add
        </button>
      </div>

      <ul>
        {bookmarks.map((b) => (
          <li key={b.id} className="flex justify-between border p-2 mb-2">
            <a href={b.url} target="_blank">
              {b.title}
            </a>
            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-white p-2 px-4 border-2 hover:cursor-pointer hover:border-fuchsia-500 transition rounded-lg duration-300 active:scale-90 active:opacity-20"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
