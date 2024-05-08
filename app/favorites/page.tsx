import EmptyState from "@/components/EmptyState";
import React, { Suspense } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";
import Loading from "@/components/Loading";

type Props = {};

const FavoritePage = async (props: Props) => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <FavoritesClient listings={listings} currentUser={currentUser} />;
    </Suspense>
  );
};

export default FavoritePage;
