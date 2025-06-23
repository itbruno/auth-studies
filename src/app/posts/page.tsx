import { getPosts } from "@/datalayer/posts";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-4 p-8 border border-zinc-900 max-w-lg m-auto mt-10">
      <h1 className="text-2xl font-bold">Posts</h1>
      {posts && posts.map(post => (
        <>
          <div key={post.id} className="p-4 border border-zinc-800 rounded-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </div>
        </>
      ))}
      <p className="text-sm text-zinc-500">This is a placeholder for the posts page.</p>
      <p className="text-sm text-zinc-500">You can add your posts here.</p>
    </div>
  );
}