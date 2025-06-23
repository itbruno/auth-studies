import { prisma } from "@/lib/prisma";
import { createSession, verifySession } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { cache } from "react";
import bcrypt from "bcrypt";

export const getUser = cache(async (id: string) => {
  const session = await verifySession();

  if(!session || !session.userId) {
    throw new Error('Unauthorized');
  }

  if(session.userId !== id) {
    throw new Error('Forbidden: You can only access your own user data');
  }

  const user = prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    }
  })

  return user;
})

export async function createUser(user: Prisma.UserCreateInput) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    await createSession(newUser.id, newUser.email);
  } catch {
    throw new Error('Failed to create user');
  }
}