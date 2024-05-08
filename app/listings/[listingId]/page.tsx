import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";
import React, { Suspense } from "react";
import { SafeReservation } from "../../types/index";
import Loading from "@/components/Loading";

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
    <Suspense fallback={<Loading />}>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </Suspense>
  );
};

export default ListingPage;
