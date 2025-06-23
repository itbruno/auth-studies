'use client';

import { getPosts } from "@/datalayer/posts";
import { useEffect, useState } from "react";

interface IPost {
  id: string;
  title: string;
  authorId?: string;
}
export default function ClientPostsPage() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [])

  async function fetchPosts() {
    const response = await getPosts();
    if(response) {
      setPosts(response);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-8 border border-zinc-900 max-w-lg m-auto mt-10">
      <h1 className="text-2xl font-bold">Posts</h1>
      {posts.length > 0 && posts.map(post => (
        <>
          <div key={post?.id} className="p-4 border border-zinc-800 rounded-md">
            <h2 className="text-xl font-semibold">{post?.title}</h2>
          </div>
        </>
      ))}
      <p className="text-sm text-zinc-500">This is a placeholder for the posts page.</p>
      <p className="text-sm text-zinc-500">You can add your posts here.</p>
    </div>
  );
}