import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    //if we have listingId find all the reservation for that listing
    if (listingId) {
      query.listingId = listingId;
    }

    //If  we have userId find all the reservation that active user made
    if (userId) {
      query.userId = userId;
    }

    //If  we have authorId. find all the reservation that someone booked in author listing
    if (authorId) {
      query.listing = { userId: authorId };
    }

    //Get the reservation from db
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    //Make it safe data type
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
