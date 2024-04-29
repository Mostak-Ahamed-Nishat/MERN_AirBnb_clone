//Server to DB communication

import prisma from "@/app/libs/prismadb";
import EmptyState from "@/components/EmptyState";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    //Get the id parameter
    const { listingId } = params;

    //Find the listing from DB by ID and also get owner profile data by user:true
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    //If Listing is not available
    if (!listing) {
      return null;
    }

    //Return the data with formatting the data
    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
