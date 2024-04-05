"use client";

import Image from "next/image";
import { useRouter } from "next/router";

export default function Logo({}) {
  //   const router = useRouter();
  return (
    <>
      <Image
        className="hidden md:block cursor-pointer"
        alt="Airbnb clone logo"
        height="100"
        width="100"
        src="/images/logo.png"
      />
    </>
  );
}
