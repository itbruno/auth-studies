'use server';

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export async function signin(payload: FormData) {
  const email = payload.get('email')?.toString();
  const password = payload.get('password')?.toString();

  if(!email || !password) {
    throw new Error('Email and password are required');
  }
  
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if(!user) {
    console.error('User not found:', email);
    throw new Error('User not found');
  }

  // Validate user password
  const isPasswordValid = user && await bcrypt.compare(password, user.password);
  if(!isPasswordValid) {
    console.error('Invalid email or password for user:', email);
    throw new Error('Invalid email or password');
  }

  console.log('User signed in successfully:', user.email);

  await createSession(user.id, user.email);
}