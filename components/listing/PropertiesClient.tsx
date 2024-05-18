"use client";

import { SafeUser, safeListing } from "@/app/types";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "./ListingCard";
import { Suspense, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

interface PropertiesClientProps {
  listings: safeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
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
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Your listing has been deleted");
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
        <Heading title="Properties" subtitle="List your properties" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </Suspense>
  );
};
export default PropertiesClient;
