import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";
import React from "react";
import { SafeReservation } from "../../types/index";

interface IParams {
  listingId?: string;
  reservations?: SafeReservation[];
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);

  const reservations = await getReservations(params);

  const currentUser = await getCurrentUser();

  if (!listing || listing == null) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingPage;
