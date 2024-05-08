import ReservationsClient from "./ReservationsClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";
import { Suspense } from "react";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  //If user doesn't logged in
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <EmptyState
        title="No Reservation yet"
        subtitle="Looks like you have no reservation on your property"
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Suspense>
  );
};

export default ReservationPage;
