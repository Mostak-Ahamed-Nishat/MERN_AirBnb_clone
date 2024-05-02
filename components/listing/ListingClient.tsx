"use client";

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser, safeListing } from "@/app/types/index";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";

import Container from "../Container";
import ListingHead from "./ListingHead";
import { categories } from "../navbar/Categories";
import toast from "react-hot-toast";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "./ListingReservation";

type Props = {
  reservations?: SafeReservation[];
  //listing and safe user because get the listing data with the owner profile data
  listing: safeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function ListingClient({ reservations = [], listing, currentUser }: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();

  //***Check the category by the category array
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  //Disable the dates || The house or room may be already booked for the days that new user want to with the date so disable the date that already booked
  const disableDates = useMemo(() => {
    //Initial date is empty
    let dates: Date[] = [];
    //
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      // Pass if any reservation available
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  //***Make your reservation
  const onCreateReservation = useCallback(() => {
    //If the user is not login
    if (!currentUser) {
      return loginModal.onOpen();
    }
    //Set Login true
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reservation Success");
        setDateRange(initialDateRange);
        router.refresh();
        
      })
      .catch(() => {
        toast.error("Reservation Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  //Calculate the price based on the how many days user want to booked the room
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      //If available more then 1 days
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        //Else set the single day value
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
