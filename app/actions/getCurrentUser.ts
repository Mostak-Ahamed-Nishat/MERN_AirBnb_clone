/*
File Description: to get the user data from the Next Auth session and pass to the navbar
 */

import prisma from "@/app/libs/prismadb";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

import { getServerSession } from "next-auth";

//Get the session
export async function getSession() {
  let session = await getServerSession(authOptions);
  return session;
}

export default async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });
  //   //If current user not found
  if (!currentUser) {
    console.log("🙄 Current user not found");
    return null;
  }

  return {
    ...currentUser,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toISOString() || null,
  };
}
