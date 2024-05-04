import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getReservations from "../actions/getReservations";
import getCurrentUser from "@/app/actions/getCurrentUser";
import TripClient from "@/components/trip/TripClient";

const TripPage = async () => {
  //Get the loggedin user
  const currentUser = getCurrentUser();

  //If not auth user
  if (!currentUser) {
    <ClientOnly>
      <EmptyState title="Unauthorized" subtitle="please login" />
    </ClientOnly>;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservation yet"
          subtitle="Make your tour plan today"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};
export default TripPage;
