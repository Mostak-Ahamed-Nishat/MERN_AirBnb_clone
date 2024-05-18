import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  //if user doesn't logged in
  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  //If the reservation id is not valid
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid Id");
  }

  //If id is valid delete the reservation
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      //The property owner or the user that made the reservation will be able to cancel the reservation user or listing owner
      OR: [{ userId: currentUser?.id }, { listing: { userId: currentUser?.id } }],
    },
  });

  return NextResponse.json(reservation);
}
