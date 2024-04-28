import React from "react";

interface IParams {
  listingId?: string;
}

const ListingPage = ({ params }: { params: IParams }) => {
  return <div>This is individual Listing page</div>;
};

export default ListingPage;
