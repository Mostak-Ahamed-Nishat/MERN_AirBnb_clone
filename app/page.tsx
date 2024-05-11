import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "@/components/listing/ListingCard";
import { Suspense } from "react";
import Loading from "@/components/Loading";

// npx prisma generate && next build

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser();
  const listing = await getListings(searchParams);

  if (listing?.length == 0) {
    return (
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 overflow-x-hidden align-middle justify-center ">
        <EmptyState showReset />
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 overflow-x-hidden">
            {listing.map((list) => {
              return (
                <ListingCard
                  key={list.id}
                  data={list}
                  currentUser={currentUser}
                />
              );
            })}
          </div>
        </Container>
      </Suspense>
    </div>
  );
}

