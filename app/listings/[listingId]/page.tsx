import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";
import React from "react";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  // const reservations = await getReservation(params);
  const currentUser = await getCurrentUser();

  if (!listing || listing == null) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      // reservations={reservations}
    />
  );
};

export default ListingPage;
