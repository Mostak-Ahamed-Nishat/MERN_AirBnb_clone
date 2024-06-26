"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import userRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = userRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  // const toggleOpen = useCallback(() => {
  //   setIsOpen((value: boolean) => !value);
  // }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  //handle Airbnb button
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {
            onRent();
          }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-slate-200 overflow-hidden right-0 top-12 text-sm  mt-[5px]">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My Trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                  }}
                  label="My Favorite"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                  }}
                  label="My Reservations"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                  }}
                  label="My Properties"
                />
                <MenuItem
                  onClick={() => {
                    onRent();
                  }}
                  label="My Airbnb My home"
                />
                <hr /> <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                  }}
                  label="Signup"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
