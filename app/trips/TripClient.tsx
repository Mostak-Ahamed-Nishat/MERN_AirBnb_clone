"use client";

import { SafeReservation, SafeUser } from "@/app/types";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import ListingCard from "../../components/listing/ListingCard";
import { Suspense, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

interface TripClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripClient: React.FC<TripClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  //On reservation cancel
  const onCancel = useCallback(
    (id: string) => {
      //Set the id to be deleted
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Your reservation has been canceled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going "
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </Suspense>
  );
};
export default TripClient;
