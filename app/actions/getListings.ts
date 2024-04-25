import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    //If the user has a userId
    if (userId) {
      query.userId = userId;
    }
    //If any category params available
    if (category) {
      query.category = category;
    }

    //If any roomCount params available
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    //If any guestCount params available
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    //If any bathroomCount params available
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    //If any locationValue params available
    if (locationValue) {
      query.locationValue = locationValue;
    }

    //If any startDate and endDate params available
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    //If any filter data required then filtered by the filter data get all the data
    const listing = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    //Change the created time formate
    const safeListings = listing.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    //If any error occurred
    throw new Error(error.message);
  }
}
