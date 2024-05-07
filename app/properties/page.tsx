import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  //Get the loggedin user
  const currentUser = await getCurrentUser();

  //If not auth user
  if (!currentUser) {
    <ClientOnly>
      <EmptyState title="Unauthorized" subtitle="please login" />
    </ClientOnly>;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you have no properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};
export default PropertiesPage;
