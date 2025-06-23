'use server';
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getPosts() {
  const session = await verifySession();

  if(!session || !session.userId) {
    redirect('/');
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    }
  });

  return posts;
}