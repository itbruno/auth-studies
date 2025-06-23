import 'server-only';

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET as string || 'secret';

interface IJwtPayload {
  userId: string;
  email: string;
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const cookieInfo = {
  name: "session",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  }
}

export async function encrypt(payload: {userId: string, email: string}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function decrypt(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
}

export async function createSession(userId: string, email: string) {
  const expires = new Date(Date.now() + cookieInfo.options.maxAge);
  const session = await encrypt({userId, email});
  const cookieStore = await cookies()
  cookieStore.set(cookieInfo.name, session, {...cookieInfo.options, expires});

  redirect('/dashboard');
}

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(cookieInfo.name);

  if(!session) {
    redirect('/');
  }

  const decoded = await decrypt(session.value) as IJwtPayload;

  if(!decoded || !decoded.userId) {
    redirect('/');
  }

  return decoded;
}

export async function deleteSession() {
  (await cookies()).delete(cookieInfo.name);
  redirect('/login');
}