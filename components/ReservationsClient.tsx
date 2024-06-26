"use client";

import axios from "axios";
import { SafeReservation, SafeUser } from "../app/types/index";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import Loading from "@/components/Loading";

type Props = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

// eslint-disable-next-line @next/next/no-async-client-component
const ReservationsClient = async ({ reservations, currentUser }: Props) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.error("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
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
        <Heading title="Reservations" subtitle="Bookings on your properties" />
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

export default ReservationsClient;
