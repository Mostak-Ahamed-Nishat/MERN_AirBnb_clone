/*
File Description: PrismaClient User model expect createdAt,UpdatedAt,emailVerified as DateTime so have to create a safe type. Crossing the type of user data
*/

import { User } from "@prisma/client";

export type safeUser = Omit<
  User,
  "createdAt" | "UpdatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
