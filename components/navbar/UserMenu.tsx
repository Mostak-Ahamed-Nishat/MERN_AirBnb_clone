"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import RegisterModal from "../modals/RegisterModal";
import userRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
type Props = {};

function UserMenu({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = userRegisterModal();
  const loginModal = useLoginModal();

  // const toggleOpen = useCallback(() => {
  //   setIsOpen((value: boolean) => !value);
  // }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-slate-200 overflow-hidden right-0 top-12 text-sm  mt-[5px]">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem
                onClick={() => {}}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
