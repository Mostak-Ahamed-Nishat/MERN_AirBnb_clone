// import prisma from "@/app/libs/prismadb";

// export interface IListingsParams {
//   userId?: string;
//   guestCount?: number;
//   roomCount?: number;
//   bathroomCount?: number;
//   startDate?: string;
//   endDate?: string;
//   locationValue?: string;
//   category?: string;
// }

// export default async function getListings(params: IListingsParams) {
//   try {
//     const {
//       userId,
//       roomCount,
//       guestCount,
//       bathroomCount,
//       locationValue,
//       startDate,
//       endDate,
//       category,
//     } = params;

//     let query: any = {};

//     //If the user has a userId
//     if (userId) {
//       query.userId = userId;
//     }
//     //If any category params available
//     if (category) {
//       query.category = category;
//     }

//     //If any roomCount params available
//     if (roomCount) {
//       query.roomCount = {
//         gte: +roomCount,
//       };
//     }

//     //If any guestCount params available
//     if (guestCount) {
//       query.guestCount = {
//         gte: +guestCount,
//       };
//     }

//     //If any bathroomCount params available
//     if (bathroomCount) {
//       query.bathroomCount = {
//         gte: +bathroomCount,
//       };
//     }
//     //If any locationValue params available
//     if (locationValue) {
//       query.locationValue = locationValue;
//     }

//     //(march 23- march 24) if any single day even available then show that room,
//     if (startDate && endDate) {
//       // Check for available listings by filtering out reservations that conflict with the specified date range
//       query.NOT = {
//         reservations: {
//           some: {
//             OR: [
//               {
//                 endDate: { gte: startDate },
//                 startDate: { lte: startDate },
//               },
//               {
//                 startDate: { lte: endDate },
//                 endDate: { gte: endDate },
//               },
//             ],
//           },
//         },
//       };
//     }

//       // Fetch listings based on the constructed query
//     const listing = await prisma.listing.findMany({
//       where: query,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     //Change the created time formate
//     const safeListings = listing.map((list) => ({
//       ...list,
//       createdAt: list.createdAt.toISOString(),
//     }));

//     return safeListings;
//   } catch (error: any) {
//     //If any error occurred
//     throw new Error(error.message);
//   }
// }

// *******************

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

    // If the user has a userId
    if (userId) {
      query.userId = userId;
    }

    // If any category params available
    if (category) {
      query.category = category;
    }

    // If any roomCount params available
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    // If any guestCount params available
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    // If any bathroomCount params available
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    // If any locationValue params available
    if (locationValue) {
      query.locationValue = locationValue;
    }

    // If both startDate and endDate are provided
    if (startDate && endDate) {
      // Check for available listings by filtering out reservations that conflict with the specified date range
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate }, // Reservation ends after the start date
                startDate: { lte: startDate }, // Reservation starts before or on the start date
              },
              {
                startDate: { lte: endDate }, // Reservation starts before or on the end date
                endDate: { gte: endDate }, // Reservation ends after the end date
              },
            ],
          },
        },
      };
    }

    // Fetch listings based on the constructed query
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert createdAt to ISO string format
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    // Handle any errors
    throw new Error(error.message);
  }
}
