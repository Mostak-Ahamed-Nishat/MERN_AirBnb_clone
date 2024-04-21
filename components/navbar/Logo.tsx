"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function Logo({}) {
  const router = useRouter();
  return (
    <>
      <Image
        onClick={() => router.push("/")}
        className="hidden md:block cursor-pointer"
        alt="Airbnb clone logo"
        height="100"
        width="100"
        src="/images/logo.png"
      />
    </>
  );
}
