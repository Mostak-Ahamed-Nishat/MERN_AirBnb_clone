/*
File Description: to get the user data from the Next Auth session and pass to the navbar
 */

import prisma from "@/app/libs/prismadb";
import  authOptions  from "@/app/api/auth/[...nextauth]/authOptions";

import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    //if there is no session
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    //If current user not found
    if (!currentUser) {
      return null;
    }
    //If current user is authenticated and available in the session return it
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
