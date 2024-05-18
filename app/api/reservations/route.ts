import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  //Check the current user is loggedin or not

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  //Get the data from the request
  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  //If any data is missing
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }
  //Create a reservation

  const listenAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser?.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listenAndReservation);
}


