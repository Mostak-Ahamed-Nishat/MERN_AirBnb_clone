import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IPrisma {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IPrisma }) {
  //Get the current user
  const currentUser = await getCurrentUser();

  //IF loggedin user not available send error
  if (!currentUser) {
    return NextResponse.error();
  }

  //get the favorites id from the parameter
  const { listingId } = params;

  //Check if the favorite id is not available or not a string throw error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  //Get the previous favorite id form the user favorite list
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  //If get new favorite then push it to the favorite array
  favoriteIds.push(listingId);

  //send the favorite to the db
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

//Unselect the favorite
export async function DELETE(
  request: Request,
  { params }: { params: IPrisma }
) {
  //Get the current user
  const currentUser = await getCurrentUser();

  //if the user not loggedin
  if (!currentUser) {
    return NextResponse.error();
  }

  //get the favorite id from params
  const { listingId } = params;

  //Check if the favorite id is not available or not a string throw error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  //Get the previous favorite id form the user favorite list
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  //remove the favorite from the list
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  //Send the updated favorite list to the db
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
